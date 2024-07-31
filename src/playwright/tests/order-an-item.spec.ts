import { test } from '@playwright/test';

test.beforeEach( async ({page})=> {
  await page.goto('http://localhost:4200/');
})

test('end to end test for ordering an item', async({page}) => {
    await page.getByRole('link', { name: 'Sign Up' }).click();
    await page.getByPlaceholder('User Name').click();
    await page.getByPlaceholder('User Name').fill('John Doe');
    await page.getByPlaceholder('User Name').press('Tab');
    await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('1234');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('1234');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.locator('mat-card').filter({ hasText: 'Pizza PalaceItalianA' }).getByRole('button').click();
    await page.locator('mat-card-content').filter({ hasText: '₹200Add to Cart' }).getByRole('button').click();
    await page.locator('button').filter({ hasText: 'shopping_cart' }).click();
    await page.getByRole('button', { name: 'Pay' }).click();
    await page.getByText('Cardholder Name').click();
    await page.getByLabel('Cardholder Name').fill('John Doe');
    await page.getByText('Credit Card Number').click();
    await page.getByLabel('Credit Card Number').fill('1234123412341234');
    await page.getByLabel('CVV').click();
    await page.getByLabel('CVV').fill('123');
    await page.getByText('Expiry Date').click();
    await page.getByPlaceholder('MM/YY').fill('12/12');
    await page.getByPlaceholder('MM/YY').click();
    await page.getByPlaceholder('MM/YY').fill('12/26');
    await page.goto('http://localhost:4200/dashboard');
    await page.locator('button').filter({ hasText: 'local_shipping' }).click();
    await expect(page.getByText('Order #')).toBeDefined();
  })
