import * as React from 'react'
import * as express from 'express'
import App from './App'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const context = {}
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    )
    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Jackroo Designer</title>
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
         <script src="js/three.min.js"></script>
         <script src="js/loaders/DDSLoader.js"></script>
         <script src="js/loaders/MTLLoader.js"></script>
         <script src="js/loaders/OBJLoader.js"></script>
         <script src="js/controls/OrbitControls.js"></script>
         <script src="js/shaders/FresnelShader.js"></script>
         <script src="js/Detector.js"></script>
         <script src="js/libs/stats.min.js"></script>
         <script src="js/libs/dat.gui.min.js"></script>
         <script src="js/libs/stats.min.js"></script>
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    )
  })

export default server
