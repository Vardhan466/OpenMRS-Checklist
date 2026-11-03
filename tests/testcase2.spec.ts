import { test, expect } from '@playwright/test';

test.describe('OpenMRS Patient Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    await page.locator('input[name="username"]').fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.locator('input[name="password"]').fill('Admin123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(
      page.getByRole('button', { name: 'Add patient', exact: true })
    ).toBeVisible();
  });

  test('should register a new patient successfully', async ({ page }) => {
    await page.getByRole('button', { name: 'Add patient', exact: true }).click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
    await page
      .getByRole('textbox', { name: 'Middle Name (optional)' })
      .fill('Automation');
    await page.getByRole('textbox', { name: 'Family Name' }).fill('Patient');

    const genderOption = page.locator('.cds--radio-button__appearance').first();
    await genderOption.click();

    const birthDay = page.getByRole('spinbutton', {
      name: 'day, Date of birth',
    });
    await birthDay.fill('15');

    await page
      .getByRole('textbox', { name: 'Address (optional)' })
      .fill('Delhi');

    await page
      .getByRole('button', { name: 'Register patient' })
      .click();

    await expect(page.getByText('Test Automation Patient')).toBeVisible({
      timeout: 10000,
    });
  });
});