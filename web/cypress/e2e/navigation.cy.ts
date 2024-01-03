describe('Navigation', () => {
  it('should navigate to the sign page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('a[href*="auth/sign-in"]').click()

    cy.url().should('include', '/auth/sign-in')

    cy.get('h2').contains('Bem vindo ao iBico')
  })
  it('should navigate to the register page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('a[href*="auth/register"]').click()

    cy.url().should('include', '/auth/register')

    cy.get('h2').contains('Cadastra-se no iBico')
  })

  it('should not be able to navigate to protect page', () => {
    cy.visit('http://localhost:3000/opportunities')
    cy.url().should('include', '/auth/sign')

  })
})
