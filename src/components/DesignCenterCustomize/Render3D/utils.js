/**
 * Render Utils
 */

export const isMouseOver = (bound, uv) => {
  const triangleArea = (A, B, C) =>
    C.x * B.y - B.x * C.y - (C.x * A.y - A.x * C.y) + (B.x * A.y - A.x * B.y)

  const point = {}
  point.x = uv.x * 2048
  point.y = (1 - uv.y) * 2048

  const rect = { a: {}, b: {}, c: {}, d: {} }
  rect.a.x = bound.left
  rect.a.y = bound.top
  rect.b.x = bound.left + bound.width
  rect.b.y = bound.top
  rect.c.x = bound.left + bound.width
  rect.c.y = bound.top + bound.height
  rect.d.x = bound.left
  rect.d.y = bound.top + bound.height

  return !(
    triangleArea(rect.a, rect.b, point) > 0 ||
    triangleArea(rect.b, rect.c, point) > 0 ||
    triangleArea(rect.c, rect.d, point) > 0 ||
    triangleArea(rect.d, rect.a, point) > 0
  )
}
