import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Visit Management', () => {
  test('should edit visit billing details for Susan Lopez', async ({ page }) => {
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

    await page.getByRole('link', { name: 'Visits' }).click();

    const previousVisit = page
      .getByRole('row', { name: 'Expand current row 21-Mar-' });

    await expect(previousVisit).toBeVisible();
    await previousVisit.getByLabel('Edit').click();

    await page
      .locator(
        '.cds--form-item.-esm-billing__visit-attributes-form__radioButtonGroup___G-fW6 > .cds--radio-button-group > div > .cds--radio-button__label > .cds--radio-button__appearance',
      )
      .first()
      .click();

    await page.getByRole('combobox', { name: 'Payment method' }).click();
    await page.getByText('Cash', { exact: true }).click();

    await page.getByRole('combobox', { name: 'Billable service' }).click();

    await page.getByLabel('Punctuality (optional)').selectOption(
      '66cdc0a1-aa19-4676-af51-80f66d78d9eb',
    );

    await page.getByRole('button', { name: 'Update visit' }).click();

    const updateButton = page.getByRole('button', { name: 'Update visit' });
    if (await updateButton.isVisible()) {
      await updateButton.click();
    }

    await page.getByRole('button', { name: 'Close', exact: true }).click();

    const discardButton = page.getByRole('button', {
      name: 'danger Discard changes',
    });

    if (await discardButton.isVisible()) {
      await discardButton.click();
    }

    const todayVisit = page.getByRole('row', {
      name: 'Expand current row Today, 08:',
    });

    await expect(todayVisit).toBeVisible();
    await todayVisit.getByLabel('Edit').click();

    await page.getByRole('tab', { name: 'Ended' }).click();

    const finalUpdateButton = page.getByRole('button', {
      name: 'Update visit',
    });

    if (await finalUpdateButton.isVisible()) {
      await finalUpdateButton.click();
    }
  });
});