import { renderToStaticMarkup } from 'react-dom/server'
import serialize from 'serialize-javascript'
import { fromJS } from 'immutable'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

const renderHtml = (styleTags: any, html: any, preloadState: any) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <script type="text/javascript" src="js/three.min.js"></script>
          <script type="text/javascript" src="js/loaders/MTLLoader.js"></script>
          <script type="text/javascript" src="js/loaders/OBJLoader.js"></script>
          <script type="text/javascript" src="js/controls/OrbitControls.js"></script>
          <script type="text/javascript" src="js/libs/stats.min.js"></script>
          <script type="text/javascript" src="js/libs/dat.gui.min.js"></script>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>JR-Web</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" type="text/css" href="${
                  assets.client.css
                }">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
          ${styleTags}
      </head>\n${renderToStaticMarkup(html)}
      \n<script>
            window.__PRELOADED_STATE__ = ${serialize(preloadState)}
          </script>
    </html>`
}

export default renderHtml
