import { renderToStaticMarkup } from 'react-dom/server'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

const renderHtml = (styleTags: any, html: any) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <script src="js/three.min.js"></script>
          <script src="js/loaders/MTLLoader.js"></script>
          <script src="js/loaders/OBJLoader.js"></script>
          <script src="js/controls/OrbitControls.js"></script>
          <script src="js/libs/stats.min.js"></script>
          <script src="js/libs/dat.gui.min.js"></script>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>JR-Web</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
          ${styleTags}
      </head>\n${renderToStaticMarkup(html)}
    </html>`
}

export default renderHtml
