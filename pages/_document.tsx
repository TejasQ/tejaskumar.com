import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧔🏾</text></svg>"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,900"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=DM+Sans:400,700|Gloria+Hallelujah|Inria+Serif&amp;display=swap"
            rel="stylesheet"
          />
          <link
            href="https://tejaskumar.com/api/rss"
            rel="alternate"
            type="application/rss+xml"
            title="RSS for blog posts"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
