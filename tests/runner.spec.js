/**
 * runner.spec.js
 *
 * Data-driven Playwright test suite for the Demo Task-Board application.
 * All test scenarios are defined in testData.json; this file contains only
 * the page object instantiation and the single describe/test loop that drives
 * every case.
 *
 * Page Objects:
 *  - LoginPage  → pages/LoginPage.js   (login form selectors & actions)
 *  - BoardPage  → pages/BoardPage.js   (sidebar, kanban, tag selectors & assertions)
 *
 * Parallelism: Playwright's built-in worker model combined with the three-
 * project configuration in playwright.config.js causes every test to run
 * concurrently across Chromium, Firefox, and WebKit.
 */

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { BoardPage } = require('../pages/BoardPage');
const testData = require('../testData.json');

// ─── Destructure shared test data ──────────────────────────────────────────
const { url, credentials, testCases } = testData;

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
      const loginPage = new LoginPage(page);
      const boardPage = new BoardPage(page);

      // ── Step 1: Login ──────────────────────────────────────────────────────
      // Step: Open the application URL in the browser
      await loginPage.goto(url);

      // Step: Perform login using the credentials from testData.json
      await loginPage.login(tc.email, tc.password);

      // ── Step 2: Assert login outcome ───────────────────────────────────────
      // TC00 uses invalid credentials and no project — detect by absence of project
      if (!tc.project) {
        // Step: Invalid login — assert the error message is visible
        await loginPage.assertInvalidLogin(expect);
        return;
      }

      // Step: Valid login — assert the Logout button is visible
      await loginPage.assertLoggedIn(expect);


      // ── Step 2: Navigate to the target project ─────────────────────────────
      // Step: Select the project from the sidebar to load its Kanban board
      await boardPage.navigateToProject(tc.project);

      // ── Step 3: Column-absence check (TC10) ────────────────────────────────
      // Step: If checkColumnAbsent is set, verify the column does not exist
      if (tc.checkColumnAbsent) {
        await boardPage.assertColumnNotVisible(expect, tc.checkColumnAbsent);
        return;
      }

      // ── Step 3: Task-absence check (TC11) ──────────────────────────────────
      // Step: If absentTask is set, verify the task card is not on the board
      if (tc.absentTask) {
        await boardPage.assertTaskNotPresent(expect, tc.absentTask);
        return;
      }

      // ── Step 3: Task-not-in-column check (TC13) ────────────────────────────
      // Step: If notInColumn is set, verify the task does not appear in that column
      if (tc.notInColumn) {
        await boardPage.assertTaskNotInColumn(expect, tc.taskName, tc.notInColumn);
        return;
      }

      // ── Step 3: Verify the task appears in the correct column ──────────────
      // Step: Confirm the task card is present inside the expected column
      await boardPage.assertTaskInColumn(expect, tc.taskName, tc.expectedColumn);

      // ── Step 4: Confirm all expected tags are present on the task card ──────
      // Step: Validate every required tag badge is visible on the task card
      await boardPage.assertTaskTags(expect, tc.taskName, tc.expectedTags);

      // ── Step 5: Confirm absent tags are not on the task card (TC12) ─────────
      // Step: If absentTags is set, verify those tags do not appear on the card
      if (tc.absentTags && tc.absentTags.length > 0) {
        await boardPage.assertTagsAbsentOnTask(expect, tc.taskName, tc.absentTags);
      }
    });
  }

});
