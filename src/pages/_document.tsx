/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <script
            type="text/javascript"
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=ee155ce8e7a99e04e81c5e9d96eddba1"
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
