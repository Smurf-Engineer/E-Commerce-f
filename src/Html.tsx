import React from 'react'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

interface Props {
  content: any
  state: any
}

const Html = ({ content, state }: Props) => (
  <html lang="en">
    <head>
      <script src="js/three.min.js" />
      <script src="js/loaders/DDSLoader.js" />
      <script src="js/loaders/MTLLoader.js" />
      <script src="js/loaders/OBJLoader.js" />
      <script src="js/controls/OrbitControls.js" />
      <script src="js/shaders/FresnelShader.js" />
      <script src="js/Detector.js" />
      <script src="js/libs/stats.min.js" />
      <script src="js/libs/dat.gui.min.js" />
      <script src="js/libs/stats.min.js" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <title>Jackroo Designer</title>
      {assets.client.css ? (
        <link rel="stylesheet" href={assets.client.css} />
      ) : (
        ''
      )}
      {process.env.NODE_ENV === 'production' ? (
        <script src={assets.client.js} defer={true} />
      ) : (
        <script src={assets.client.js} defer={true} />
      )}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        charSet="UTF-8"
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            '\\u003c'
          )};`
        }}
      />
    </body>
  </html>
)

export default Html
