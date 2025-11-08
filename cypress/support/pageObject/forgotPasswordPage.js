class ForgotPasswordPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?').click();
  }

  enterUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  clickReset() {
    cy.contains('Reset Password').click();
  }

  verifySuccessMessage() {
    cy.contains('Reset Password link sent successfully').should('be.visible');
  }
}

export default new ForgotPasswordPage;
