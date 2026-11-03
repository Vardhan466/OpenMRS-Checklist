import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Patient Program Management', () => {
  test('should enroll Susan Lopez in a program and edit enrollment details', async ({
    page,
  }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('Admin123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByTestId('patientSearchBar')).toBeVisible();

    const patientSearchBar = page.getByTestId('patientSearchBar');
    await patientSearchBar.fill('susan');

    const patientLink = page.getByRole('link', {
      name: 'Avatar for Susan Lopez Susan',
    });

    await expect(patientLink).toBeVisible();
    await patientLink.click();

    await page.getByRole('link', { name: 'Programs', exact: true }).click();

    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const programDropdown = page.getByLabel('program name');

    await expect(programDropdown).toBeVisible();
    await programDropdown.selectOption(
      'ac1bbc45-8c35-49ff-a574-9553ff789527'
    );

    await page.getByRole('button', { name: 'Save and close' }).click();

    const optionsButton = page.getByRole('button', { name: 'Options' }).first();

    await expect(optionsButton).toBeVisible();
    await optionsButton.click();

    await page.getByRole('menuitem', { name: 'Edit' }).click();

    const enrollmentDate = page.getByRole('spinbutton', {
      name: 'day, Date enrolled',
    });

    await expect(enrollmentDate).toBeVisible();

    await page.getByRole('button', { name: 'Save and close' }).click();

    await expect(
      page.getByRole('button', { name: 'Options' }).first()
    ).toBeVisible();
  });
});