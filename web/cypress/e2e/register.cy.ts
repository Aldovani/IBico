import { cpf } from 'tests/generate-cpf'
import { faker } from '@faker-js/faker'
describe('Register', () => {
  it('should navigate to the sign page', () => {
    cy.intercept({ url: 'http://localhost:8080/users', method: 'post' }).as(
      'user',
    )
    cy.intercept({ url: 'http://localhost:8080/users/me', method: 'get' }).as(
      'me',
    )

    cy.visit('localhost:3000/auth/register')

    cy.get('#cpf').type(cpf())
    cy.get('#name').type(faker.person.fullName())
    cy.get('#username').type(faker.internet.userName())
    cy.get('#cellphone').type('16999266739')
    cy.get('#password').type('Senha1234.')

    cy.get('form').submit()

    cy.wait('@user')
    cy.wait('@me')
    cy.url().should('eq', 'http://localhost:3000/auth/config')

    cy.get('#skills').type('Skill test {enter}')
    cy.contains('Skill test')
    cy.get('form').submit()
    cy.url().should('eq', 'http://localhost:3000/opportunities')
  })
})
