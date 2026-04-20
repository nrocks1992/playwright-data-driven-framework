/**
 * runner.spec.js
 *
 * Data-driven Playwright test suite for the Demo Task-Board application.
 * All test scenarios are defined in testData.json; this file contains only
 * reusable helper logic and the single describe/test loop that drives every
 * case.  Selectors live exclusively in selectors.js.
 *
 * Parallelism: Playwright's built-in worker model combined with the three-
 * project configuration in playwright.config.js causes every test to run
 * concurrently across Chromium, Firefox, and WebKit.
 */

const { test, expect } = require('@playwright/test');
const { selectors } = require('../selectors');
const testData = require('../testData.json');

// ─── Destructure shared test data ──────────────────────────────────────────
const { url, credentials, testCases } = testData;

// ─── Reusable helper: login ─────────────────────────────────────────────────
/**
 * Navigates to the app, fills in credentials, and submits the login form.
 * Waits for the post-login page to be fully interactive before resolving.
 *
 * @param {import('@playwright/test').Page} page
 */
async function login(page) {
  // Step: Open the application URL in the browser
  await page.goto(url);

  // Step: Locate the email/username input by its label and type the configured credential
  await selectors.login.emailInput(page).fill(credentials.email);
 
  // Step: Locate the password input by its label and type the configured credential
  await selectors.login.passwordInput(page).fill(credentials.password);
 
  // Step: Click the submit button to trigger authentication
  await selectors.login.submitButton(page).click();

    // Step: Assert the Logout button is visible to confirm a session was successfully established
  await expect(selectors.login.logoutButton(page)).toBeVisible();
 
}

// ─── Reusable helper: navigate to project ──────────────────────────────────
/**
 * Clicks the named project in the sidebar and waits for the board to load.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} projectName
 */
async function navigateToProject(page, projectName) {
  // Step: Click the project link in the sidebar navigation
  await page.locator(selectors.sidebar.projectLink(projectName)).click();

}

// ─── Reusable helper: assert task in column ─────────────────────────────────
/**
 * Verifies that a task card exists within the expected Kanban column.
 * Strategy: locate the column by its heading, then assert the card is a
 * descendant of that column container.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} taskName
 * @param {string} columnName
 */
async function assertTaskInColumn(page, taskName, columnName) {
  // Step: Locate the Kanban column heading that matches the expected column name
  const columnHeader = page.locator(selectors.board.columnHeader(columnName)).first();

  // Step: Traverse up to the column's parent container which wraps all its cards
  const columnContainer = columnHeader.locator('xpath=ancestor::div[contains(@class,"col") or contains(@class,"column") or contains(@class,"section")][1]');

  // Step: Assert the task card is visible inside the resolved column container
  await expect(
    columnContainer.locator(selectors.board.taskCard(taskName))
  ).toBeVisible();
}

// ─── Reusable helper: assert tags on task ───────────────────────────────────
/**
 * For every expected tag, locates the task card and asserts the tag badge is
 * visible within it.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string}   taskName
 * @param {string[]} expectedTags
 */
async function assertTaskTags(page, taskName, expectedTags) {
  // Step: Resolve the task card element that will contain all tag badges
  const taskCard = page.locator(selectors.board.taskCard(taskName)).first();

  for (const tag of expectedTags) {
    // Step: Assert each expected tag badge is visible inside the task card
    await expect(
      taskCard.locator(selectors.board.taskTag(tag))
    ).toBeVisible();
  }
}

// ─── Data-driven test loop ──────────────────────────────────────────────────
test.describe('Demo App – Kanban Board Validation', () => {

  for (const tc of testCases) {
    /**
     * Each iteration produces one independent test named with the test-case ID
     * and its human-readable description, e.g. "TC01 – Verify 'Implement…'".
     * Playwright runs all generated tests in parallel across the configured
     * browser projects (Chromium, Firefox, WebKit).
     */
    test(`${tc.id} – ${tc.description}`, async ({ page }) => {

      // ── Step 1: Login ──────────────────────────────────────────────────────
      // Step: Perform login using shared credentials from testData.json
      await login(page);

      // ── Step 2: Navigate to the target project ─────────────────────────────
      // Step: Select the project from the sidebar to load its Kanban board
      await navigateToProject(page, tc.project);

      // ── Step 3: Verify the task appears in the correct column ──────────────
      // Step: Confirm the task card is present inside the expected column
      await assertTaskInColumn(page, tc.taskName, tc.expectedColumn);

      // ── Step 4: Confirm all expected tags are present on the task card ──────
      // Step: Validate every required tag badge is visible on the task card
      await assertTaskTags(page, tc.taskName, tc.expectedTags);

    });
  }

});
