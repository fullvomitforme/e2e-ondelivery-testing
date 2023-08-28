import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../Login/login__page';
import { createWaybillPage } from '../../Waybill/create__waybill/create__waybill_page';

test.beforeEach(async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.login('tzkymjhd', 'tzkymjhd');
});

test.describe('Create Waybill', async () => {
	test('gua bisa bikin waybill with valid value successfully', async ({
		page,
	}) => {
		const waybillPage = new createWaybillPage(page);
		await waybillPage.gotoCreateWaybillPage();

		await waybillPage.inputFormPengirim(
			'Testing Pengirim',
			'081234567890',
			'Jl. Testing Pengirim',
		);

		await waybillPage.inputFormPenerima(
			'Testing Penerima',
			'081234567890',
			'Jl. Testing Penerima',
			'sunter agung',
		);

		await waybillPage.weightAndQuantity(
			'1',
			'1',
			'DOKUMEN (DOCUMENT)',
			'Testing Barang',
			'0',
			'0',
			'Testing Barang',
			'081381977551',
		);

		await waybillPage.selectServiceAndSubmit('REGULER');
	});
});
