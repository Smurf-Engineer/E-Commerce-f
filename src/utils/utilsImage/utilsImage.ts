import { Image, loadImage, createCanvas } from 'canvas'
var measureBlur = require('./measureBlur.ts')

export const mesaureImageQuality = async (file: File) => (new Promise((res, rej) => {
  function drawImageOnCanvas(image: Image) {
    var canvas = createCanvas(image.width, image.height), context

    context = canvas.getContext('2d')
    context.drawImage(image, 0, 0)

    showBlurScore(context.getImageData(0, 0, canvas.width, canvas.height))
  }

  function showBlurScore(imageData: ImageData) {
    var stats = measureBlur(imageData)
    // console.log('Blur score:', Number((stats.avg_edge_width_perc).toFixed(2)))
    // console.log(stats)
    res(Number((stats.avg_edge_width_perc).toFixed(2)))
  }

  const reader = new FileReader()
  reader.onloadend = () => {
    loadImage(reader.result ? reader.result : '').then(drawImageOnCanvas)
  }
  reader.readAsDataURL(file)
}))