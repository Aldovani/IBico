describe('Auth', () => {
  it('should be able authenticated', () => {
    cy.visit('http://localhost:3000/auth/sign-in')
    cy.get('input#cpf').type('72938116080')
    cy.get('input#password').type('Senha1234.')
    cy.get('form')
      .submit()
      .url()
      .should('eq', 'http://localhost:3000/opportunities')
  })

  it('should be not able authenticated with CPF or password invalid', () => {
    cy.visit('http://localhost:3000/auth/sign-in')
    cy.get('input#cpf').type('72938116080')
    cy.get('input#password').type('Senha1234')
    cy.get('form')
      .submit()
      .get('[data-toast-type="ERROR"] h4')
      .contains('Dados inválidos')
  })
})
