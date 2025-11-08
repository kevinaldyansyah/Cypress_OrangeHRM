import DashboardPage from "../../support/pageObject/dashboardPage";

describe('Dashboard Feature - OrangeHRM', () => {

    beforeEach(() => {
        DashboardPage.visit();
        DashboardPage.enterUsername('Admin');
        DashboardPage.enterPassword('admin123');    
        DashboardPage.clickLogin();
        DashboardPage.assertLoginSuccess();
        cy.wait (1000)
    });

    it ('TC_001 - Visit Directory Page', () => {
        DashboardPage.interceptDirectory();
        DashboardPage.visitDirectory();
        DashboardPage.waitForDirectory();
        DashboardPage.assertDirectoryPage();
    })

    it ('TC_002 - Search employee by name', () => {
        DashboardPage.interceptDirectory();
        DashboardPage.visitDirectory();
        DashboardPage.waitForDirectory();
        DashboardPage.clickSearch();
        DashboardPage.waitForDirectory();
        DashboardPage.employeeNameInput('Mark Lee');
        DashboardPage.assertEmployeeFound('Mark Lee');
    });

    it('TC_003 - Filter employee by Job Title', () => {
        DashboardPage.interceptDirectory();
        DashboardPage.visitDirectory();
        DashboardPage.waitForDirectory();
        DashboardPage.filterByJobTitle('HR Manager');
        DashboardPage.clickSearch();
        DashboardPage.waitForDirectory();
        DashboardPage.assertEmployeeFoundByJob('HR Manager');
        DashboardPage.assertcardFoundByJob('HR Manager')
    })

    it('TC_004 - Filter employee by Location', () => {
        DashboardPage.interceptDirectory();
        DashboardPage.visitDirectory();
        DashboardPage.waitForDirectory();
        DashboardPage.filterByLocation('Texas R&D');
        DashboardPage.clickSearch();
        DashboardPage.waitForDirectory();
        DashboardPage.assertEmployeeFoundByLocation('Texas R&D');
        DashboardPage.assertcardFoundByLocation('Texas R&D');
    });
})