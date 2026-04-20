/**
 * selectors.js
 * Centralised repository for all page element selectors.
 * Keeping selectors here decouples them from test logic so that a single
 * update here propagates to every test that references the selector.
 */

const selectors = {
  // ─── Login Page ────────────────────────────────────────────────────────────
  login: {
    /**
     * Username input — matched by its visible label text.
     * @param {import('@playwright/test').Page} page
     * @returns {import('@playwright/test').Locator}
     */
    emailInput: (page) => page.getByLabel('Username'),
 
    /**
     * Password input — matched by its visible label text.
     * @param {import('@playwright/test').Page} page
     * @returns {import('@playwright/test').Locator}
     */
    passwordInput: (page) => page.getByLabel('Password'),
 
    /**
     * Sign-in submit button — matched by its accessible role + name.
     * @param {import('@playwright/test').Page} page
     * @returns {import('@playwright/test').Locator}
     */
    submitButton: (page) => page.getByRole('button', { name: 'Sign in' }),
    
    /**
     * Logout button — asserted after login to confirm a session was established.
     * @param {import('@playwright/test').Page} page
     * @returns {import('@playwright/test').Locator}
     */
    logoutButton: (page) => page.getByRole('button', { name: 'Logout' }),
  },

  // ─── Sidebar / Navigation ──────────────────────────────────────────────────
  sidebar: {
    /**
     * Returns the locator string for a named project link in the left-hand
     * navigation sidebar.
     * @param {string} projectName  e.g. "Web Application"
     */
    projectLink: (projectName) => `button:has-text("${projectName}")`,
  },

  // ─── Kanban Board ──────────────────────────────────────────────────────────
  board: {
    /**
     * Returns a selector for a Kanban column heading that exactly matches
     * the supplied column name.
     * @param {string} columnName  e.g. "To Do" | "In Progress" | "Done"
     */
    columnHeader: (columnName) =>
      `h2:has-text("${columnName}"), h3:has-text("${columnName}")`,

    /**
     * Returns a selector for a task card whose visible text includes the
     * supplied task name.
     * @param {string} taskName  e.g. "Implement user authentication"
     */
    taskCard: (taskName) => `div.rounded-lg:has(h3:text("${taskName}"))`,

    /**
     * Returns a selector for a tag/badge element inside a task card.
     * Matches any element that carries a tag-like class and contains the
     * supplied label text.
     * @param {string} tagLabel  e.g. "Feature" | "High Priority" | "Bug"
     */
    taskTag: (tagName) => `span.rounded-full:text("${tagName}")`,
  },
};

module.exports = { selectors };
