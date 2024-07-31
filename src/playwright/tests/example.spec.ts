import { test, expect } from '@playwright/test';

test.beforeEach( async ({page})=> {
  await page.goto('http://localhost:4200/');
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/HotelManagementApp/);
});

test('should swap between login and signup page', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await expect(page.getByRole('link', { name: 'Log In' })).toBeVisible();
  await page.getByRole('link', { name: 'Log In' }).click();
});

test('sign up button is  disabled when text fields are blank', async ({page})=> {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await expect(page.locator(".btn-signin")).toBeDisabled();
})

test('should display error message if email already exists while registering', async ({page}) => {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page.getByText('Email already exist')).toBeVisible();
})

test('should show error message if login credentials are wrong' , async ({page})=> {
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
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Invalid email or password')).toBeVisible();
})

test('should open dashboard and display menu items when correct credentials are entered', async ({page}) => {
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
  const menu =  page.locator('mat-card').filter({ hasText: 'Pizza PalaceItalianA' }).locator('div').first();
  await expect(menu).toBeVisible();
})

test('restaurant menu should be visible when view menu is clicked', async ({page}) => {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').click();
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
  const menuItem = page.locator('mat-card').filter({ hasText: 'Margherita PizzaClassic' }).locator('div').first();
  await expect(menuItem).toBeVisible();
})




