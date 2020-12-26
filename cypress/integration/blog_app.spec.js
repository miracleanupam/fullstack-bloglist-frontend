describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Ramesh',
      username: 'ramesh',
      password: 'shrestha'
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Blogs');
  });

  it('login page is opened by default', () => {
    cy.get('#log-in-expand').click();
    cy.contains('Login');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login Attemp', function() {
    it('fails with wrong creds', function() {
      cy.get('#log-in-expand').click();
      cy.get('#login-username').type('romesh');
      cy.get('#login-password').type('shrestha');
      cy.get('#login-submit').click();

      cy.contains('Could not login');
    });

    it('succeeds with right creds', function() {
      cy.get('#log-in-expand').click();
      cy.get('#login-username').type('ramesh');
      cy.get('#login-password').type('shrestha');
      cy.get('#login-submit').click();

      cy.contains('Loggin in as Ramesh');
    });
  });
});
