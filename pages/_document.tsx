import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,900"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=DM+Sans:400,700|Gloria+Hallelujah|Inria+Serif&amp;display=swap"
            rel="stylesheet"
          />
          <link
            href="https://tejaskumar.com/rss"
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
