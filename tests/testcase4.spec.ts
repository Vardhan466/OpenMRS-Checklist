import { test, expect } from '@playwright/test';

test.describe('OpenMRS Patient Management - Edit Patient Weight', () => {
  test('should update the weight of an existing patient', async ({ page }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('Admin123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByTestId('searchPatientIcon')).toBeVisible();

    await page.getByTestId('searchPatientIcon').click();

    const searchBar = page.getByTestId('patientSearchBar');
    await expect(searchBar).toBeVisible();
    await searchBar.fill('susan lopez');

    const patientLink = page.getByRole('link', {
      name: 'Avatar for Susan Lopez Susan',
    });

    await expect(patientLink).toBeVisible();
    await patientLink.click();

    await page.getByRole('button', { name: 'Options' }).first().click();

    await page.getByRole('menuitem', { name: 'Edit' }).click();

    const weightInput = page.getByRole('spinbutton', { name: 'Weight' });

    await expect(weightInput).toBeVisible();
    await weightInput.fill('98');

    await page.getByRole('button', { name: 'Save and close' }).click();

    await expect(
      page.getByText('98', { exact: true })
    ).toBeVisible({ timeout: 10000 });

    await page.getByRole('link', { name: 'OpenMRS Logo' }).click();
  });
});