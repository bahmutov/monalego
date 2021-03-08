/// <reference types="cypress" />
import { looksTheSame } from './utils'

// testing https://www.chartjs.org/ example chart
describe('Chartjs bar chart', () => {
  it('renders the same chart', () => {
    cy.visit('/bar')
    looksTheSame('bar-chart.png')
  })

  // split the test to have a single image saved per test
  // if the test fails on CI we can download an image for each test
  it('adds a data set', () => {
    const log = false

    cy.visit('/bar')
    cy.contains('button', 'Add Dataset').click()
    looksTheSame('bar-chart-added-dataset.png', log)
  })

  it('adds two data sets', () => {
    const log = false

    cy.visit('/bar')
    cy.contains('button', 'Add Dataset').click()
    cy.contains('button', 'Add Dataset').click()
    looksTheSame('bar-chart-3-sets.png', log)
  })

  // a single test can definitely perform multiple comparisons
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
