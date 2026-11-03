import { test, expect } from '@playwright/test';

test.describe('OpenMRS Patient Management - Record Vital Signs', () => {
  test('should record temperature and blood pressure for a patient', async ({
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

    const patientResult = page.getByRole('link', {
      name: /Susan Lopez/,
    });

    await expect(patientResult).toBeVisible();
    await patientResult.click();

    const addButtons = page.getByRole('button', { name: 'Add', exact: true });
    await expect(addButtons.nth(1)).toBeVisible();
    await addButtons.nth(1).click();

    const temperatureInput = page.getByRole('spinbutton', {
      name: 'Temperature',
    });

    await expect(temperatureInput).toBeVisible();
    await temperatureInput.fill('41');

    const systolicInput = page.getByRole('spinbutton', {
      name: 'systolic',
    });

    const diastolicInput = page.getByRole('spinbutton', {
      name: 'diastolic',
    });

    await systolicInput.fill('120');
    await diastolicInput.fill('80');

    await page.getByRole('button', { name: 'Save and close' }).click();

    await expect(
      page.getByRole('button', { name: 'Save and close' })
    ).not.toBeVisible();
  });
});