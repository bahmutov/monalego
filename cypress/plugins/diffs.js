const { compare } = require('odiff-bin')

const compareOdiff = async (baseImage, newImage, diffImage, options) => {
  if (options) {
    console.log('odiff options %o', options)
  }

  const result = await compare(baseImage, newImage, diffImage, options)

  console.log(result)
  return result
}

module.exports = { compareOdiff }
