/// <reference types="cypress" />

const downloadByClicking = (blob, name) => {
  console.log('downloading image', name)
  // blob ready, download it
  let link = document.createElement('a')
  link.download = name

  link.href = URL.createObjectURL(blob)
  link.click()

  // delete the internal blob reference, to let the browser clear memory from it
  URL.revokeObjectURL(link.href)
}

const downloadViaDataUrl = (brickValue) => {
  const filename = `canvas-${brickValue}.png`
  // the simplest way is to grab the data url and use
  // https://on.cypress.io/writefile to save PNG file
  cy.get('canvas').then(($canvas) => {
    const url = $canvas[0].toDataURL()
    const data = url.replace(/^data:image\/png;base64,/, '')
    cy.writeFile(filename, data, 'base64')
  })
}

describe('MonaLego', () => {
  it('renders Lego', () => {
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

    cy.get('#range').invoke('val').then(downloadViaDataUrl)

    // let's set the value
    cy.get('#range').invoke('val', 6).trigger('input')

    // how do we know when the Lego canvas has finished updating?
    // https://github.com/pshihn/legra/issues/10
    // for now 1 second wait seems to be enough
    cy.wait(1000)

    // find the current brick size from the slider
    // and download the generated canvas
    cy.get('#range').invoke('val').then(downloadViaDataUrl)
  })
})
