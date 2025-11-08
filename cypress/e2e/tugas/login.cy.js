import LoginPage from '../../support/pageObject/loginPage';
import data from "../../fixtures/loginData.json";

describe("Login Feature - OrangeHRM", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('TC_001 - Login with correct username and password', () => {
    cy.intercept("POST", "**/auth/*").as("loginReq");
    LoginPage.enterUsername(data.validUsername);
    LoginPage.enterPassword(data.validPassword);
    LoginPage.clickLogin();
    cy.wait("@loginReq").then((interception) => {
      expect([200, 302]).to.include(interception.response.statusCode);
    });
    LoginPage.assertDashboard();
  });

  it("TC_002 - Login with correct username and password using the Enter key", () => {
    cy.intercept("POST", "**/auth/*").as("loginReq");
    LoginPage.enterUsername(data.validUsername);
    LoginPage.enterPassword(`${data.validPassword}{enter}`);
    cy.wait("@loginReq")
      .its("response.statusCode")
      .should("be.oneOf", [200, 302]);
    LoginPage.assertDashboard();
  });

  it('TC_003 - Cannot login with incorrect username', () => {
    LoginPage.enterUsername(data.invalidUsername);
    LoginPage.enterPassword(data.validPassword);
    LoginPage.clickLogin();
    LoginPage.assertInvalidCredentials();
  });

  it('TC_004 - Cannot login with incorrect password', () => {
    LoginPage.enterUsername(data.validUsername);
    LoginPage.enterPassword(data.invalidPassword);
    LoginPage.clickLogin();
    LoginPage.assertInvalidCredentials();
  });

  it('TC_005 - Cannot login with only username filled', () => {
    LoginPage.enterUsername(data.validUsername);
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });

  it('TC_006 - Cannot login with only password filled', () => {
    LoginPage.enterPassword(data.validPassword);
    LoginPage.clickLogin();
    cy.wait(500);
    LoginPage.assertRequiredField();
  });

  it('TC_007 - Cannot login with empty username and password', () => {
    LoginPage.clickLogin();
    LoginPage.assertRequiredField();
  });
});