import { expect, type Locator, type Page } from '@playwright/test';

export class TrackAndTracePage {
	readonly page: Page;
	trackAndTraceButton: Locator;
	waybillNumberInput: Locator;
	checkButton: Locator;

	constructor(page: Page) {
		this.page = page;

		this.trackAndTraceButton = page.getByRole('link', {
			name: 'Track & Trace',
		});

		this.waybillNumberInput = page.getByPlaceholder('Waybill number');

		this.checkButton = page.getByRole('button', { name: 'Check' });
	}

	async gotoTrackAndTracePage() {
		await this.trackAndTraceButton.click();
		await expect(this.page).toHaveTitle('Trace & Tracking');
	}

	async searchWaybill(waybillNumber: string) {
		await this.waybillNumberInput.type(waybillNumber);

		await this.checkButton.click();

		await expect(this.page).toHaveTitle('Trace & Tracking');

		await expect(
			this.page.getByRole('heading', {
				name: waybillNumber,
				exact: true,
			}),
		).toBeVisible();

		const deliveryInfo = this.page.getByRole('heading', {
			name: 'DELIVERY INFO',
		});

		await expect(deliveryInfo).toBeVisible();

		await deliveryInfo.scrollIntoViewIfNeeded();

		await this.page.screenshot({
			path:
				__dirname + `/downloads/screenshot tracking of ${waybillNumber}.png`,
			fullPage: true,
		});
	}
}
