/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'
import pixelmatch from 'pixelmatch'
import { looksTheSame } from './utils'

function ensureCanvasStatic(selector = 'canvas') {
  cy.log(`ensure the image in **${selector}** is static`)
  const noLog = { log: false }

  const delay = 300 // ms, when grabbing new image

  // take the current image
  return cy
    .get(selector, noLog)
    .then(($canvas) => {
      const ctx1 = $canvas[0].getContext('2d')
      const width = $canvas[0].width
      const height = $canvas[0].height
      let img1 = ctx1.getImageData(0, 0, width, height)
      console.log('canvas is %d x %d pixels', width, height)

      // initial delay to make sure we catch updates
      cy.wait(delay, noLog)

      return recurse(
        // "work" function
        () => {
          return cy.get(selector, noLog).then(($canvas) => {
            const ctx2 = $canvas[0].getContext('2d')
            const img2 = ctx2.getImageData(0, 0, width, height)

            const diff = ctx2.createImageData(width, height)
            // number of different pixels
            const number = pixelmatch(
              img1.data,
              img2.data,
              diff.data,
              width,
              height,
              {
                threshold: 0.1,
              },
            )
            console.log(number)

            // for next comparison, use the new image
            // as the base - this way we can get to the end
            // of any animation
            img1 = img2

            return number
          })
        },
        // predicate function
        (numberOfDifferentPixels) => numberOfDifferentPixels < 10,
        // recurse options
        {
          // by default uses the default command timeout
          log: (numberOfDifferentPixels) =>
            cy.log(`**${numberOfDifferentPixels}** diff pixels`),
          delay,
        },
      )
    })
    .then(() => {
      cy.log(`picture in **${selector}** is static`)
    })
}

describe('pixelmatch', () => {
  // for showing the diff only
  it('works in the browser', () => {
    cy.visit('/smile')
    cy.wait(400)
    cy.get('canvas').then(($canvas) => {
      const ctx1 = $canvas[0].getContext('2d')
      const width = $canvas[0].width
      const height = $canvas[0].height
      const img1 = ctx1.getImageData(0, 0, width, height)

      cy.wait(3000)
      // the image has finished animation
      cy.get('canvas').then(($canvas) => {
        const ctx2 = $canvas[0].getContext('2d')
        const img2 = ctx2.getImageData(0, 0, width, height)

        const diff = ctx2.createImageData(width, height)
        const number = pixelmatch(
          img1.data,
          img2.data,
          diff.data,
          width,
          height,
          {
            threshold: 0.1,
          },
        )
        cy.log('pixelmatch ' + number)
        ctx2.putImageData(diff, 0, 0)
      })
    })
  })

  it('can wait for canvas to become static', () => {
    cy.visit('/smile')
    ensureCanvasStatic('canvas')
    // after this it is pretty much guaranteed to
    // immediately pass the image diffing on the 1st try
    looksTheSame('smile.png', false)
  })
})
