import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../Login/login__page';
import { podReportsPage } from './pod__reports.page';

test.beforeEach(async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.login('ondelondel', 'Grandtour17!');
});

test.describe('POD Reports', async () => {
	test('user go to pod reports page', async ({ page }) => {
		const podReports = new podReportsPage(page);

		await test.step('goto pod reports page', async () => {
			await podReports.gotoPodReportsPage();
		});
	});

	test('user can search with date only value succesfully', async ({ page }) => {
		const podReports = new podReportsPage(page);

		await test.step('goto pod reports page', async () => {
			await podReports.gotoPodReportsPage();
		});

		await test.step('set date', async () => {
			await expect(podReports.startDateInput).toBeVisible();
			await expect(podReports.endDateInput).toBeVisible();
			await expect(podReports.searchButton).toBeDisabled();

			await podReports.setDateForm('8/1/2023', '8/28/2023');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await expect(podReports.searchButton).toBeEnabled();
			await podReports.searchButton.click();

			await expect(podReports.podReportsList).toBeVisible();
		});

		await test.step('user can use pagination', async () => {
			await expect(podReports.leftPaginationButton).toBeVisible();
			await expect(podReports.rightPaginationButton).toBeVisible();

			await podReports.rightPaginationButton.click();
			await podReports.leftPaginationButton.click();
		});

		await test.step('verify user can use items per page feature', async () => {
			await podReports.itemsPerPage('20');
			await podReports.itemsPerPage('50');
			await podReports.itemsPerPage('100');
			await podReports.itemsPerPage('10');
		});
	});

	test('user can search with date and no awb', async ({ page }) => {
		const podReports = new podReportsPage(page);

		await test.step('goto pod reports page', async () => {
			await podReports.gotoPodReportsPage();
		});

		await test.step('set date', async () => {
			await expect(podReports.startDateInput).toBeVisible();
			await expect(podReports.endDateInput).toBeVisible();
			await expect(podReports.searchButton).toBeDisabled();

			await podReports.setDateForm('8/1/2023', '8/28/2023');
		});

		await test.step('set no awb', async () => {
			await expect(podReports.noAwbInput).toBeVisible();
			await podReports.noAwbInput.fill('JKT10052MR138L002');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await expect(podReports.searchButton).toBeEnabled();
			await podReports.searchButton.click();

			await expect(podReports.podReportsList).toBeVisible();
		});
	});

	test('user can search with date and origin value', async ({ page }) => {
		const podReports = new podReportsPage(page);

		await test.step('goto pod reports page', async () => {
			await podReports.gotoPodReportsPage();
		});

		await test.step('set date', async () => {
			await expect(podReports.startDateInput).toBeVisible();
			await expect(podReports.endDateInput).toBeVisible();
			await expect(podReports.searchButton).toBeDisabled();

			await podReports.setDateForm('8/1/2023', '8/28/2023');
		});

		await test.step('set origin', async () => {
			await expect(podReports.originInput).toBeVisible();
			await podReports.setOrigin('DC Jakarta Utara');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await expect(podReports.searchButton).toBeEnabled();
			await podReports.searchButton.click();

			await expect(podReports.podReportsList).toBeVisible();
		});

		await test.step('user can use pagination', async () => {
			await expect(podReports.leftPaginationButton).toBeVisible();
			await expect(podReports.rightPaginationButton).toBeVisible();
			await podReports.rightPaginationButton.click();
			await podReports.leftPaginationButton.click();
		});

		await test.step('verify user can use items per page feature', async () => {
			await podReports.itemsPerPage('20');
			await podReports.itemsPerPage('50');
			await podReports.itemsPerPage('100');
			await podReports.itemsPerPage('10');
			await page.screenshot({
				path: '../PodReports/screenshot/pod_reports.png',
			});
		});

		await test.step('verify user can see courier owner value', async () => {
			const courierOwnerColumn = page.getByRole('columnheader', {
				name: 'Courier Owner',
			});

			await expect(courierOwnerColumn).toBeVisible();
		});
	});

	test('user can see courier owner value', async ({ page }) => {
		const podReports = new podReportsPage(page);

		await test.step('goto pod reports page', async () => {
			await podReports.gotoPodReportsPage();
		});

		await test.step('set date', async () => {
			await expect(podReports.startDateInput).toBeVisible();
			await expect(podReports.endDateInput).toBeVisible();
			await expect(podReports.searchButton).toBeDisabled();

			await podReports.setDateForm('8/1/2023', '8/28/2023');
		});

		await test.step('set no awb', async () => {
			await expect(podReports.noAwbInput).toBeVisible();
			await podReports.noAwbInput.fill('JKT10052MR138L002');
		});

		await test.step('set origin', async () => {
			await expect(podReports.originInput).toBeVisible();
			await podReports.setOrigin('DC Jakarta Utara');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await expect(podReports.searchButton).toBeEnabled();
			await podReports.searchButton.click();

			await expect(podReports.podReportsList).toBeVisible();
		});

		// Your pagination test steps here
		await test.step('user can see pagination', async () => {
			await expect(podReports.leftPaginationButton).toBeVisible();
			await expect(podReports.rightPaginationButton).toBeVisible();
		});

		await test.step('verify user can use items per page feature', async () => {
			await podReports.itemsPerPage('20');
			await podReports.itemsPerPage('50');
			await podReports.itemsPerPage('100');
			await podReports.itemsPerPage('10');
		});

		await test.step('verify user can see courier owner value', async () => {
			const courierOwnerColumn = page.getByRole('columnheader', {
				name: 'Courier Owner',
			});

			await expect(courierOwnerColumn).toBeVisible();
		});
	});
});
