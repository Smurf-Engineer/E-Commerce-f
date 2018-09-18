/**
 * Render Utils
 */

import {
  DELETE_ACTION,
  DUPLICATE_ACTION,
  BRING_TO_FRONT_ACTION,
  SCALE_ACTION,
  ROTATE_ACTION,
  CANVAS_SIZE
} from './config'

const actionButtons = {
  br: SCALE_ACTION,
  bl: ROTATE_ACTION,
  tr: DUPLICATE_ACTION,
  tl: DELETE_ACTION,
  mb: BRING_TO_FRONT_ACTION
}

const calculateTriangleArea = (A, B, C) =>
  C.x * B.y - B.x * C.y - (C.x * A.y - A.x * C.y) + (B.x * A.y - A.x * B.y)

const isPointInsideOfTriangle = (coords, point) =>
  !(
    calculateTriangleArea(coords.a, coords.b, point) > 0 ||
    calculateTriangleArea(coords.b, coords.c, point) > 0 ||
    calculateTriangleArea(coords.c, coords.d, point) > 0 ||
    calculateTriangleArea(coords.d, coords.a, point) > 0
  )

const isPointInsideOfIcon = (coords, point) =>
  !(
    calculateTriangleArea(coords.tl, coords.tr, point) > 0 ||
    calculateTriangleArea(coords.tr, coords.br, point) > 0 ||
    calculateTriangleArea(coords.br, coords.bl, point) > 0 ||
    calculateTriangleArea(coords.bl, coords.tl, point) > 0
  )

export const isMouseOver = (bb, uv) => {
  const point = { x: uv.x * CANVAS_SIZE, y: (1 - uv.y) * CANVAS_SIZE }

  const rect = {
    a: { x: bb.left, y: bb.top },
    b: { x: bb.left + bb.width, y: bb.top },
    c: { x: bb.left + bb.width, y: bb.top + bb.height },
    d: { x: bb.left, y: bb.top + bb.height }
  }

  return isPointInsideOfTriangle(rect, point)
}

export const clickOnCorner = (corners = {}, uv = {}) => {
  const point = { x: uv.x * CANVAS_SIZE, y: (1 - uv.y) * CANVAS_SIZE }

  for (let corner in actionButtons) {
    const isOnCorner = isPointInsideOfIcon(corners[corner].corner, point)
    if (isOnCorner) {
      return actionButtons[corner]
    }
  }

  return ''
}

export const getTextCanvasElement = el => {
  const { id, text, fill, stroke, strokeWidth, fontFamily } = el
  const element = {
    id,
    text,
    textFormat: {
      fill,
      stroke,
      strokeWidth,
      fontFamily
    }
  }
  return element
}

export const getClipArtCanvasElement = el => {
  const { id, fill, stroke, strokeWidth, scaleX, scaleY } = el
  const element = { id, fill, stroke, strokeWidth, scaleX, scaleY }
  return element
}

export const getImageCanvas = el => {
  const { id, scaleX, scaleY, width, height, src } = el
  const element = {
    id,
    scaleX,
    scaleY,
    imageSize: { width, height },
    src
  }
  return element
}