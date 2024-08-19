import DepartmentFunction from "../../pageobject/departmentpage/DepartmentFunction";
import DepartmentLocators from "../../pageobject/departmentpage/DepartmentLocators";
import GlobalFunction from "../../pageobject/global/GlobalFunction";

describe('Duplicate department name should not exist', () => {

    const df = new DepartmentFunction();
    const dl = new DepartmentLocators();
    const gf = new GlobalFunction();

    beforeEach(() => {
        cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
        cy.visit(Cypress.config('baseUrl'));
        gf.Adminuser();
        dl.sidebarDepartment();
    });

    it('Duplicate data should not exist', () => {
        df.nameofdepartmentDataduplicate();
    });

})
