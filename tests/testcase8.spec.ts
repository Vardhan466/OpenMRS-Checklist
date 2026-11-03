import { test, expect } from '@playwright/test';

test.describe('OpenMRS - Laboratory Order and Results Management', () => {
  test('should create a CBC order, process the lab request, and enter test results', async ({
    page,
  }) => {
    await page.goto('https://test3.openmrs.org/openmrs/spa/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'Password' }).fill('Admin123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByTestId('searchPatientIcon')).toBeVisible();

    await page.getByTestId('searchPatientIcon').click();

    const searchBar = page.getByTestId('patientSearchBar');
    await expect(searchBar).toBeVisible();
    await searchBar.fill('susan');

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

    await testSearch.fill('complete blood count');

    await page.getByRole('button', { name: 'Add to basket' }).click();

    const orderItem = page.getByRole('listitem').filter({
      hasText: 'Complete blood',
    });

    await expect(orderItem).toBeVisible();

    await page.getByRole('button', { name: 'Save order' }).click();
    await page.getByRole('button', { name: 'Sign and close' }).click();

    await page.getByRole('link', { name: 'OpenMRS Logo' }).click();
    await page.getByRole('link', { name: 'Laboratory' }).click();

    await page.getByRole('button', { name: 'Expand current row' }).click();

    await page.getByRole('button', { name: 'Pick lab request' }).click();
    await page.getByRole('button', { name: 'Pick up lab request' }).click();

    await page.getByRole('tab', { name: 'In progress' }).click();

    await page.getByRole('button', { name: 'Expand current row' }).click();
    await page.getByRole('button', { name: 'Add lab results' }).click();

    const hematocritInput = page.getByRole('spinbutton', {
      name: 'Hematocrit (0 - 100 %)',
    });

    await expect(hematocritInput).toBeVisible();
    await hematocritInput.fill('98');

    const neutrophilsInput = page.getByRole('spinbutton', {
      name: 'Neutrophils (%) - microscopic',
    });

    await expect(neutrophilsInput).toBeVisible();
    await neutrophilsInput.fill('65');

    await page.getByRole('button', { name: 'Save and close' }).click();

    const completedTab = page.getByRole('tab', {
      name: 'Completed',
    });

    await completedTab.click();
    await expect(completedTab).toHaveAttribute('aria-selected', 'true');

    const declinedTestsTab = page.getByRole('tab', {
      name: 'Declined tests',
    });

    await declinedTestsTab.click();
    await expect(declinedTestsTab).toHaveAttribute('aria-selected', 'true');

    await page.getByRole('link', { name: 'OpenMRS Logo' }).click();
  });
});