// @ts-check
const { compareOdiff, comparePixelmatch } = require('./diffs')
const path = require('path')
const os = require('os')

const osName = os.platform()

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    async compare({ filename, options }) {
      const baseFolder = 'images'
      const baseImage = path.join(baseFolder, osName, path.basename(filename))
      const newImage = filename
      const diffImage = 'diff.png'
      console.log(
        'comparing base image %s to the new image %s',
        baseImage,
        newImage,
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
