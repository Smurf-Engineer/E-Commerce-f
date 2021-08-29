import React from 'react'
import config from '../config'

interface Props {
  content: any
  state: any
  reduxState: any
}
const Html = ({ content, state, reduxState }: Props) => (
  <body>
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=GTM-${config.googleTagManagerId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
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
    <script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="1b3f0d8b-c158-4fbd-a58b-3f42fb058a43"
      type="text/javascript"
      async={true}
    />
    <script
      type="text/javascript"
      src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"
    />
    <script
      type="text/javascript"
      src="https://www.gstatic.com/firebasejs/4.8.1/firebase-auth.js"
    />
    <script
      type="text/javascript"
      src="https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js"
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js" />
    <script
      type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhSNGqAuj6AL4mJ0oNogYDK1UJcc_ws5U&libraries=places"
    />
    {/* <script
      async={true}
      src="https://docs.opencv.org/master/opencv.js"
      type="text/javascript"
    /> */}
  </body>
)

export default Html
