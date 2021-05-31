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
        console.log(base64)
        cy.writeFile('test-smile.png', base64, 'base64')
      })
  })
})
