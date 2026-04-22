/**
 * LoginPage.js
 *
 * Page Object Model for the Login page.
 * Encapsulates all selectors and actions related to authentication.
 */

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ─── Selectors ────────────────────────────────────────────────────────────
    // Username input — matched by its visible label text.
    this.emailInput = page.getByLabel('Username');

    // Password input — matched by its visible label text.
    this.passwordInput = page.getByLabel('Password');

    // Sign-in submit button — matched by its accessible role + name.
    this.submitButton = page.getByRole('button', { name: 'Sign in' });

    // Logout button — asserted after login to confirm a session was established.
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  /**
   * Navigates to the application URL.
   *
   * @param {string} url
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Fills in credentials and submits the login form.
   * Waits for the post-login page to be fully interactive before resolving.
   *
   * @param {string} email
   * @param {string} password
   * @param {import('@playwright/test').expect} expect
   */
  async login(email, password, expect) {
    // Step: Locate the email/username input by its label and type the configured credential
    await this.emailInput.fill(email);

    // Step: Locate the password input by its label and type the configured credential
    await this.passwordInput.fill(password);

    // Step: Click the submit button to trigger authentication
    await this.submitButton.click();

    // Step: Wait for the Logout button to be visible to confirm a session was successfully established
    await expect(this.logoutButton).toBeVisible();
  }

}

module.exports = { LoginPage };
