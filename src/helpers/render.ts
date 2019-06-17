import { renderToStaticMarkup } from 'react-dom/server'
import config from '../config'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

const renderHtml = (styleTags: any, html: any) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <script type="text/javascript" src="/js/three.min.js"></script>
          <script type="text/javascript" src="/js/loaders/MTLLoader.js"></script>
          <script type="text/javascript" src="/js/loaders/OBJLoader.js"></script>
          <script type="text/javascript" src="/js/controls/OrbitControls.js"></script>
          <script type="text/javascript" src="/js/fabric.min.js"></script>
          <script type="text/javascript" src="/js/customiseControls.min.js"></script>
          <script type="text/javascript" \
            src="https://cdnjs.cloudflare.com/ajax/libs/canvg/1.3/rgbcolor.min.js"></script>
          <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/canvg/dist/browser/canvg.min.js"></script>
          <script>
            window.fbAsyncInit = function() {
              FB.init({
                appId            : ${config.facebookId},
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v2.12'
              });
            };

            (function(d, s, id){
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          </script>
          <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-${
                config.googleTagManagerId
              }');
           </script>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>JAKROO.COM - Design your own Cycling, Triathlon and MTB Wear</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
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
    </html>`
}

export default renderHtml
