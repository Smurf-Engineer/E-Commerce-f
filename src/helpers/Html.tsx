import React from 'react'
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
    <script
      type="text/javascript"
      src="//staticw2.yotpo.com/Rnb6ShWsqfzkqYmFM5RuNHtDJvKIcsexNP7yvpUO/widget.js"
    />
  </body>
)

export default Html
