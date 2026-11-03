import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Patient Laboratory Orders Management', () => {
  test('should create and cancel a Complete Blood Count order for Susan Lopez', async ({
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
    await patientSearchBar.fill('susan');

    const patientLink = page.getByRole('link', {
      name: 'Avatar for Susan Lopez Susan',
    });

    await expect(patientLink).toBeVisible();
    await patientLink.click();

    await page.getByRole('link', { name: 'Orders', exact: true }).click();

    await page.getByRole('button', { name: 'Record orders' }).click();

    const addButtons = page.getByRole('button', {
      name: 'Add',
      exact: true,
    });

    await expect(addButtons.nth(1)).toBeVisible();
    await addButtons.nth(1).click();

    const testSearch = page.getByRole('searchbox', {
      name: 'Search for a test type',
    });

    await expect(testSearch).toBeVisible();
    await testSearch.fill('complete blood count');

    await page.getByRole('button', { name: 'Add to basket' }).click();

    const orderItem = page.getByRole('listitem').filter({
      hasText: 'Complete blood',
    });

    await expect(orderItem).toBeVisible();

    await page.getByRole('button', { name: 'Save order' }).click();

    await page.getByRole('button', { name: 'Sign and close' }).click();

    await expect(
      page.getByRole('link', { name: 'Orders', exact: true })
    ).toBeVisible();

    await page.getByRole('link', { name: 'Orders', exact: true }).click();

    await page.getByRole('button', { name: 'Options' }).click();

    await page.getByRole('menuitem', { name: 'Cancel order' }).click();

    await page.getByRole('button', { name: 'Sign and close' }).click();

    await expect(
      page.getByRole('button', { name: 'Sign and close' })
    ).not.toBeVisible();
  });
});