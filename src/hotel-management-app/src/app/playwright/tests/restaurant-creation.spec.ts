import { test, expect } from '@playwright/test';

test('create a new restaruant', async ({page}) => {
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
        const alertMessage = dialog.message();
        expect(alertMessage).toContain('Restaurant registered successfully!');
          dialog.dismiss().catch(() => {});
        });   
    await page.getByRole('button', { name: 'Register Restaurant' }).click();
})

