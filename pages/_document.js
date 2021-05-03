import Document, { Html, Head, Main, NextScript } from 'next/document';
import { APP_NAME, DESCRIPTION, OG_TITLE } from '../lib/config';

// const APP_NAME = 'Litha Labs';
// const APP_DESCRIPTION = '';

export default class extends Document {
  // static async getInitialProps(ctx) {
  //   return await Document.getInitialProps(ctx);
  // }

  render() {
    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <meta charSet="UTF-8"></meta>
          {/* <link rel="icon" href={IMAGE} type="image/png" sizes="16x16"></link> */}
          <title>{OG_TITLE}</title>
          <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='description' content={DESCRIPTION} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
          {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}

          <link rel='apple-touch-icon' sizes='76x76' href='/icons/apple-touch-icon.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/icons/favicon.png' />


          {/* <!--Import Google Icon Font--> */}
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:500&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
            rel="stylesheet"
          />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
            rel="stylesheet"
          />

          {/* <!--Import Font Awesome Icon Font--> */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0="
            crossorigin="anonymous"
          />

          {/* <!--Import materialize.css--> */}
          {/* <link
            rel="stylesheet"
            type="text/css"
            href="/css/materialize.min.css"
          /> */}

          {/* <!--Main css--> */}
          <link rel="stylesheet" type="text/css" href="/css/style.css" />



        </Head>
        <body>
          <Main />
          <NextScript />

          {/* <script src="https://use.fontawesome.com/a11305c69d.js"></script>
          <script type="text/javascript" src="/js/webchat.js"></script> */}


          {/* <!--JavaScript at end of body for optimized loading--> */}
          <script type="text/javascript" src="/js/lib/showdown.min.js"></script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script type="text/javascript" src="/js/lib/materialize.min.js" ></script>
          <script src="/js/lib/uuid.min.js"></script>

          {/* <!--Main Script --> */}
          <script type="text/javascript" src="/js/script.js"></script>

          {/* <!--Chart.js Script --> */}
          <script type="text/javascript" src="/js/lib/chart.min.js"></script>


        </body>
      </Html >
    );
  }
}
