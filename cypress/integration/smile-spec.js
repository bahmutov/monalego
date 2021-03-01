/// <reference types="cypress" />
import { downloadViaDataUrl } from './utils'

describe('Lego face', () => {
  it('smiles broadly', () => {
    cy.visit('/smile')
    cy.wait(1000)

    downloadViaDataUrl('smile').then((filename) => {
      cy.log(`saved ${filename}`)
      cy.task('compare', { filename }).should('deep.equal', {
        match: true,
      })
    })
  })
})
