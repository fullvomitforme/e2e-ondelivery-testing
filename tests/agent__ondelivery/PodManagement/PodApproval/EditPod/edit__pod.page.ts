import { expect, type Locator, type Page } from '@playwright/test';

export class EditPodPage {
	readonly page: Page;
	podManagementButton: Locator;
	podApprovalButton: Locator;
	editPodButton: Locator;
	startDateInput: Locator;
	endDateInput: Locator;
	searchButton: Locator;
	exportAll: Locator;
	noAwbInput: Locator;
	originInput: Locator;
	scanHandlerInput: Locator;
	courierNameInput: Locator;
	editPodListView: Locator;
	rightPaginationButton: Locator;
	leftPaginationButton: Locator;
	itemsPerPageButton: Locator;
	acceptButton: Locator;
	uploadPodButton: Locator;
	checkboxPod: Locator;
	yesButton: Locator;
	noButton: Locator;
	rejectButton: Locator;
	alasanDropdown: Locator;
	lainnyaOption: Locator;
	lainnyaInput: Locator;
	closeButton: Locator;
	podListButton: Locator;
	constructor(page: Page) {
		this.page = page;

		this.podManagementButton = page.getByRole('link', {
			name: 'POD Management',
		});

		this.podApprovalButton = page.getByRole('link', {
			name: 'POD Approval',
		});

		this.podListButton = page.getByRole('tab', { name: 'POD List' });

		this.editPodButton = page.getByRole('tab', { name: 'Edit POD' });

		this.startDateInput = page.getByLabel('Start Date').last();

		this.endDateInput = page.getByLabel('End Date').last();

		this.searchButton = page.getByRole('button', { name: 'Search' }).last();

		this.exportAll = page.getByRole('button', { name: 'Export All' }).last();

		this.acceptButton = page.getByRole('button', { name: 'Accept' }).last();

		this.noAwbInput = page.getByLabel('No AWB');

		this.originInput = page.getByLabel('Origin');

		this.scanHandlerInput = page.getByLabel('Scan Handler');

		this.courierNameInput = page.getByLabel('Courier Name');

		this.editPodListView = page.locator('app-edit-pod div').filter({
			hasText:
				'Upload POD Waybill Number Origin Consignee Name Status Waybill Agent Handler Las',
		});

		this.checkboxPod = page.locator('#mat-checkbox-6');

		this.rightPaginationButton = page.locator(
			'button[ng-reflect-message="Next Page"]',
		);

		this.leftPaginationButton = page.locator(
			'button[ng-reflect-message="Previous page"]',
		);

		this.itemsPerPageButton = page
			.getByLabel('Items per page:')
			.locator('div')
			.nth(2);

		this.uploadPodButton = page.locator('input[type="file"]').first();

		this.yesButton = page.getByRole('button', { name: 'Yes' });
		this.noButton = page.getByRole('button', { name: 'No' });

		this.rejectButton = page
			.locator('button[ng-reflect-message="Reject POD"]')
			.first();

		this.alasanDropdown = page.getByLabel('Alasan *').locator('span');

		this.lainnyaOption = page.getByRole('option', { name: 'Lainnya' });

		this.lainnyaInput = page.getByLabel('Alasan lainnya');

		this.closeButton = page.getByRole('button', { name: 'Close' });
	}

	async gotoEditPodPage() {
		console.log('===== gotoEditPodPage =====');

		await expect(this.podManagementButton).toBeVisible();
		console.log('button pod management visible 👍🏻');
		await this.podManagementButton.click();

		await expect(this.podApprovalButton).toBeVisible();
		console.log('button pod approval visible 👍🏻');
		await this.podApprovalButton.click();

		await expect(this.editPodButton).toBeVisible();
		console.log('button tab edit pod visible 👍🏻');
		await this.editPodButton.click();

		await expect(this.page).toHaveTitle('POD Approval');
		console.log('title page is POD Approval 👍🏻');
		console.log('===== gotoEditPodPage =====');
	}

	async gotoPodListPage() {
		console.log('===== gotoPODListPage =====');

		await expect(this.podManagementButton).toBeVisible();
		console.log('button pod management visible 👍🏻');
		await this.podManagementButton.click();

		await expect(this.podApprovalButton).toBeVisible();
		console.log('button pod approval visible 👍🏻');
		await this.podApprovalButton.click();

		await expect(this.podListButton).toBeVisible();
		console.log('button tab pod list visible 👍🏻');
		await this.podListButton.click();

		await expect(this.page).toHaveTitle('POD Approval');
		console.log('title page is POD Approval 👍🏻');
		console.log('===== gotoPODListPage =====');
	}

	async setDateForm(startDate: string, endDate: string) {
		console.log('===== setDateForm =====');
		await expect(this.startDateInput).toBeVisible();
		console.log('start date input is visible 👍🏻');

		await this.startDateInput.fill(startDate);
		console.log(`set start date: ${startDate} 👍🏻`);

		await expect(this.endDateInput).toBeVisible();
		console.log('end date input is visible 👍🏻');
		await this.endDateInput.fill(endDate);
		console.log(`set end date: ${startDate} 👍🏻`);
		console.log('===== setDateForm =====');
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

	async acceptEditPod(file: string) {
		console.log('===== acceptEditPod =====');
		const fileChooserPromise = this.page.waitForEvent('filechooser');
		await this.uploadPodButton.click();
		const fileChooser = await fileChooserPromise;
		const filePath = __dirname + file;
		console.log(filePath);
		await fileChooser.setFiles(filePath);

		await expect(this.acceptButton).toBeDisabled();
		await this.checkboxPod.click();

		await expect(this.acceptButton).toBeVisible();
		await this.acceptButton.click();

		await this.page
			.getByText('Apakah anda yakin ingin mengkonfirmasi?')
			.isVisible();

		await this.yesButton.isVisible();
		await this.yesButton.click();

		await this.page.getByRole('button', { name: 'Close' }).isVisible();
		await this.page.getByRole('button', { name: 'Close' }).click();
	}

	async rejectFlow(rejectReason: string) {
		await this.rejectButton.click();
		await this.alasanDropdown.click();
		await this.lainnyaOption.click();
		await this.lainnyaInput.fill(rejectReason);
		await this.acceptButton.click();
		await expect(this.page.getByText('POD berhasil direject!')).toBeVisible();

		await this.closeButton.click();
	}
}
