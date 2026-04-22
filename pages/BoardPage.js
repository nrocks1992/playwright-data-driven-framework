/**
 * BoardPage.js
 *
 * Page Object Model for the Kanban Board page.
 * Encapsulates all selectors and actions related to sidebar navigation
 * and board/task verification.
 * Selectors are unchanged from the original selectors.js.
 */

class BoardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // ─── Selectors ────────────────────────────────────────────────────────────

  /**
   * Returns the locator for a named project link in the left-hand
   * navigation sidebar.
   *
   * @param {string} projectName  e.g. "Web Application"
   * @returns {import('@playwright/test').Locator}
   */
  projectLink(projectName) {
    return this.page.locator(`button:has-text("${projectName}")`);
  }

  /**
   * Returns a locator for a Kanban column heading that exactly matches
   * the supplied column name.
   *
   * @param {string} columnName  e.g. "To Do" | "In Progress" | "Done"
   * @returns {import('@playwright/test').Locator}
   */
  columnHeader(columnName) {
    return this.page.locator(`h2:has-text("${columnName}")`);
  }

  /**
   * Returns a locator for a task card whose visible text includes the
   * supplied task name.
   *
   * @param {string} taskName  e.g. "Implement user authentication"
   * @returns {import('@playwright/test').Locator}
   */
  taskCard(taskName) {
    return this.page.locator(`div.rounded-lg:has(h3:text("${taskName}"))`);
  }

  /**
   * Returns a locator for a tag/badge element scoped to a given parent locator.
   * Scoping to the parent (e.g. a specific task card) ensures the tag is only
   * matched within that element and not anywhere else on the page.
   *
   * @param {import('@playwright/test').Locator} parent  e.g. a resolved task card locator
   * @param {string} tagName  e.g. "Feature" | "High Priority" | "Bug"
   * @returns {import('@playwright/test').Locator}
   */
  taskTag(parent, tagName) {
    return parent.locator(`span.rounded-full:text("${tagName}")`);
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  /**
   * Clicks the named project in the sidebar and waits for the board to load.
   *
   * @param {string} projectName
   */
  async navigateToProject(projectName) {
    // Step: Click the project link in the sidebar navigation
    await this.projectLink(projectName).click();
  }

  // ─── Assertions ───────────────────────────────────────────────────────────

  /**
   * Verifies that a task card exists within the expected Kanban column.
   * Strategy: locate the column by its heading, then assert the card is a
   * descendant of that column container.
   *
   * @param {import('@playwright/test').expect} expect
   * @param {string} taskName
   * @param {string} columnName
   */
  async assertTaskInColumn(expect, taskName, columnName) {
    // Step: Locate the Kanban column heading that matches the expected column name
    const columnHeader = this.columnHeader(columnName).first();

    // Step: Traverse up to the column's parent container which wraps all its cards
    const columnContainer = columnHeader.locator(
      'xpath=ancestor::div[contains(@class,"col") or contains(@class,"column") or contains(@class,"section")][1]'
    );

    // Step: Assert the task card is visible inside the resolved column container
    await expect(
      columnContainer.locator(this.taskCard(taskName))
    ).toBeVisible();
  }

  /**
   * For every expected tag, asserts the tag badge is visible strictly within
   * the specific task card matched by its exact h3 text.
   * Using nth-match ensures we resolve to exactly one card element, preventing
   * false positives from identically-named tags on sibling cards in the same column.
   *
   * @param {import('@playwright/test').expect} expect
   * @param {string}   taskName
   * @param {string[]} expectedTags
   */
  async assertTaskTags(expect, taskName, expectedTags) {
    // Step: Resolve the card using an exact text filter so only the card whose
    // h3 matches taskName precisely is selected — not sibling cards in the same column
    const card = this.page
      .locator(`div.transition-shadow`)
      .filter({ has: this.page.locator(`h3`, { hasText: new RegExp(`^${taskName}$`) }) })
      .first();

    for (const tag of expectedTags) {
      // Step: Assert each tag badge is visible strictly within this card
      await expect(
        this.taskTag(card, tag)
      ).toBeVisible();
    }
  }
  /**
   * Asserts that a Kanban column heading with the given name is NOT present
   * anywhere on the board. Used when a column is expected to be entirely absent.
   *
   * @param {import('@playwright/test').expect} expect
   * @param {string} columnName  e.g. "Backlogged"
   */
  async assertColumnNotVisible(expect, columnName) {
    // Step: Assert no column heading matching the name exists on the board
    await expect(this.columnHeader(columnName)).toHaveCount(0);
  }

  /**
   * Asserts that no task card with the given name exists anywhere on the board.
   *
   * @param {import('@playwright/test').expect} expect
   * @param {string} taskName  e.g. "Social media calendar"
   */
  async assertTaskNotPresent(expect, taskName) {
    // Step: Assert that no card with the given task name is rendered on the board
    await expect(this.taskCard(taskName)).toHaveCount(0);
  }

  /**
   * Asserts that a specific tag badge does NOT appear on the given task card.
   *
   * @param {import('@playwright/test').expect} expect
   * @param {string}   taskName
   * @param {string[]} absentTags  tags that must not be present on the card
   */
  async assertTagsAbsentOnTask(expect, taskName, absentTags) {
    // Step: Resolve the specific task card by its exact h3 heading text
    const card = this.page
      .locator(`div.transition-shadow`)
      .filter({ has: this.page.locator(`h3`, { hasText: new RegExp(`^${taskName}$`) }) })
      .first();

    for (const tag of absentTags) {
      // Step: Assert each absent tag badge is not visible within this card
      await expect(this.taskTag(card, tag)).toHaveCount(0);
    }
  }

  /**
   * Asserts that the given task card does NOT appear inside the specified column.
   * The task may exist elsewhere on the board — only its presence in this
   * particular column is disallowed.
   *
   * @param {import('@playwright/test').expect} expect
   * @param {string} taskName
   * @param {string} columnName
   */
  async assertTaskNotInColumn(expect, taskName, columnName) {
    // Step: Locate the Kanban column heading that matches the column name
    const columnHeader = this.columnHeader(columnName).first();

    // Step: Traverse up to the column's parent container
    const columnContainer = columnHeader.locator(
      'xpath=ancestor::div[contains(@class,"col") or contains(@class,"column") or contains(@class,"section")][1]'
    );

    // Step: Assert the task card is NOT present inside this column container
    await expect(
      columnContainer.locator(this.taskCard(taskName))
    ).toHaveCount(0);
  }
}
module.exports = { BoardPage };
