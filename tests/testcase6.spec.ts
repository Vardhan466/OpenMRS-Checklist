import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Vitals & Biometrics Management', () => {
  test('should add a new temperature reading for Susan Lopez', async ({
    page,
  }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('Admin123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(
      page.getByTestId('searchPatientIcon')
    ).toBeVisible();

    await page.getByTestId('searchPatientIcon').click();

    const patientSearchBar = page.getByTestId('patientSearchBar');
    await expect(patientSearchBar).toBeVisible();
    await patientSearchBar.fill('susan');

    const patientLink = page.getByRole('link', {
      name: 'Avatar for Susan Lopez Susan',
    });

    await expect(patientLink).toBeVisible();
    await patientLink.click();

    await page
      .getByRole('link', { name: 'Vitals & Biometrics' })
      .click();

    const addButtons = page.getByRole('button', {
      name: 'Add',
      exact: true,
    });

    await expect(addButtons.nth(1)).toBeVisible();
    await addButtons.nth(1).click();

    const temperatureInput = page.getByRole('spinbutton', {
      name: 'Temperature',
    });

    await expect(temperatureInput).toBeVisible();
    await temperatureInput.fill('43');

    await page.getByRole('button', { name: 'Save and close' }).click();

    await expect(
      page.getByText('43', { exact: true })
    ).toBeVisible({ timeout: 10000 });
  });
});