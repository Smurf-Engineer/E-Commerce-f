import { renderToStaticMarkup } from 'react-dom/server'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

const renderHtml = (styleTags: any, html: any) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <script type="text/javascript" src="js/three.min.js"></script>
          <script type="text/javascript" src="js/loaders/MTLLoader.js"></script>
          <script type="text/javascript" src="js/loaders/OBJLoader.js"></script>
          <script type="text/javascript" src="js/controls/OrbitControls.js"></script>
          <script type="text/javascript" src="js/fabric.min.js"></script>
          <script type="text/javascript" src="js/customiseControls.min.js"></script>
          <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/canvg/dist/browser/canvg.min.js"></script>
          <script>
            window.fbAsyncInit = function() {
              FB.init({
                appId            : '1656476814419105',
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
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>JAKROO.COM - Customized Cycling, Triathlon &amp; MTB Wear</title>
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
    </html>`
}

export default renderHtml
