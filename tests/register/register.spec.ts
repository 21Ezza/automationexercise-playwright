import {expect, test} from "@playwright/test";
import playwrightConfig from "../../playwright.config";

test.describe('Register', () => {
    const baseUrl = playwrightConfig.use.baseURL;
    test('Positive scenario', async ({ page }) =>{

        await page.goto(baseUrl);
        await expect(page).toHaveURL(baseUrl);
        await page.getByRole('link', { name: 'Website for automation' }).isVisible();
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page).toHaveURL(`${baseUrl}/login`);

        await page.getByRole('textbox', { name: 'Name' }).fill('User One')
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('userOne@email.com')
        await page.getByRole('button', { name: 'Signup' }).click();
    })
})