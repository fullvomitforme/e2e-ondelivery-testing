import { expect, type Locator, type Page } from '@playwright/test';

export class createWaybillPage {
	readonly page: Page;
	readonly waybillButton: Locator;
	readonly createWaybillButton: Locator;
	readonly createWaybillMenuBar: Locator;
	readonly namaPengirimForm: Locator;
	readonly noPengirimForm: Locator;
	readonly alamatPengirimForm: Locator;
	readonly namaPenerimaForm: Locator;
	readonly noPenerimaForm: Locator;
	readonly alamatPenerimaForm: Locator;
	readonly kelurahanPenerimaForm: Locator;
	readonly quantityKoli: Locator;
	readonly weight: Locator;
	readonly jenisBarang: Locator;
	readonly descBarang: Locator;
	readonly goodsValue: Locator;
	readonly biayaPacking: Locator;
	readonly goodsChecking: Locator;
	readonly notesSpecialInstructions: Locator;
	readonly referenceNumber: Locator;
	readonly referenceNumberForm: Locator;
	readonly serviceDropdown: Locator;
	readonly submitButton: Locator;

	constructor(page: Page) {
		this.page = page;

		this.waybillButton = page.getByRole('link', { name: 'Waybill' }).first();

		this.createWaybillButton = page.getByRole('link', {
			name: 'Create Waybill',
		});

		this.createWaybillMenuBar = page
			.getByRole('tab', { name: 'Create Waybill', exact: true })
			.locator('div');

		this.namaPengirimForm = page.getByLabel('Nama Pengirim');

		this.noPengirimForm = page.getByLabel('No. Telp/Hp Pengirim');

		this.alamatPengirimForm = page.getByLabel('Alamat Pengirim');

		this.namaPenerimaForm = page.getByLabel('Nama Penerima');

		this.noPenerimaForm = page.getByLabel('No. Telp/Hp Penerima');

		this.alamatPenerimaForm = page.getByLabel('Alamat Penerima');

		this.kelurahanPenerimaForm = page.getByLabel(
			'Kelurahan, Kabupaten, Kota, Provinsi Penerima',
		);

		this.quantityKoli = page.getByPlaceholder('Koli');

		this.weight = page.getByLabel('Weight (Kg)');

		this.jenisBarang = page.getByLabel('Jenis Barang');

		this.descBarang = page.getByLabel('Deskripsi barang');

		this.goodsValue = page.locator('#mat-input-14');

		this.biayaPacking = page.locator('#mat-input-15');

		this.goodsChecking = page.locator(
			'#mat-radio-3 > .mat-radio-label > .mat-radio-container > .mat-radio-inner-circle',
		);

		this.notesSpecialInstructions = page.getByLabel(
			'Notes/Special Instructions',
		);

		this.referenceNumber = page.locator(
			'#mat-checkbox-7 > .mat-checkbox-layout > .mat-checkbox-inner-container',
		);

		this.referenceNumberForm = page.getByLabel('input delivery order number');

		this.serviceDropdown = page.getByLabel('Service').locator('span');

		this.submitButton = page.getByRole('button', { name: 'Submit' });
	}

	async gotoCreateWaybillPage() {
		await this.waybillButton.click();
		await this.createWaybillButton.click();
	}

	async inputFormPengirim(
		pengirim: string,
		noPengirim: string,
		alamatPengirim: string,
	) {
		// nama pengirim
		await expect(this.namaPengirimForm).toBeVisible();
		await this.namaPengirimForm.click();
		await this.namaPengirimForm.fill(pengirim);

		// no pengirim
		await expect(this.noPengirimForm).toBeVisible();
		await this.noPengirimForm.click();
		await this.noPengirimForm.fill(noPengirim);

		// alamat pengirim
		await expect(this.alamatPengirimForm).toBeVisible();
		await this.alamatPengirimForm.click();
		await this.alamatPengirimForm.fill(alamatPengirim);
	}

	async inputFormPenerima(
		penerima: string,
		noPenerima: string,
		alamatPenerima: string,
		kelurahanForm: string,
	) {
		// nama pengirim
		await expect(this.namaPenerimaForm).toBeVisible();
		await this.namaPenerimaForm.click();
		await this.namaPenerimaForm.fill(penerima);

		// no pengirim
		await expect(this.noPenerimaForm).toBeVisible();
		await this.noPenerimaForm.click();
		await this.noPenerimaForm.fill(noPenerima);

		// alamat pengirim
		await expect(this.alamatPenerimaForm).toBeVisible();
		await this.alamatPenerimaForm.click();
		await this.alamatPenerimaForm.fill(alamatPenerima);

		// kelurahan
		await expect(this.kelurahanPenerimaForm).toBeVisible();
		await this.kelurahanPenerimaForm.click();
		await this.page
			.getByRole('combobox', {
				name: 'Kelurahan, Kabupaten, Kota, Provinsi Penerima',
			})
			.type(kelurahanForm, { delay: 100 });

		await this.page.getByText(kelurahanForm).click();
	}
	async weightAndQuantity(
		weight: string,
		koli: string,
		jenisBarang: string,
		descBarang: string,
		goodsValue: string,
		biayaPacking: string,
		notesSpecialInstructions: string,
		referenceNumber: string,
	) {
		// await expect(this.quantityKoli).toBeVisible();
		await this.quantityKoli.click();
		await this.quantityKoli.fill(koli);

		await expect(this.weight).toBeVisible();
		await this.weight.click();
		await this.weight.fill(weight);

		await expect(this.jenisBarang).toBeVisible();
		await this.jenisBarang.click();
		await this.page.getByText(jenisBarang, { exact: true }).click();

		await expect(this.descBarang).toBeVisible();
		await this.descBarang.click();
		await this.descBarang.fill(descBarang);

		await expect(this.goodsValue).toBeVisible();
		await this.goodsValue.click();
		await this.goodsValue.fill(goodsValue);

		await expect(this.biayaPacking).toBeVisible();
		await this.biayaPacking.click();
		await this.biayaPacking.fill(biayaPacking);

		await expect(this.goodsChecking).toBeVisible();
		await this.goodsChecking.click();

		await expect(this.notesSpecialInstructions).toBeVisible();
		await this.notesSpecialInstructions.click();
		await this.notesSpecialInstructions.fill(notesSpecialInstructions);

		await expect(this.referenceNumber).toBeVisible();
		await this.referenceNumber.click();
		await this.referenceNumberForm.fill(referenceNumber);
	}

	async selectServiceAndSubmit(service: string) {
		await this.serviceDropdown.click();
		await this.page.getByText(service, { exact: true }).click();

		await this.submitButton.click();
	}
}
