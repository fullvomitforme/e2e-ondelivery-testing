import { expect, type Locator, type Page } from '@playwright/test';

export class monitoringBookingPage {
	readonly page: Page;
	readonly waybillButton: Locator;
	readonly createWaybillButton: Locator;
	readonly monitoringBookingButton: Locator;
	readonly refreshButton: Locator;

	constructor(page: Page) {
		this.page = page;

		this.monitoringBookingButton = page.getByRole('link', {
			name: 'Monitoring Booking',
			exact: true,
		});

		this.refreshButton = page
			.locator('button')
			.filter({ hasText: 'autorenew' });
	}

	async gotoMonitoringBookingPage() {
		await this.monitoringBookingButton.click();
		await expect(this.page).toHaveTitle(/Monitoring Booking/);
	}

	async refreshBookingList() {
		await this.refreshButton.click();
	}
}
