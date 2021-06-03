/// <reference types="cypress" />

describe('Automation screenshot', () => {
  it('captures the canvas', () => {
    cy.visit('/smile')
      .wait(2000)
      .then(() => {
        cy.log('Page.captureScreenshot')
        // https://chromedevtools.github.io/devtools-protocol/
        // https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot
        return Cypress.automation('remote:debugger:protocol', {
          command: 'Page.captureScreenshot',
          params: {
            format: 'png',
          },
        })
      })
      .its('data')
      .then((base64) => {
        cy.writeFile('test-smile.png', base64, 'base64')
        cy.task('getImageResolution', 'test-smile.png')
          .then(JSON.stringify)
          .then(cy.log)
          .then(JSON.parse)
          .should('include.all.keys', ['width', 'height', 'filename', 'format'])
          .and('have.property', 'format', 'PNG')
      })
  })
})
