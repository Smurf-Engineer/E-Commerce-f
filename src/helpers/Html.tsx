import React from 'react'

interface Props {
  content: any
  state: any
  reduxState: any
}
const Html = ({ content, state, reduxState }: Props) => (
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
      charSet="UTF-8"
      dangerouslySetInnerHTML={{
        __html: `window.__PRELOADED_STATE__=${JSON.stringify(
          reduxState
        ).replace(/</g, '\\u003c')};`
      }}
    />
    <script async={true} defer={true} src="//platform.twitter.com/widgets.js" />
    <script
      type="text/javascript"
      src="//staticw2.yotpo.com/Rnb6ShWsqfzkqYmFM5RuNHtDJvKIcsexNP7yvpUO/widget.js"
    />
    <link
      type="text/css"
      rel="stylesheet"
      href="//fast.fonts.net/cssapi/e3c47c0e-c78f-405c-a79f-73c6e8d39aef.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    />
  </body>
)

export default Html
