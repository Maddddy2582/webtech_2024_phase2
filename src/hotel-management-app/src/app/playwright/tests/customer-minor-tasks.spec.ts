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
  await expect(page.getByRole('link', { name: 'Sign Up' })).toBeVisible();
});

test('sign up button is  disabled when text fields are blank', async ({page})=> {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await expect(page.locator(".btn-signin")).toBeDisabled();
})

test('should display error message if email already exists while registering', async ({page}) => {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').fill('John Doe'); 
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page.getByText('Email already exist')).toBeVisible();
})

test('should show error message if login credentials are wrong' , async ({page})=> {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByText('Invalid email or password')).toBeVisible();
})

test('should open dashboard and display menu items when correct credentials are entered', async ({page}) => {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  const menu =  page.locator('mat-card').filter({ hasText: 'Pizza PalaceItalianA' }).locator('div').first();
  await expect(menu).toBeVisible();
})

test('restaurant menu should be visible when view menu is clicked', async ({page}) => {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.locator('mat-card').filter({ hasText: 'Pizza PalaceItalianA' }).getByRole('button').click();
  const menuItem = page.locator('mat-card').filter({ hasText: 'Margherita PizzaClassic' }).locator('div').first();
  await expect(menuItem).toBeVisible();
})

test('profile page opens when profile button is clicked', async ({page}) => {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.locator('button').filter({ hasText: 'manage_accounts' }).click();
  await expect(page.getByRole('heading', { name: 'John Doe' })).toBeVisible();
})

test('cart is empty before ordereing food', async ({page}) => {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.locator('button').filter({ hasText: 'shopping_cart' }).click();
  await expect(page.getByRole('heading', { name: 'Your Cart is Empty' })).toBeVisible();
})

test('customer logs out when logout button is clicked', async ({page}) => {
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('User Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.getByPlaceholder('Email').fill('johndoe@gmail.com');
  await page.getByPlaceholder('Password').fill('1234');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.locator('button').filter({ hasText: 'exit_to_app' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
})

test('clicking the logo should naviagte user to dashboard' , async ({page}) => {
  
})
