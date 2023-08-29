import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../../Login/login__page';
import { EditPodPage } from './edit__pod.page';
import { TrackAndTracePage } from '../../../TrackAndTrace/track__and__trace.page';

test.beforeEach(async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.login('ondelondel', 'Grandtour17!');
});

test.describe('Edit POD', () => {
	test('user go to edit pod page', async ({ page }) => {
		const editPod = new EditPodPage(page);

		await test.step('goto edit pod page', async () => {
			await editPod.gotoEditPodPage();
		});
	});

	test('user can see edit pod list with date valid value', async ({ page }) => {
		const editPod = new EditPodPage(page);

		await test.step('goto edit pod page', async () => {
			await editPod.gotoEditPodPage();
		});

		await test.step('set date', async () => {
			await editPod.searchButton.isDisabled();
			await editPod.setDateForm('5/1/2023', '5/29/2023');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await editPod.searchButton.isEnabled();
			await editPod.searchButton.click();
			await expect(editPod.editPodListView).toBeVisible();
		});
	});

	test('user can change pod to reject', async ({ page }) => {
		const editPod = new EditPodPage(page);

		await test.step('goto edit pod page', async () => {
			await editPod.gotoPodListPage();
		});

		await test.step('set date', async () => {
			await editPod.searchButton.isDisabled();
			await editPod.setDateForm('5/1/2023', '5/29/2023');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await editPod.searchButton.isEnabled();
			await editPod.searchButton.click();
		});

		await test.step('user can change pod to reject', async () => {
			await editPod.rejectFlow('Tidak bagus');
		});
	});

	test('user can upload in edit pod and see in track and trace', async ({
		page,
	}) => {
		const editPod = new EditPodPage(page);

		await test.step('goto edit pod page', async () => {
			await editPod.gotoEditPodPage();
		});

		await test.step('set date', async () => {
			await editPod.searchButton.isDisabled();
			await editPod.setDateForm('5/1/2023', '5/31/2023');
		});

		await test.step('verify user can search with date form valid value', async () => {
			await editPod.searchButton.isEnabled();
			await editPod.searchButton.click();
			await expect(editPod.editPodListView).toBeVisible();
		});

		await test.step('user can acccept edit pod', async () => {
			await editPod.acceptEditPod('/downloads/pod-testing.jpg');
		});

		await test.step('user can see updated pod in track and trace', async () => {
			const trackAndTrace = new TrackAndTracePage(page);
			await trackAndTrace.gotoTrackAndTracePage();
			await expect(trackAndTrace.waybillNumberInput).toBeVisible();
			await trackAndTrace.searchWaybill('JKT3X2O7WN135U001');
		});
	});
});
