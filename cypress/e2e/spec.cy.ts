describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should successfully send message', function () {
    cy.intercept({
        method: 'POST',
        url: '/'
      },
      {
        statusCode: 200,
        body: 'Cool',
      }).as('sendMessage')
    cy.get(`[data-cy="user address"]`).click()
      .type('mail@mail.com')
    cy.get(`[data-cy="message body"]`).click()
      .type('This is a valid message.')

    cy.get('[data-cy="send message"]').click()
    cy.contains('Email received').should('be.visible')
  });

  it('should get an error message if request fails', function () {
    cy.intercept({
      method: 'POST',
      url: '/'
    },
      {
        statusCode: 400,
        body: '400 error',
      }).as('sendMessage')

    cy.get(`[data-cy="user address"]`).click()
      .type('mail@mail.com')
    cy.get(`[data-cy="message body"]`).click()
      .type('This is a valid message.')

    cy.get('[data-cy="send message"]').click()
    cy.contains('Please email me directly at').should('be.visible')
  });
})