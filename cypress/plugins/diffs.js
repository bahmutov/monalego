const { compare } = require('odiff-bin')
const fs = require('fs')
const { PNG } = require('pngjs')
const pixelmatch = require('pixelmatch')

const compareOdiff = async (baseImage, newImage, diffImage, options) => {
  if (options) {
    console.log('odiff options %o', options)
  }

  const result = await compare(baseImage, newImage, diffImage, options)

  console.log(result)
  return result
}

const comparePixelmatch = (baseImage, newImage, diffImage) => {
  const img1 = PNG.sync.read(fs.readFileSync(baseImage))
  const img2 = PNG.sync.read(fs.readFileSync(newImage))
  const { width, height } = img1
  const diff = new PNG({ width, height })

  const n = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.1,
  })

  fs.writeFileSync(diffImage, PNG.sync.write(diff))
  console.log('pixelmatch %d diff pixels', n)

  return {
    match: n === 0,
  }
}

module.exports = { compareOdiff, comparePixelmatch }
