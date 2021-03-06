// @ts-check
const { comparePixelmatch } = require('./diffs')
const path = require('path')
const fs = require('fs')
const os = require('os')
const osName = os.platform() // "darwin", "linux", "win32"

/**
 * Finds the good "master" image to compare the new image to.
 * @param {string} filename The new image filename
 */
const findBaseImage = (filename) => {
  const baseFolder = 'images'
  const justFilename = path.basename(filename)
  const platformSpecificBaseImage = path.join(baseFolder, osName, justFilename)
  if (fs.existsSync(platformSpecificBaseImage)) {
    return platformSpecificBaseImage
  }
  // assume the image across all platforms looks the same
  const baseImage = path.join(baseFolder, justFilename)
  return baseImage
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    async compare({ filename, options }) {
      if (!filename.endsWith('.png')) {
        const msg = `Expected image filename "${filename}" to end with .png`
        console.error(msg)
        throw new Error(msg)
      }

      const baseImage = findBaseImage(filename)

      const newImage = filename
      const baseImageWithoutExtension = path.basename(filename, '.png')
      const diffImage = `${baseImageWithoutExtension}-diff.png`
      console.log(
        'comparing base image %s to the new image %s, diff image %s',
        baseImage,
        newImage,
        diffImage,
      )

      const started = +new Date()
      // const result = await compareOdiff(baseImage, newImage, diffImage, options)
      const result = comparePixelmatch(baseImage, newImage, diffImage)
      const finished = +new Date()
      const elapsed = finished - started
      console.log('visual diff took %dms', elapsed)
      return result
    },
  })
}
