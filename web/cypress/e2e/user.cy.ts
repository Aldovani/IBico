import { DateTime } from 'tests/date'

function authenticated() {
  cy.intercept({ method: 'get', url: 'http://localhost:8080/users/me' }).as(
    'me',
  )
  cy.visit('http://localhost:3000/auth/sign-in')
  cy.get('input#cpf').type('72938116080')
  cy.get('input#password').type('Senha1234.')
  cy.get('form').submit()
  cy.wait('@me')
  cy.url().should('eq', 'http://localhost:3000/opportunities')
}

describe('User', () => {
  beforeEach(() => {
    authenticated()
  })

  it('should be able create a opportunity', () => {
    cy.intercept({
      method: 'post',
      url: 'http://localhost:8080/opportunities',
    }).as('opportunity')
    cy.get('[title="Publique sua oportunidade"]').click()

    const startDate = DateTime.addDays(new Date(), 2).toJSON().split('T')[0]
    const endDate = DateTime.addDays(new Date(), 4).toJSON().split('T')[0]

    cy.get('input#title').type('Nova oportunidade')
    cy.get('input#place').type('Dobrada - Sp')
    cy.get('input#date-started').type(startDate)
    cy.get('input#date-finished').type(endDate)
    cy.get('input#amount').type('100')
    cy.get('input#timeLoad').type('1 semana')
    cy.get('textarea#description').type(
      'aqui vem um texto muito legal para eu colocar na descrição eba q legal',
    )
    cy.get('input#skills').type('Skill test {enter}')

    cy.get('form').submit()
    cy.wait('@opportunity')

    cy.get('[data-type="SUCCESS"]').contains('Sucesso')
    cy.url().should('eq', 'http://localhost:3000/dashboard/opportunities')
  })
})
