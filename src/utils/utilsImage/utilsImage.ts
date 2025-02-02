import { GIF_TYPE, PNG_TYPE, BMP_TYPE, TIFF_TYPE, JPEG_TYPE, PHOTOSHOP_TYPE, JPG_TYPE } from '../../constants'
import { LoadScripts } from '../scriptLoader'

const validTypes = [
  GIF_TYPE,
  PNG_TYPE,
  BMP_TYPE,
  TIFF_TYPE,
  JPEG_TYPE,
  JPG_TYPE,
  PHOTOSHOP_TYPE
]

export const mesaureImageQuality = async (file: File) => 
  new Promise((resolve, rej) => {
    if (file && validTypes.includes(file.type)) {
      const myImage = new Image()
      myImage.onload = async () => {
        if (window && window.cv) {
          calculate(myImage, resolve)()
        } else {
          await LoadScripts(
            [{ url: 'https://docs.opencv.org/master/opencv.js', scriptId: 'opencv', async: true }],
            calculate(myImage, resolve)
          )
        }
      }
      myImage.src = URL.createObjectURL(file)
    } else {
      resolve(-1)
      return
    }
} )

export const calculate = (myImage: any, solve: any) => () => {
  const cv = window.cv
  if (cv.getBuildInformation) {
    getScore(cv, solve, myImage)
  } else {
    cv.onRuntimeInitialized = () => {
      getScore(cv, solve, myImage)
    }
  }
}

export const getScore = (cv: any, solve: any, myImage: any) => {
  let src = cv.imread(myImage)
  let dst = new cv.Mat()
  let men = new cv.Mat()
  let menO = new cv.Mat()
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0)
  // You can try more different parameters
  var t = cv.Laplacian(src, dst, cv.CV_64F, 3, 1, 0, cv.BORDER_DEFAULT)
  console.log(t, cv.meanStdDev(dst, menO, men), menO.data64F[0], men.data64F[0])
  let limit = 50
  const area = myImage.width * myImage.height
  if (area <= 129600) {
      limit = 69
  } else if (area <= 241773) {
      limit = 25
  } else if (area <= 476100) {
      limit = 45
  } else if (area <= 1048576) {
      limit = 70
  } else if (area <= 1228800) {
      limit = 25
  }
  const score = limit - men.data64F[0]
  console.log('🔵limit:', limit)
  console.log('🟢score:', score)
  src.delete(); dst.delete()
  solve(score)
}