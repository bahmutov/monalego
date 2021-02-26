/// <reference types="cypress" />

// different ways of downloading the given canvas as an image
// the simplest seems to grab the canvas
// and use data url, then cy.writeFile(..., 'base64')

// TODO: see if we can directly use the binary cy.writeFile(..., 'binary')

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
    cy.wrap(filename)
  })
}

const checkBrickValue = (value) => {
  cy.log(`checking brick **${value}**`)
  cy.wrap(value).should('be.gte', 6).and('be.lte', 24)

  // let's set the value
  cy.get('#range').invoke('val', value).trigger('input')

  // how do we know when the Lego canvas has finished updating?
  // https://github.com/pshihn/legra/issues/10
  // for now a couple of seconds wait seems to be enough
  cy.wait(2000)

  // find the current brick size from the slider
  // and download the generated canvas
  cy.get('#range')
    .invoke('val')
    .then(downloadViaDataUrl)
    .then((filename) => {
      cy.log(`saved ${filename}`)
      cy.task('compare', filename).should('deep.equal', {
        match: true,
      })
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

    cy.log('**default brick value**')
    cy.get('#range')
      .invoke('val')
      .then(downloadViaDataUrl)
      .then((filename) => {
        cy.log(`saved ${filename}`)
        cy.task('compare', filename).should('deep.equal', {
          match: true,
        })
      })

    checkBrickValue(6)
    checkBrickValue(8)
    checkBrickValue(20)
  })
})
