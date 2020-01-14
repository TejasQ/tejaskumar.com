import Document, { Html, Head, Main, NextScript } from "next/document";
import { Global } from "@emotion/core";
import ReactGA from "react-ga";

import { globalStyles } from "../util/styles";
import styled from "@emotion/styled";
import Nav, { navHeight } from "../components/Nav";
import A from "../components/A";

const Content = styled.main`
  margin-top: ${navHeight}px;
`;

class MyDocument extends Document {
  componentDidMount() {
    ReactGA.initialize("UA-97872345-2");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  render() {
    return (
      <Html lang="en">
        <Global styles={globalStyles} />
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,900" rel="stylesheet" />
          <meta
            name="Description"
            content="This website is meant to be fun and funny and all kinds of wonderful. Here are two ways that I try and keep it fun: photos and Tej-variants"
          />
          <link
            href="https://fonts.googleapis.com/css?family=DM+Sans:400,700|Gloria+Hallelujah|Inria+Serif&display=swap"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, user-scalable=0, initial-scale=1" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97872345-2" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-97872345-2');
`,
            }}
          />
        </Head>
        <body>
          <Nav>
            <ul>
              <li>
                <A size={32} href="/" title="Home">
                  🧔🏾
                </A>
              </li>
              <li>
                <A href="/blog" title="Blog">
                  BLOG
                </A>
              </li>
              <li>
                <A color="#38A1F3" target="_blank" href="https://twitter.com/tejaskumar_" rel="noopener">
                  TWITTER
                </A>
              </li>
              <li>
                <A target="_blank" href="https://github.com/tejasq" rel="noopener">
                  GITHUB
                </A>
              </li>
              <li>
                <A color="red" target="_blank" href="https://github.com/TejasQ/tejaskumar.com#trolling" rel="noopener">
                  TROLL/LEARN
                </A>
              </li>
            </ul>
          </Nav>
          <Content>
            <Main />
          </Content>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
