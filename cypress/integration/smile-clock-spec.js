/// <reference types="cypress" />
import { downloadPng } from './utils'
import { recurse } from 'cypress-recurse'

describe('Lego face with clock', () => {
  it('smiles every tick', () => {
    let tick = 0

    cy.clock()
    cy.visit('/smile')
      .then(() => {
        tick += 150
        cy.tick(tick)
      })
      .then(() => {
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
      .then(() => {
        tick += 150
        cy.tick(tick)
      })
      .then(() => {
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
      .then(() => {
        tick += 150
        cy.tick(tick)
      })
      .then(() => {
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
      .then(() => {
        tick += 150
        cy.tick(tick)
      })
      .then(() => {
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

  it('smiles every tick (refactor 1)', () => {
    const controlClock = () => {
      let tick = 0
      cy.clock()
      return (ms = 150) => {
        return cy.then(() => {
          tick += ms
          cy.tick(tick)
          cy.wrap(tick)
        })
      }
    }

    const tock = controlClock()
    cy.visit('/smile')
    tock().then((tick) => {
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

    tock().then((tick) => {
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

    tock().then((tick) => {
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

    tock().then((tick) => {
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

  it('smiles every tick (refactor 2)', () => {
    const controlClock = () => {
      let tick = 0
      cy.clock()
      return (ms = 150) => {
        return cy.then(() => {
          tick += ms
          cy.tick(tick)
          cy.wrap(tick)
        })
      }
    }

    const tock = controlClock()
    cy.visit('/smile')

    for (let k = 0; k < 4; k += 1) {
      tock().then((tick) => {
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
    }
  })
})
