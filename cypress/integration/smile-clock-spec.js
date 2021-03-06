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
    // a small utility function to control the clock
    // and keep track of the current synthetic tick
    const controlClock = () => {
      let tick = 0
      cy.clock()
      // return a function to advance the clock
      return (ms = 150) => {
        // wrap it in cy.then() so this code runs
        // as part of normal Cypress chain of scheduled commands
        return cy.then(() => {
          // advance the clock and yield it to other commands
          // so other commands could do
          // tick(200).then(currentClockMs => ...)
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
