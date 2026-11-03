import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Patient Conditions Management', () => {
  test('should add Malaria as a condition for Susan Lopez', async ({ page }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    await usernameInput.fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await passwordInput.fill('Admin123');
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

    await page.getByRole('link', { name: 'Conditions', exact: true }).click();

    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const conditionSearch = page.getByRole('searchbox', {
      name: 'Enter condition',
    });

    await expect(conditionSearch).toBeVisible();
    await conditionSearch.fill('malaria');

    const malariaOption = page.getByRole('menuitem', {
      name: 'Malaria',
      exact: true,
    });

    await expect(malariaOption).toBeVisible();
    await malariaOption.click();

    const onsetDate = page.getByRole('spinbutton', {
      name: 'day, Onset date',
    });

    await expect(onsetDate).toBeVisible();

    const statusOption = page.locator('.cds--radio-button__appearance').first();
    await statusOption.click();

    await page.getByRole('button', { name: 'Save & close' }).click();

    await expect(
      page.getByText('Malaria', { exact: true }).first()
    ).toBeVisible();

    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(conditionSearch).toBeVisible();
  });
});