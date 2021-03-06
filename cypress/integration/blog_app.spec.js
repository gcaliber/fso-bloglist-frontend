import { func } from 'prop-types'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Michael Green',
      username: 'mgreen',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mgreen')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains(`logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mgreen')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mgreen', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.visit('http://localhost:3000')
      cy.get('#toggle-hidden').click()
      cy.get('.title').type('test title')
      cy.get('.author').type('test author')
      cy.get('.url').type('test url')
      cy.get('#create-blog-button').click()
      cy.get('.success').contains('a new blog test title by test author added')
      cy.contains('test title')
    })

    describe('blog functionality', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'first url' })
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'second url' })
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'third url' })
      })

      it('a blog can be liked', function() {
        cy.contains('first blog').find('#details-button').click()
        cy.contains('first blog').contains('likes 0')
        cy.contains('first blog').find('#like').click()
        cy.contains('first blog').contains('likes 1')
      })

      it('a blog\'s creator can delete it', function() {
        cy.contains('first blog').find('#details-button').click()
        cy.contains('first blog').find('#remove-button').click()
        cy.get('.success').contains('first blog by first author removed')
        cy.contains('second blog').wait(5100)
        cy.contains('first blog').should('not.exist')
      })

      it('blogs are shown in the order of most likes to least', function() {
        cy.contains('first blog').find('#details-button').click()
        cy.contains('second blog').find('#details-button').click()
        cy.contains('second blog').find('#like').click().wait(100)
        cy.contains('second blog').find('#like').click().wait(100)
        cy.contains('third blog').find('#details-button').click()
        cy.contains('third blog').find('#like').click().wait(100)

        cy.get('.blog').then(function(blogs) {
          cy.wrap(blogs[0]).contains('second blog')
          cy.wrap(blogs[1]).contains('third blog')
          cy.wrap(blogs[2]).contains('first blog')
        })
      })
    })
  })
})