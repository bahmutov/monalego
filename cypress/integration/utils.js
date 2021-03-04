export const downloadPng = (filename) => {
  expect(filename).to.be.a('string')

  // the simplest way is to grab the data url and use
  // https://on.cypress.io/writefile to save PNG file
  return cy.get('canvas').then(($canvas) => {
    const url = $canvas[0].toDataURL()
    const data = url.replace(/^data:image\/png;base64,/, '')
    cy.writeFile(filename, data, 'base64')
    cy.wrap(filename)
  })
}

export const downloadViaDataUrl = (name, brickValue) => {
  const filename = brickValue ? `${name}-${brickValue}.png` : `${name}.png`

  // the simplest way is to grab the data url and use
  // https://on.cypress.io/writefile to save PNG file
  return cy.get('canvas').then(($canvas) => {
    const url = $canvas[0].toDataURL()
    const data = url.replace(/^data:image\/png;base64,/, '')
    cy.writeFile(filename, data, 'base64')
    cy.wrap(filename)
  })
}

// different ways of downloading the given canvas as an image
// the simplest seems to grab the canvas
// and use data url, then cy.writeFile(..., 'base64')

// TODO: see if we can directly use the binary cy.writeFile(..., 'binary')

export const downloadByClicking = (blob, name) => {
  console.log('downloading image', name)
  // blob ready, download it
  let link = document.createElement('a')
  link.download = name

  link.href = URL.createObjectURL(blob)
  link.click()

  // delete the internal blob reference, to let the browser clear memory from it
  URL.revokeObjectURL(link.href)
}
