/// <reference types="cypress" />
import { downloadViaDataUrl } from './utils'
import { recurse } from 'cypress-recurse'

describe('Lego face', () => {
  it('smiles broadly with wait', () => {
    cy.visit('/smile')
    cy.wait(4000)

    downloadViaDataUrl('smile').then((filename) => {
      cy.log(`saved ${filename}`)
      cy.task('compare', { filename }).should('deep.equal', {
        match: true,
      })
    })
  })

  it('smiles broadly', () => {
    cy.visit('/smile')

    recurse(
      () => {
        return downloadViaDataUrl('smile').then((filename) => {
          cy.log(`saved ${filename}`)
          return cy.task('compare', { filename })
        })
      },
      ({ match }) => match,
      {
        log: true,
        timeout: 4000,
      },
    )
  })
})
