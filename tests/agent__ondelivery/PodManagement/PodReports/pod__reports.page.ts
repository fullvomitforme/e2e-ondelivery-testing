import { expect, type Locator, type Page } from '@playwright/test';

export class podReportsPage {
	readonly page: Page;
	readonly podManagementButton: Locator;
	readonly podReportsButton: Locator;
	readonly startDateInput: Locator;
	readonly endDateInput: Locator;
	readonly searchButton: Locator;
	readonly exportAll: Locator;
	readonly noAwbInput: Locator;
	readonly originInput: Locator;
	readonly scanHandlerInput: Locator;
	readonly courierNameInput: Locator;
	readonly statusApproveDropdown: Locator;
	readonly podReportsList: Locator;
	readonly leftPaginationButton: Locator;
	readonly rightPaginationButton: Locator;
	readonly itemsPerPageButton: Locator;

	constructor(page: Page) {
		this.page = page;

		this.podManagementButton = page.getByRole('link', {
			name: 'POD Management',
		});

		this.podReportsButton = page.getByRole('link', {
			name: 'POD Reports',
		});

		this.startDateInput = page.getByLabel('Start Date');

		this.endDateInput = page.getByLabel('End Date');

		this.searchButton = page.getByRole('button', { name: 'Search' });

		this.exportAll = page.getByRole('button', { name: 'Export All' });

		this.noAwbInput = page.getByLabel('No AWB');

		this.originInput = page.getByLabel('Origin');

		this.scanHandlerInput = page.getByLabel('Scan Handler');

		this.courierNameInput = page.getByLabel('Courier Name');

		this.statusApproveDropdown = page.getByRole('combobox', {
			name: 'Status Approve',
		});

		this.exportAll = page.getByRole('button', { name: 'Export All' });

		this.podReportsList = page.locator('app-pod-approval-reports div').filter({
			hasText:
				'POD Waybill Number Origin ConsigneeName ConsigneeAddress PickupDate CourierOwner',
		});

		this.rightPaginationButton = page.getByLabel('Next Page');

		this.leftPaginationButton = page.locator(
			'button[ng-reflect-message="Previous page"]',
		);

		this.itemsPerPageButton = page
			.getByLabel('Items per page:')
			.locator('div')
			.nth(2);
	}

	async gotoPodReportsPage() {
		await expect(this.podManagementButton).toBeVisible();
		await this.podManagementButton.click();

		await expect(this.podReportsButton).toBeVisible();
		await this.podReportsButton.click();
	}

	async setDateForm(startDate: string, endDate: string) {
		await expect(this.startDateInput).toBeVisible();
		await this.startDateInput.fill(startDate);

		await expect(this.endDateInput).toBeVisible();
		await this.endDateInput.fill(endDate);
	}

	async setNoAwb(noAwb: string) {
		await expect(this.noAwbInput).toBeVisible();
		await this.noAwbInput.fill(noAwb);
	}

	async setOrigin(origin: string) {
		await expect(this.originInput).toBeVisible();
		await this.originInput.fill(origin);
	}

	async setScanHandler(scanHandler: string) {
		await expect(this.scanHandlerInput).toBeVisible();
		await this.scanHandlerInput.fill(scanHandler);
	}

	async setCourierName(courierName: string) {
		await expect(this.courierNameInput).toBeVisible();
		await this.courierNameInput.fill(courierName);
	}

	async setStatusApprove(statusApprove: string) {
		await expect(this.statusApproveDropdown).toBeVisible();
		await this.statusApproveDropdown.click();
		await this.page.getByText(statusApprove, { exact: true }).click();
	}

	async itemsPerPage(itemsPerPage: string) {
		await expect(this.itemsPerPageButton).toBeVisible();
		await this.itemsPerPageButton.click();
		await this.page.getByText(itemsPerPage, { exact: true }).click();
	}
}
