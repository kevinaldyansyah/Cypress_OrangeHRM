class DashboardPage {
  usernameInput   = 'input[name="username"]';
  passwordInput   = 'input[name="password"]';
  loginButton     = 'button[type="submit"]';
  directoryMenu   = 'a[href="/web/index.php/directory/viewDirectory"]';
  searchButton    = 'button[type="submit"]';

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  // Login - Input username
  enterUsername(username) {
    cy.get(this.usernameInput).type(username);
  }

  // Login - Input password
  enterPassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  // Klik tombol login
  clickLogin() {  
    cy.get(this.loginButton).click();
  }

  // Navigasi ke menu Directory
  visitDirectory() {
    cy.get(this.directoryMenu).click();
  }

  // Input nama employee di kolom pencarian
  employeeNameInput() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  // Klik tombol Search
  clickSearch() {
    cy.get(this.searchButton).click();
  }

  // Dropdown filter berdasarkan Job Title
  jobTitleDropdown() {
    return cy.get('.oxd-select-text-input').eq(0);
  }

  filterByJobTitle(title) {
    this.jobTitleDropdown().click();
    cy.get('.oxd-select-dropdown')
      .should('be.visible')
      .within(() => {
        cy.wait(500);
        cy.contains('.oxd-select-option', title).click();
      });
    }

  // Dropdown filter berdasarkan Lokasi
  locationDropdown() {
    return cy.get('.oxd-select-text-input').eq(1); 
  }

  filterByLocation(location) {
    this.locationDropdown().click();
    cy.get('.oxd-select-dropdown')
      .should('be.visible')
      .within(() => {
        cy.wait(500);
        cy.contains('.oxd-select-option', location).click();
    });
  }

  // Validasi login berhasil
  assertLoginSuccess() {  
    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain', 'Dashboard');
  }

  // Validasi menu Directory tersedia
  assertDirectoryMenu() {
    cy.url().should('include', '/dashboard');
    cy.get(this.directoryMenu).should('be.visible');
  }

  // Validasi berhasil masuk ke halaman Directory
  assertDirectoryPage() {
    cy.url().should('include', '/directory');
    cy.get('h6').should('contain', 'Directory');
  }

  // Validasi employee ditemukan berdasarkan nama
  assertEmployeeFound(name) {
    cy.get('input[placeholder="Type for hints..."]').type(name);
  }

  // Validasi employee ditemukan berdasarkan Job Title
  assertEmployeeFoundByJob(title) {
    cy.get('.oxd-select-text-input')
      .eq(0)
      .should('contain.text', title);
  }

  assertcardFoundByJob(title) {
    cy.get('.oxd-grid-item .oxd-text.oxd-text--p')
      .should('contain.text', title);
  }

  // Validasi employee ditemukan berdasarkan Location
  assertEmployeeFoundByLocation(location) {
    cy.get('.oxd-select-text-input')
      .eq(1)
      .should('contain.text', location);
  }

  assertcardFoundByLocation(location) {
    cy.get('.orangehrm-directory-card-body') 
      .should('contain.text', location);
  }

    
  interceptDirectory() {
    cy.intercept('GET','**/web/index.php/api/v2/directory/employees*').as('getDirectory');
  }

  waitForDirectory() {
    cy.wait('@getDirectory');   
  }
}

export default new DashboardPage();