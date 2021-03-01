import Legra from 'https://unpkg.com/legra?module'

const ctx = document.querySelector('canvas').getContext('2d')
const legra = new Legra(ctx)

let direction = 1
let smileY = 12
const draw = () => {
  ctx.clearRect(0, 0, 480, 480)
  legra.circle(10, 10, 8, { filled: true, color: 'yellow' })
  legra.rectangle(6, 6, 2, 2, { filled: true, color: 'green' })
  legra.rectangle(13, 6, 2, 2, { filled: true, color: 'green' })
  legra.polygon(
    [
      [10, 8],
      [8, 11],
      [12, 11],
    ],
    { filled: true, color: 'red' },
  )

  legra.quadraticCurve(5, 13, 10, smileY, 15, 13)
}

function drawNext() {
  setTimeout(() => {
    smileY += direction
    draw()
    if (smileY >= 20) {
      // the last slide
      return
    }
    // if (direction === 1 && smileY >= 22) {
    //   direction = -1
    // } else if (direction === -1 && smileY <= 13) {
    //   direction = 1
    // }
    drawNext()
  }, 150)
}

drawNext()
