/**
 * Render Utils
 */

import {
  DELETE_ACTION,
  DUPLICATE_ACTION,
  BRING_TO_FRONT_ACTION,
  SCALE_ACTION,
  ROTATE_ACTION
} from './config'

const CANVAS_SIZE = 2048

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

// TODO: Canvas size from SVG files?
export const clickOnCorner = (boundingBox = {}, corners = {}, uv = {}) => {
  const point = { x: uv.x * CANVAS_SIZE, y: (1 - uv.y) * CANVAS_SIZE }

  const horizontalLine = boundingBox.top + boundingBox.height / 2
  const verticalLine = boundingBox.left + boundingBox.width / 2

  if (point.y >= horizontalLine) {
    const isOnRotate = isPointInsideOfIcon(corners.bl.corner, point)
    if (isOnRotate) {
      return ROTATE_ACTION
    }

    const isOnLayer = isPointInsideOfIcon(corners.mb.corner, point)
    if (isOnLayer) {
      return BRING_TO_FRONT_ACTION
    }

    const isOnScale = isPointInsideOfIcon(corners.br.corner, point)
    if (isOnScale) {
      return SCALE_ACTION
    }

    return ''
  }

  if (point.x >= verticalLine) {
    return isPointInsideOfIcon(corners.tr.corner, point) ? DUPLICATE_ACTION : ''
  }

  return isPointInsideOfIcon(corners.tl.corner, point) ? DELETE_ACTION : ''
}
