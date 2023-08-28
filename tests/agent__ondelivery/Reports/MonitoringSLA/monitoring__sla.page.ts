import { Locator, Page, expect } from '@playwright/test';

export class monitoringSlaPage {
	page: Page;
	reportsMenuButton: Locator;
	monitoringSlaButton: Locator;
	startDateInput: Locator;
	endDateInput: Locator;
	agentDropdown: Locator;
	pickupPointDropdown: Locator;
	searchButton: Locator;
	exportThisPageButton: Locator;
	exportAll: Locator;
	leftPaginationButton: Locator;
	rightPaginationButton: Locator;
	constructor(page: Page) {
		this.page = page;

		this.reportsMenuButton = page.getByRole('link', {
			name: 'Reports',
		});

		this.monitoringSlaButton = page.getByRole('link', {
			name: 'Monitoring SLA',
			exact: true,
		});

		this.startDateInput = page.getByLabel('Start Date');
		this.endDateInput = page.getByLabel('End Date');

		this.agentDropdown = page.getByRole('combobox', { name: 'Agent' });

		this.pickupPointDropdown = page.getByRole('combobox', {
			name: 'Pick up Point',
		});

		this.searchButton = page.getByRole('button', { name: 'Search' });

		this.leftPaginationButton = page.getByLabel('Previous page');

		this.rightPaginationButton = page.getByLabel('Next page');

		this.exportThisPageButton = page.getByRole('button', {
			name: 'Export this page',
		});

		this.exportAll = page.getByRole('button', { name: 'Export All' });
	}

	async gotoMonitoringSlaPage() {
		await expect(this.reportsMenuButton).toBeVisible();
		await this.reportsMenuButton.click();

		await expect(this.monitoringSlaButton).toBeVisible();
		await this.monitoringSlaButton.click();

		await expect(this.page).toHaveTitle(/Monitoring SLA/);
	}

	async setDateForm(startDate: string, endDate: string) {
		await expect(this.startDateInput).toBeVisible();
		await this.startDateInput.fill(startDate);

		await expect(this.endDateInput).toBeVisible();
		await this.endDateInput.fill(endDate);
	}

	async setAgent(agent: string) {
		await expect(this.agentDropdown).toBeVisible();
		await this.agentDropdown.click();

		await this.page
			.getByRole('option', {
				name: agent,
			})
			.locator('span')
			.click();
	}

	async setPickupPoint(pickupPoint: string) {
		await expect(this.pickupPointDropdown).toBeVisible();
		await this.pickupPointDropdown.click();

		await this.page
			.getByRole('option', { name: pickupPoint })
			.locator('span')
			.click();
	}
}
