import "../styles/global.css";

import { AppProps } from "next/app";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import ReactGA from "react-ga";
import A from "../components/A";
import Nav from "../components/Nav";
import NavStyles from "../components/Nav.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ReactGA.initialize("UA-97872345-2");

    function onView() {
      ReactGA.set({ page: window.location.pathname + window.location.search });
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    onView();
    Router.events.on("routeChangeComplete", onView);
  }, []);

  return (
    <>
      <Nav>
        <ul>
          <li>
            <Link href="/" passHref>
              <A size={32} title="Home">
                🧔🏾
              </A>
            </Link>
          </li>
          <li>
            <Link href="/blog" passHref>
              <A title="Blog">BLOG</A>
            </Link>
          </li>
          <li>
            <A
              color="#38A1F3"
              target="_blank"
              href="https://twitter.com/tejaskumar_"
              rel="noopener"
            >
              TWITTER
            </A>
          </li>
          <li>
            <A target="_blank" href="https://github.com/tejasq" rel="noopener">
              GITHUB
            </A>
          </li>
          <li>
            <A
              color="red"
              target="_blank"
              href="https://github.com/TejasQ/tejaskumar.com#trolling"
              rel="noopener"
            >
              TROLL/LEARN
            </A>
          </li>
        </ul>
      </Nav>
      <main className={NavStyles.navMargin}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
