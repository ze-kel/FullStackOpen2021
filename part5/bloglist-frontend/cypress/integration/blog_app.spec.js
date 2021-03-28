Cypress.Commands.add('addBlog', (content) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: content,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedappUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})

describe('Blog', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'TEST TESTER',
      username: 'TESTER',
      password: 'TETETEST',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  describe('Login', function () {
    it('User can login', function () {
      cy.contains('Login').click()
      cy.get('#username').type('TESTER')
      cy.get('#password').type('TETETEST')
      cy.get('#loginbutton').click()

      cy.contains('TEST TESTER is logged in')
    })

    it('login fails with wrong password', function () {
      cy.contains('Login').click()
      cy.get('#username').type('TESTER')
      cy.get('#password').type('asdasd')
      cy.get('#loginbutton').click()

      cy.get('#importantMessage').should('contain', 'Wrong')
    })
  })

  describe('Working with notes', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'TESTER',
        password: 'TETETEST',
      }).then((response) => {
        localStorage.setItem('loggedappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('We can create notes', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Sample new note title')
      cy.get('#author').type('Testing Tester')
      cy.get('#url').type('/this/is/a/test/entry')
      cy.get('#savenewblog').click()
      cy.contains('Sample new note title')
    })

    describe('Working with notes', function () {
      beforeEach(function () {
        cy.addBlog({ title: 'SAMPLE NOTE 1', author: 'Cypress', url: '/test' })
        cy.addBlog({ title: 'SAMPLE NOTE 2', author: 'Cypress', url: '/test' })
        cy.addBlog({ title: 'SAMPLE NOTE 3', author: 'Cypress', url: '/test' })
      })

      it('User can like a blog', function () {
        cy.contains('details').click()
        cy.contains('NOTE 1').find('.likebutton').click()
        cy.get('.likescount').contains('Likes: 1')
      })

      it('User can delete', function () {
        cy.contains('SAMPLE NOTE 2').should('exist')
        cy.contains('NOTE 2').contains('details').click()
        cy.contains('NOTE 2').find('.deletebutton').click()
        cy.contains('SAMPLE NOTE 2').should('not.exist')
      })

      it.only('Blogs are ordered by likes', function () {
        cy.contains('NOTE 3').contains('details').click()
        cy.contains('NOTE 3')
          .find('.likebutton')
          .click()
          .click()
          .wait(100)
          .click()
          .click()
          .wait(100)
          .click()

        cy.contains('NOTE 2').contains('details').click()
        cy.contains('NOTE 2')
          .find('.likebutton')
          .click()
          .click()
          .wait(100)
          .click()

        cy.contains('NOTE').first().contains('SAMPLE NOTE 3')

        cy.contains('NOTE 2')
          .find('.likebutton')
          .click()
          .click()
          .wait(100)
          .click()
          .click()

        cy.contains('NOTE').first().contains('SAMPLE NOTE 2')
      })
    })
  })
})
