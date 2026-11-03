import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Patient Program Management', () => {
  test('should edit the program completion date for Susan Lopez', async ({
    page,
  }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('Admin123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByTestId('searchPatientIcon')).toBeVisible();

    await page.getByTestId('searchPatientIcon').click();

    const patientSearchBar = page.getByTestId('patientSearchBar');
    await expect(patientSearchBar).toBeVisible();
    await patientSearchBar.fill('susan lopez');

    const patientLink = page.getByRole('link', {
      name: 'Avatar for Susan Lopez Susan',
    });

    await expect(patientLink).toBeVisible();
    await patientLink.click();

    await page.getByRole('link', { name: 'Programs', exact: true }).click();

    const optionsButton = page.getByRole('button', {
      name: 'Options',
    }).first();

    await expect(optionsButton).toBeVisible();
    await optionsButton.click();

    await page.getByRole('menuitem', { name: 'Edit' }).click();

    const completionDate = page.getByRole('spinbutton', {
      name: 'day, Date completed',
    });

    await expect(completionDate).toBeVisible();

    await page.getByRole('button', { name: 'Save and close' }).click();

    await expect(completionDate).not.toBeVisible();
  });
});