import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../Login/login__page';
import { monitoringBookingPage } from './monitoring__booking.page';

test.beforeEach(async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.login('ondelondel', 'Grandtour17!');
});

test.describe('Monitoring Booking', async () => {
	test('gua bisa monitor booking successfully', async ({ page }) => {
		const monitoringBooking = new monitoringBookingPage(page);
		await test.step('goto monitoring booking page', async () => {
			await monitoringBooking.gotoMonitoringBookingPage();
		});

		await test.step('use refresh button', async () => {
			await monitoringBooking.refreshBookingList();
		});
	});
});
