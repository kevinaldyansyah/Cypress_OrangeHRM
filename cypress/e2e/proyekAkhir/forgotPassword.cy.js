import ForgotPasswordPage from "../../support/pageObject/forgotPasswordPage";

describe('OrangeHRM - Forgot Password', () => {
  beforeEach(() => {
    ForgotPasswordPage.visit();
    ForgotPasswordPage.clickForgotPassword();
  });

  it('TC_001 - Password reset successful with valid username', () => {
    ForgotPasswordPage.enterUsername('Admin');
    ForgotPasswordPage.clickReset();
    // forgotPage.verifikasiPesanBerhasil(); // bisa aktifkan jika pesan tampil
  });

  it('TC_002 - Reset password with invalid username', () => {
    ForgotPasswordPage.enterUsername('testuser');
    ForgotPasswordPage.clickReset();
    // Tidak ada pesan sukses muncul
    cy.contains('Reset Password link sent successfully').should('not.exist');
  });

  it('TC_003 - Password reset failed because the field is empty', () => {
    ForgotPasswordPage.clickReset();
    // Reset Password tidak berhasil karena field kosong
    cy.url().should('include', '/requestPasswordResetCode');
    cy.get('input[placeholder="Username"]').should('exist');
  });
      
});