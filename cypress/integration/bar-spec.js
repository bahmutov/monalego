/// <reference types="cypress" />
import { looksTheSame } from './utils'

// testing https://www.chartjs.org/ example chart
describe('Chartjs bar chart', () => {
  it('renders the same chart', () => {
    cy.visit('/bar')
    looksTheSame('bar-chart.png')
  })

  it('adds and removes data sets', () => {
    const log = false

    cy.visit('/bar')
    looksTheSame('bar-chart.png', log)

    cy.contains('button', 'Add Dataset').click()
    looksTheSame('bar-chart-added-dataset.png', log)

    cy.contains('button', 'Add Dataset').click()
    looksTheSame('bar-chart-3-sets.png', log)

    // remove first two data sets
    cy.contains('button', 'Remove Dataset').click().click()
    looksTheSame('bar-chart-third-dataset-only.png', log)
  })
})
