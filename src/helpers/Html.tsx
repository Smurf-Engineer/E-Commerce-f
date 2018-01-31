import React from 'react'
import serialize from 'serialize-javascript'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

interface Props {
  content: any
  state: any
}
const Html = ({ content, state }: Props) => (
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
)

export default Html
