/// <reference types="cypress" />
import { downloadViaDataUrl } from './utils'

const checkBrickValue = (value) => {
  cy.log(`checking brick **${value}**`)
  cy.wrap(value).should('be.gte', 6).and('be.lte', 24)

  // let's set the value
  cy.get('#range').invoke('val', value).trigger('input')

  // how do we know when the Lego canvas has finished updating?
  // https://github.com/pshihn/legra/issues/10
  // for now a couple of seconds wait seems to be enough
  cy.wait(3000)

  // find the current brick size from the slider
  // and download the generated canvas
  cy.get('#range')
    .invoke('val')
    .then((brickValue) => downloadViaDataUrl('canvas', brickValue))
    .then((filename) => {
      cy.log(`saved ${filename}`)
      cy.task('compare', { filename }).should('deep.equal', {
        match: true,
      })
    })
}

describe('MonaLego', () => {
  it('has range slider', () => {
    cy.visit('/')
    // let's confirm min and max
    cy.get('#range')
      .should('have.attr', 'min')
      .then(parseInt)
      .should('be.lte', 10)
    cy.get('#range')
      .should('have.attr', 'max')
      .then(parseInt)
      .should('be.gte', 20)
  })

  it('renders Lego', () => {
    cy.visit('/')
    cy.log('**default brick value**')
    cy.get('#range')
      .invoke('val')
      .then((brickValue) => downloadViaDataUrl('canvas', brickValue))
      .then((filename) => {
        cy.log(`saved ${filename}`)
        cy.task('compare', { filename }).should('deep.equal', {
          match: true,
        })
      })
  })

  it('renders Lego at different brick sizes', () => {
    cy.visit('/')
    checkBrickValue(6)
    checkBrickValue(8)
    checkBrickValue(20)
  })
})
