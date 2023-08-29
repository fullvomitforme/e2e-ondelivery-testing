import { Locator, Page, expect } from '@playwright/test';

export class component__generalPage {
	page: Page;
	constructor(page: Page) {
		this.page = page;
	}
}
