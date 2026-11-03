import { test, expect } from '@playwright/test';

test.describe('OpenMRS Patient Management', () => {
  test('should log in successfully and navigate to Add Patient', async ({ page }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    const usernameInput = page.locator('input[name="username"]');
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('admin');

    await page.getByRole('button', { name: 'Continue' }).click();

    const passwordInput = page.locator('input[name="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('Admin123');

    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(
      page.getByRole('button', { name: 'Add patient', exact: true })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Add patient', exact: true }).click();

    await expect(page).toHaveURL(/patient/);
  });
});