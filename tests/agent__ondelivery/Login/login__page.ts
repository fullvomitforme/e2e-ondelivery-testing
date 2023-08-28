import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	readonly usernameInputForm: Locator;
	readonly passwordInputForm: Locator;
	readonly loginButton: Locator;
	// readonly getStartedLink: Locator;
	// readonly gettingStartedHeader: Locator;
	// readonly pomLink: Locator;
	// readonly tocList: Locator;

	constructor(page: Page) {
		// this.page = page;
		// this.getStartedLink = page.locator('a', { hasText: 'Get started' });
		// this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
		// this.pomLink = page
		// 	.locator('li', {
		// 		hasText: 'Guides',
		// 	})
		// 	.locator('a', {
		// 		hasText: 'Page Object Model',
		// 	});
		// this.tocList = page.locator('article div.markdown ul > li > a');

		this.page = page;
		this.usernameInputForm = page.getByLabel('Username');
		this.passwordInputForm = page.getByLabel('Password');
		this.loginButton = page.getByRole('button', { name: 'Login' });
	}

	async goto() {
		await this.page.goto('/');
	}

	async login(username: string, password: string) {
		await expect(this.usernameInputForm).toBeVisible();
		await this.usernameInputForm.click();
		await this.usernameInputForm.fill(username);

		await expect(this.passwordInputForm).toBeVisible();
		await this.passwordInputForm.click();
		await this.passwordInputForm.fill(password);

		await this.loginButton.click();
	}

	// async goto() {
	// 	await this.page.goto('https://playwright.dev');
	// }

	// async getStarted() {
	// 	await this.getStartedLink.first().click();
	// 	await expect(this.gettingStartedHeader).toBeVisible();
	// }

	// async pageObjectModel() {
	// 	await this.getStarted();
	// 	await this.pomLink.click();
	// }
}
