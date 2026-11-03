import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Immunization Management', () => {
  test('should record a new BCG immunization', async ({ page }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('Admin123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(
      page.getByRole('link', { name: 'Immunizations' })
    ).toBeVisible();

    await page.getByRole('link', { name: 'Immunizations' }).click();

    const closeButton = page.getByRole('button', {
      name: 'Close',
      exact: true,
    });

    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    const addImmunizationButton = page.getByTestId(
      'add-immunizations-button'
    );

    await expect(addImmunizationButton).toBeVisible();
    await addImmunizationButton.click();

    const vaccinationDate = page.getByRole('spinbutton', {
      name: 'day, Vaccination date',
    });

    await expect(vaccinationDate).toBeVisible();
    await vaccinationDate.fill('15');

    await page.getByRole('combobox', { name: 'Immunization' }).click();

    const bcgOption = page
      .locator('#immunization')
      .getByText('Bacillus Calmette–Guérin', { exact: true });

    await expect(bcgOption).toBeVisible();
    await bcgOption.click();

    const doseNumber = page.getByRole('spinbutton', {
      name: 'Dose number within series',
    });

    await doseNumber.fill('6');

    await page.getByRole('button', { name: 'Save', exact: true }).click();

    await expect(addImmunizationButton).toBeVisible();
  });
});