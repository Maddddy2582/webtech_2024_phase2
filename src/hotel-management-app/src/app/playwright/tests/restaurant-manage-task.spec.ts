import { test, expect } from '@playwright/test';

test('end to end manage orders', async ({page}) =>{
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Sign Up' }).click();
    await page.getByPlaceholder('User Name').fill('John Doe');
    await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
    await page.getByPlaceholder('Password').fill('1234');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
    await page.getByPlaceholder('Password').fill('1234');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.locator('button').filter({ hasText: 'manage_accounts' }).click();
    await page.getByRole('button', { name: 'Register Restaurant' }).click();
    await page.getByLabel('Restaurant Name').fill('Milky Way Cafe');
    await page.getByLabel('Cuisine type').fill('Italian');
    await page.getByLabel('Description').fill('Has amazing coffee');
    await page.getByLabel('Image URL').fill('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzSSC2VddcZnJrcECcu9imJEQVyl-Mx53Wtg&s.png');
    page.once('dialog', dialog => {
          dialog.dismiss().catch(() => {});
        });   
    await page.getByRole('button', { name: 'Register Restaurant' }).click();
    await page.getByLabel('Show more options').click();
  await page.getByRole('button', { name: 'Add Menu Item' }).click();
  await page.getByLabel('Name').fill('Coffee');
  await page.getByLabel('Price').fill('25');
  await page.getByLabel('Image URL').fill('https://www.roastycoffee.com/wp-content/uploads/Australian-Cappuccino-e1633700166537-720x720.jpg');
  await page.getByLabel('Description').fill('Coffee');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await page.locator('mat-card').filter({ hasText: 'Milky Way CafeItalianHas' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.locator('button').filter({ hasText: 'shopping_cart' }).click();
  await page.getByRole('button', { name: 'Pay' }).click();
  await page.getByLabel('Cardholder Name').fill('John Doe');
  await page.getByLabel('Credit Card Number').fill('1234123412341234');
  await page.getByLabel('CVV').fill('123');
  await page.getByPlaceholder('MM/YY').fill('12/26');
  page.once('dialog', dialog => {
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Confirm Pay' }).click();
  await page.getByRole('link', { name: 'My Restaurants' }).click();
  await page.getByLabel('Show more options').click();
  await page.getByRole('button', { name: 'Manage Orders' }).click();
  await expect(page.getByText('Order #')).toBeVisible();
})

