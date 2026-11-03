import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Appointment Management', () => {
  test('should schedule an appointment for Susan Lopez', async ({ page }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('Admin123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.getByTestId('searchPatientIcon').click();

    const patientSearch = page.getByTestId('patientSearchBar');
    await expect(patientSearch).toBeVisible();
    await patientSearch.fill('susan lopez');

    const patientLink = page.getByRole('link', {
      name: 'Avatar for Susan Lopez Susan',
    });

    await expect(patientLink).toBeVisible();
    await patientLink.click();

    await page.getByRole('link', { name: 'Appointments' }).click();
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const serviceSelect = page.getByLabel('Select a service');
    await expect(serviceSelect).toBeVisible();

    await serviceSelect.selectOption({
      label: 'General Medicine service',
    });

    const appointmentDay = page
      .getByTestId('datePickerInput')
      .getByRole('spinbutton', { name: 'day, Date' });

    await expect(appointmentDay).toBeVisible();
    await appointmentDay.click();

    await page.getByRole('button', { name: 'Save and close' }).click();

    const duration = page.getByRole('spinbutton', {
      name: 'Duration (minutes)',
    });

    await expect(duration).toBeVisible();
    await duration.fill('15');

    await page.getByRole('button', { name: 'Save and close' }).click();

    await page.getByRole('link', { name: 'OpenMRS Logo' }).click();
  });
});