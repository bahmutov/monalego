const { compare } = require('odiff-bin')
const path = require('path')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    async compare(filename) {
      const baseFolder = './images'
      const baseImage = path.join(baseFolder, path.basename(filename))
      const newImage = filename
      const diffImage = 'diff.png'
      console.log(
        'comparing base image %s to new image %s',
        baseImage,
        newImage,
      )
      const started = +new Date()
      const result = await compare(baseImage, newImage, diffImage)
      const finished = +new Date()
      const elapsed = finished - started
      console.log('odiff took %dms', elapsed)

      console.log(result)
      return result
    },
  })
}
