import { test, expect } from '@playwright/test';

// Slice 1 smoke test: ensures app boots and static temperature card renders.
// Keep assertions minimal to avoid brittleness.

test('smoke: root renders static temperature card', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('[data-test="current-temperature-card"]');
  await expect(card).toBeVisible();
  await expect(card).toContainText('22°C');
  await expect(card).toContainText(/Mock Data/i);
});
