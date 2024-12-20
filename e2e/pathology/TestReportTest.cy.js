import PathologyLocators from "../../pageobject/pathologypage/PathologyLocators";
import PathologyFunctions from "../../pageobject/pathologypage/PathologyFunctions";
import GlobalFunction from "../../pageobject/globalpage/GlobalFunction";
import BillsLocators from "../../pageobject/billspage/BillsLocators";
import BillsFunctions from "../../pageobject/billspage/BillsFunctions";



describe('Test Report',()=>{

    const globalFunction = new GlobalFunction();
    const pathologyLocators = new PathologyLocators();
    const pathologyFunctions = new PathologyFunctions();

    beforeEach(() => {
        cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'));
        cy.visit(Cypress.config('baseUrl'));
        globalFunction.Adminuser();
        pathologyLocators.sidebarPathology().sidebarTestReports({ multiple: true });

    });

    it.only('Check test report functionality',()=>{
        pathologyLocators.manageTestReport();
        pathologyLocators.testReportDepartmentDropdown();
        pathologyLocators.testReportCheckedByDropdown();
        pathologyFunctions.testReportVerifyApproveButton();

    });

    it('Check duplicat number of reports should not found',()=>{
        pathologyFunctions.checkthatDuplicatesNumberOfReports();
    });

    it('check duplicate status should not found',()=>{
     pathologyFunctions.checkthatDuplicateStatus() ;
    })


})