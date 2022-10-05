Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  
  describe('login', () => {
    it('login success ', () => {
      cy.login('mabasa@gmail.com', '111111');
    });
  
    it('login  fail', () => {
      cy.login('mabasa@gmail.com', 'Ma13w33');
    });
  
    it('validation', () => {
      cy.login('.', '.');
    });
  
   
  });