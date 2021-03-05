/// <reference types="cypress" />
import { downloadPng } from './utils'
import { recurse } from 'cypress-recurse'

describe('Lego face', () => {
  it('saves canvas as an image', () => {
    cy.visit('/smile')
    cy.wait(4000)
    downloadPng('good-smile.png')
  })

  it.only('smiles broadly with wait', () => {
    cy.visit('/smile')
    cy.wait(4000)

    downloadPng('smile.png').then((filename) => {
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
        return downloadPng('smile.png').then((filename) => {
          cy.log(`saved ${filename}`)
          return cy.task('compare', { filename })
        })
      },
      ({ match }) => match,
    )
  })
})
