import {expect, test} from "@playwright/test";
import playwrightConfig from "../../playwright.config";

test.describe('Register', () => {
    function getRandomString(length: number) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
    const randomEmail = `${getRandomString(6)}@example.com`;
    const baseUrl = playwrightConfig.use.baseURL;
    test('Positive scenario', async ({ page }) =>{

        await page.goto(baseUrl);
        await expect(page).toHaveURL(baseUrl);
        await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
        await page.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(page).toHaveURL(`${baseUrl}/login`);

        await page.getByRole('textbox', { name: 'Name' }).fill('User One')
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(randomEmail)
        await page.getByRole('button', { name: 'Signup' }).click();

        await expect(page).toHaveURL(`${baseUrl}/signup`);
        await page.getByRole('radio', { name: 'Mr.' }).check();
        await page.getByRole('textbox', { name: 'Password *' }).fill('!Asdf123')
        await page.locator('#days').selectOption('2');
        await page.locator('#months').selectOption('10');
        await page.locator('#years').selectOption('1998');
        await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
        await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

        await page.getByRole('textbox', { name: 'First name *' }).fill('Madison')
        await page.getByRole('textbox', { name: 'Last name *' }).fill('Reynolds')
        await page.getByRole('textbox', { name: 'Company', exact: true }).fill('Silverstone Analytics Inc.')

        await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('3128 Pinewood Drive')
        await page.getByLabel('Country *').selectOption('United States');
        await page.getByRole('textbox', { name: 'State *' }).fill('Columbus')
        await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('OH')
        await page.locator('#zipcode').fill('43215')
        await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('(415) 839-2746')
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page).toHaveURL(`${baseUrl}/account_created`);





    })
})