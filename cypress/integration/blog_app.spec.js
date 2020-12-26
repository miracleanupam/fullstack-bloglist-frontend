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

  describe('Login Attempt', function() {
    it('fails with wrong creds', function() {
      cy.get('#log-in-expand').click();
      cy.get('#login-username').type('romesh');
      cy.get('#login-password').type('shrestha');
      cy.get('#login-submit').click();

      cy.contains('Could not login');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });

    it('succeeds with right creds', function() {
      cy.get('#log-in-expand').click();
      cy.get('#login-username').type('ramesh');
      cy.get('#login-password').type('shrestha');
      cy.get('#login-submit').click();

      cy.contains('Loggin in as Ramesh');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'ramesh', password: 'shrestha'
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function() {
      cy.get('#blog-add').click();
      cy.get('#title').type('Cypress Test');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('www.cypress.org');
      cy.get('#blog-submit').click();

      cy.contains('New Blog Added Successfully');
      cy.get('#blog-list').contains('Cypress Test Cypress');
    });

    it('User can like a blog', function() {
      cy.get('#blog-add').click();
      cy.get('#title').type('Cypress Test');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('www.cypress.org');
      cy.get('#blog-submit').click();
      
      cy.contains('New Blog Added Successfully');
      cy.get('.blog-expand-toggle').click();
      cy.get('.blog-like').click();
      cy.contains(1);
      cy.get('.blog-like').click();
      cy.contains(2);
    });

    it('User who created the blog can delete it', function() {
      cy.get('#blog-add').click();
      cy.get('#title').type('Cypress Test');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('www.cypress.org');
      cy.get('#blog-submit').click();

      cy.contains('New Blog Added Successfully');
      cy.get('.blog-expand-toggle').click();
      cy.get('.blog-delete').click();
      cy.contains('Deleted successfully');
      cy.get('#blog-list').should('not.contain', 'Cypress Test Cypress');
    });

    it('Blogs are ordered by number of likes', function() {
      cy.createBlog({
        title: 'Middle Likes',
        author: 'MLikes',
        url: 'mlikes.com',
        likes: 43
      });

      cy.createBlog({
        title: 'Least Likes',
        author: 'Llikes',
        url: 'llikes.com',
        likes: 0
      });

      cy.createBlog({
        title: 'Most Likes',
        author: 'MoLikes',
        url: 'MoLikes.com',
        likes: 76
      });

      cy.visit('http://localhost:3000/');

      cy.get('.blog-expand-toggle').then(($bp) => {
        $bp.click();
      });

      cy.get('.blog-likes-count').then(($bc) => {
        const objs = Object.values($bc).slice(0, 3);
        const counts = objs.map(o => Number(o.innerHTML));
        const originalCounts = [ ...counts ];
        expect(originalCounts).to.deep.equal(counts.sort().reverse());
      });
    });
  });
});
