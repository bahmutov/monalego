import Legra from 'https://unpkg.com/legra?module'

const slider = document.getElementById('range')
const ctx = document.querySelector('canvas').getContext('2d')

const loadImage = async (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.addEventListener('error', () => {
      reject(new Error('Failed to load image'))
    })
    img.addEventListener('abort', () => {
      reject(new Error('Image load aborted'))
    })
    img.src = src
  })
}

const drawMonalisa = async () => {
  try {
    const legra = new Legra(ctx, slider.value)
    const url =
      'https://cdn.glitch.com/37b432db-0a92-49d0-8785-e6b3f2d3d266%2Fmonalisa.jpg?v=1573933933433'
    const img = await loadImage(url)
    ctx.clearRect(0, 0, 600, 600)
    legra.drawImage(img, [0, 0])
  } catch (err) {
    console.error(err)
  }
}

slider.addEventListener('input', () => {
  drawMonalisa()
})

drawMonalisa()
