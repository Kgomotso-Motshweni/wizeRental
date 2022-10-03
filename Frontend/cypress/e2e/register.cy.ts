Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  
  describe('register', () => {
    it('register success ', () => {
      cy.register('Landlord','Excellent','Mabasa','mabasa@gmail.com','079-122-3456' ,'111111', '111111');
    });
  
    it('register  fail', () => {
      cy.register('Landlord','Excellent','Mabasa','mabasa@gmail.com','079-122-3456' ,'111111', '111111');
    });
  
    it('validation', () => {
      cy.register('.','.', '.','.', '.','.', '.');
    });
  
   
  });