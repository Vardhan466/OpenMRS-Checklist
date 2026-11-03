import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Allergy and Medication Management', () => {
  test('should record an allergy and prescribe aspirin for Susan Lopez', async ({ page }) => {
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

    // Record allergy
    await page.getByRole('link', { name: 'Allergies' }).click();
    await page.getByRole('button', { name: 'Record allergy intolerances' }).click();

    const allergen = page.getByRole('combobox', { name: 'Allergen' });
    await expect(allergen).toBeVisible();
    await allergen.fill('asp');

    await page.getByText('Aspirin', { exact: true }).click();
    await page.getByText('Hepatotoxicity', { exact: true }).click();

    await page
      .locator('div:nth-child(3) > .cds--radio-button__label > .cds--radio-button__appearance')
      .click();

    await page.getByRole('button', { name: 'Save and close' }).click();

    await page.getByRole('link', { name: 'Medications' }).click();
    await page.getByRole('button', { name: 'Record active medications' }).click();

    const drugSearch = page.getByRole('searchbox', {
      name: 'Search for a drug or orderset',
    });

    await expect(drugSearch).toBeVisible();
    await drugSearch.fill('aspirin');

    await page.getByRole('button', { name: 'Add to basket' }).first().click();
    await page.getByRole('button', { name: 'Order basket' }).click();

    const aspirinOrder = page
      .getByRole('listitem')
      .filter({ hasText: 'IncompleteAspirin 162.5mg —' });

    await expect(aspirinOrder).toBeVisible();
    await aspirinOrder.click();

    const dose = page.getByRole('spinbutton', { name: 'Dose' });
    await dose.fill('12');

    await page.getByRole('button', { name: 'Save order' }).click();

    await page.getByRole('combobox', { name: 'Route' }).selectOption({
      label: 'Oral',
    });

    await page.getByRole('combobox', { name: 'Frequency' }).selectOption({
      label: 'Once daily',
    });

    const quantity = page.getByRole('spinbutton', {
      name: 'Quantity to dispense',
    });
    await quantity.fill('12');

    const incrementDispensing = page
      .locator('section')
      .filter({ hasText: 'Dispensing' })
      .getByLabel('Increment number');

    for (let i = 0; i < 6; i++) {
      await incrementDispensing.click();
    }

    await page.getByRole('textbox', { name: 'Indication' }).fill('12');

    await page.getByRole('button', { name: 'Save order' }).click();
    await page.getByRole('button', { name: 'Sign and close' }).click();
  });
}); 