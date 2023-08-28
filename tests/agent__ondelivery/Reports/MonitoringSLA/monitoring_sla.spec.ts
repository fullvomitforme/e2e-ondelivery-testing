import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../Login/login__page';
import { monitoringSlaPage } from './monitoring__sla.page';
import fs from 'fs';

test.beforeEach(async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.login('ondelondel', 'Grandtour17!');
});

test.describe('Monitoring SLA', () => {
	test('user can go to monitor SLA successfully', async ({ page }) => {
		const monitoringSla = new monitoringSlaPage(page);
		await test.step('goto monitoring SLA PAGE', async () => {
			await monitoringSla.gotoMonitoringSlaPage();
		});
	});

	test('user can use monitoring SLA with date only value succesfully', async ({
		page,
	}) => {
		const monitoringSla = new monitoringSlaPage(page);

		await test.step('goto monitoring SLA PAGE', async () => {
			await monitoringSla.gotoMonitoringSlaPage();
		});

		await test.step('set date', async () => {
			await expect(monitoringSla.startDateInput).toBeVisible();
			await expect(monitoringSla.endDateInput).toBeVisible();
			await expect(monitoringSla.searchButton).toBeDisabled();
			await monitoringSla.setDateForm('5/1/2023', '5/31/2023');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await expect(monitoringSla.searchButton).toBeEnabled();
			await monitoringSla.searchButton.click();
		});

		await test.step('user can use pagination', async () => {
			await expect(monitoringSla.leftPaginationButton).toBeVisible();
			await expect(monitoringSla.rightPaginationButton).toBeVisible();

			await monitoringSla.rightPaginationButton.click();
			await monitoringSla.leftPaginationButton.click();
		});

		await test.step('verify user can export this page', async () => {
			const [download] = await Promise.all([
				page.waitForEvent('download'), // wait for download to start
				monitoringSla.exportThisPageButton.click(),
			]);
			// wait for download to complete
			const path = await download.saveAs(
				'/Users/kiyaya/Dev/ondelivery/automation-testing/end2end__testing__/tests/agent__ondelivery/Reports/MonitoringSLA/Download/monitoring_sla_downloaded.xlsx',
			);
			console.log(path);
		});

		await test.step('verify user can export all', async () => {
			const [download] = await Promise.all([
				page.waitForEvent('download'), // wait for download to start
				monitoringSla.exportAll.click(),
			]);
			// wait for download to complete
			const path = await download.saveAs(
				'/Users/kiyaya/Dev/ondelivery/automation-testing/end2end__testing__/tests/agent__ondelivery/Reports/MonitoringSLA/Download/monitoring_sla_downloaded.xlsx',
			);
			console.log(path);
		});
	});

	test('user can use monitoring SLA with date, agent, and pickup point', async ({
		page,
	}) => {
		const monitoringSla = new monitoringSlaPage(page);

		await test.step('goto monitoring SLA PAGE', async () => {
			await monitoringSla.gotoMonitoringSlaPage();
		});

		await test.step('set date, agent, and pickup point', async () => {
			await expect(monitoringSla.startDateInput).toBeVisible();
			await expect(monitoringSla.endDateInput).toBeVisible();
			await expect(monitoringSla.searchButton).toBeDisabled();
			await monitoringSla.setDateForm('5/1/2023', '5/31/2023');
			await monitoringSla.setAgent('PT ROSHELINE EKSPRES INDONESIA');
			await monitoringSla.setPickupPoint('DC Jakarta Utara');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await expect(monitoringSla.searchButton).toBeEnabled();
			await monitoringSla.searchButton.click();
		});

		// await test.step('user can use pagination', async () => {
		// 	await expect(monitoringSla.leftPaginationButton).toBeVisible();
		// 	await expect(monitoringSla.rightPaginationButton).toBeVisible();

		// 	await monitoringSla.rightPaginationButton.click();
		// 	await monitoringSla.leftPaginationButton.click();
		// });

		await test.step('verify user can export this page', async () => {
			const [download] = await Promise.all([
				page.waitForEvent('download'), // wait for download to start
				monitoringSla.exportThisPageButton.click(),
			]);
			// wait for download to complete
			const path = await download.saveAs(
				'/Users/kiyaya/Dev/ondelivery/automation-testing/end2end__testing__/tests/agent__ondelivery/Reports/MonitoringSLA/Download/monitoring_sla_downloaded.xlsx',
			);
			console.log(path);
		});

		await test.step('verify user can export all', async () => {
			const [download] = await Promise.all([
				page.waitForEvent('download'), // wait for download to start
				monitoringSla.exportAll.click(),
			]);
			// wait for download to complete
			const path = await download.saveAs(
				'/Users/kiyaya/Dev/ondelivery/automation-testing/end2end__testing__/tests/agent__ondelivery/Reports/MonitoringSLA/Download/monitoring_sla_downloaded.xlsx',
			);
			console.log(path);
		});
	});
});
