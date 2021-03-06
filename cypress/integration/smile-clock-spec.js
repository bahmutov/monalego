/// <reference types="cypress" />
import { downloadPng } from './utils'
import { recurse } from 'cypress-recurse'

describe('Lego face with clock', () => {
  it('smiles every tick', () => {
    let tick = 0

    cy.clock()
    cy.visit('/smile')

    recurse(
      () => {
        return downloadPng(`smile-${tick}ms.png`).then((filename) => {
          cy.log(`saved ${filename}`)
          return cy.task('compare', { filename })
        })
      },
      ({ match }) => match,
    )
  })
})
