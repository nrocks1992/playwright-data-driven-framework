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
    //return this.page.locator(`h2:has-text("${columnName}"), h3:has-text("${columnName}")`);
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
   * Returns a locator for a tag/badge element inside a task card.
   * Matches any element that carries a tag-like class and contains the
   * supplied label text.
   *
   * @param {string} tagName  e.g. "Feature" | "High Priority" | "Bug"
   * @returns {import('@playwright/test').Locator}
   */
  taskTag(tagName) {
    return this.page.locator(`span.rounded-full:text("${tagName}")`);
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
   * For every expected tag, locates the task card and asserts the tag badge is
   * visible within it.
   *
   * @param {import('@playwright/test').expect} expect
   * @param {string}   taskName
   * @param {string[]} expectedTags
   */
  async assertTaskTags(expect, taskName, expectedTags) {
    // Step: Resolve the task card element that will contain all tag badges
    const card = this.taskCard(taskName).first();

    for (const tag of expectedTags) {
      // Step: Assert each expected tag badge is visible inside the task card
      await expect(
        card.locator(this.taskTag(tag))
      ).toBeVisible();
    }
  }
}

module.exports = { BoardPage };
