import { test, expect } from '@playwright/test';

test.beforeEach( async ({page})=> {
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
})

test('add menu item to restaurant', async({page})=> {
    await page.getByLabel('Show more options').click();
    await page.getByRole('button', { name: 'Add Menu Item' }).click();
    await page.getByLabel('Name').fill('Coffee');
    await page.getByLabel('Price').fill('25');
    await page.getByLabel('Image URL').fill('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjO_fPb1ylVZnBXDytmY40Mry6Mj2p4wJLqg&s.png');
    await page.getByLabel('Description').fill('Delicious coffee');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Coffee - 25 EditDelete')).toBeVisible();
})

test('edit the existing menu', async ({page}) => {
    await page.getByLabel('Show more options').click();
    await page.getByRole('button', { name: 'Add Menu Item' }).click();
    await page.getByLabel('Name').fill('coffee');    
    await page.getByLabel('Price').fill('25');
    await page.getByLabel('Image URL').fill('https://www.roastycoffee.com/wp-content/uploads/Australian-Cappuccino-e1633700166537-720x720.jpg');
    await page.getByLabel('Description').fill('Has delicious coffee');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Name').fill('Tea');
    await page.getByLabel('Description').fill('Has delicious Tea');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Tea - 25 EditDelete')).toBeVisible();
})

test('delete a menu item', async ({page}) => {
    await page.getByLabel('Show more options').click();
    await page.getByRole('button', { name: 'Add Menu Item' }).click();
    await page.getByLabel('Name').fill('Coffee');
    await page.getByLabel('Price').fill('25');
    await page.getByLabel('Image URL').fill('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjO_fPb1ylVZnBXDytmY40Mry6Mj2p4wJLqg&s.png');
    await page.getByLabel('Description').fill('Delicious coffee');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Coffee - 25 EditDelete')).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('Coffee - 25 EditDelete')).not.toBeVisible();
})

test('edit a restaurant' , async ({page}) => {
    await page.getByLabel('Show more options').click();
    await page.getByRole('button', { name: 'Edit Restaurant' }).click();
    await page.getByLabel('Name').fill('Andromeda Cafe');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Andromeda Cafe')).toBeVisible()
})

test('delete a restaurant', async ({page}) => {
    await page.getByLabel('Show more options').click();
    await page.getByRole('button', { name: 'Delete Restaurant' }).click();
    await expect(page.getByText('No restaurants to display!')).toBeVisible();
})







