import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Patient Deceased Workflow', () => {
  test('should search for a patient and mark them as deceased', async ({ page }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('admin');

    await page.getByRole('button', { name: 'Continue' }).click();

    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('Admin123');

    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByTestId('searchPatientIcon')).toBeVisible();

    await page.getByTestId('searchPatientIcon').click();

    const searchBar = page.getByTestId('patientSearchBar');
    await searchBar.fill('helen robert');

    await page.getByRole('button', { name: 'Search', exact: true }).click();

    const patientLink = page.getByRole('link', {
      name: 'Avatar for Helen Roberts',
    });

    await expect(patientLink).toBeVisible();
    await patientLink.click();

    await page.getByRole('button', { name: 'Actions' }).click();

    await page.getByRole('menuitem', {
      name: 'Mark patient deceased',
    }).click();

    const causeOfDeath = page.locator('label').filter({
      hasText: 'Traumatic injury',
    });

    await expect(causeOfDeath).toBeVisible();
    await causeOfDeath.click();

    const saveButton = page.getByRole('button', {
      name: 'Save and close',
    });

    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    await expect(
      page.getByText(/deceased/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});