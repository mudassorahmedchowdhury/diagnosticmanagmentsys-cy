import LoginLocators from "../loginpage/LoginLocators";

class GlobalFunction{

    constructor(){
        this.lp = new LoginLocators();
    }
    clickParentContent(contentName) {
        cy.xpath('//div[@class="h-full px-3 pb-4 overflow-y-auto bg-white"][1]//ul[1]//li') // Locate the sidebar and all 'li' elements within it then iterate through each 'li' element
            .should('exist')
            .should('be.visible')
            .then($listItems => {
                cy.log(`Found ${$listItems.length} items in the sidebar.`);
                cy.wrap($listItems).each($li => {
                    cy.wrap($li).invoke('text').then(text => {
                        cy.log(`Item text: ${text.trim()}`);
                        if (text.trim() === contentName) {
                            cy.wrap($li).click();
                            cy.log(`Clicked on the item with content: ${contentName}`);
                            return false;
                        }
                    });
                });
            });
    }

    Adminuser(){
         this.lp.setEmail('demo@dms.com');
         this.lp.setPassword("password");
         this.lp.Loginbutton();
         return this;
    }

}
export default GlobalFunction;