import { Global } from "@emotion/core";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga";

import A from "../components/A";
import Container from "../components/Container";
import Nav from "../components/Nav";
import Title from "../components/Title";
import names from "../util/tej-variants";

const App = ({ name, numberOfTejass }) => {
  const containerElement = useRef(null);
  const [currentTejas, setCurrentTejas] = useState(1);
  const [shouldWaitToUpdateTejas, setShouldWaitToUpdateTejas] = useState(false);

  const handleNumber = () => {
    if (currentTejas === numberOfTejass) {
      setCurrentTejas(1);
      return;
    }

    setCurrentTejas(currentTejas + 1);
  };

  const handleMouseMove = () => {
    if (shouldWaitToUpdateTejas) {
      return currentTejas;
    }
    handleNumber();
    setShouldWaitToUpdateTejas(true);
    const timeout = setTimeout(() => setShouldWaitToUpdateTejas(false), 100);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    ReactGA.initialize("UA-97872345-2");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    if (!containerElement) {
      return;
    }
    containerElement.current.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("shake", handleMouseMove);
    return () => {
      containerElement.current.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("shake", handleMouseMove);
    };
  });

  return (
    <Container ref={containerElement}>
      <Head>
        <title>Tejas Kumar | Speaker, Engineer, JavaScript, Love</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,900" rel="stylesheet" />
        {Array(numberOfTejass)
          .fill(null)
          .map((_, index) => (
            <link key={index} rel="preload" as="image" href={`/static/tejass/${index + 1}.png`} />
          ))}
        <meta name="Description" content="This website is meant to be fun and funny and all kinds of wonderful. Here are two ways that I try and keep it fun: photos and Tej-variants" />
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
      <Global
        styles={{
          "html, body": {
            padding: 0,
            margin: 0,
            textRendering: "optimizeLegibility",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            overflow: "hidden",
          },
        }}
      />
      <Nav>
        <ul>
          {/* <li><a href="">TALKS</a></li> */}
          <li>
            <A color="#38A1F3" target="_blank" href="https://twitter.com/tejaskumar_">
              TWITTER
            </A>
          </li>
          <li>
            <A target="_blank" href="https://github.com/tejasq">
              GITHUB
            </A>
          </li>
          <li>
            <A color="red" target="_blank" href="https://github.com/TejasQ/tejaskumar.com#trolling">
              TROLL/LEARN
            </A>
          </li>
        </ul>
      </Nav>
      <Title length={name.length}>
        <b>TEJ</b>
        {name}
      </Title>
      <img alt={`Tejas ${currentTejas}`} src={`/static/tejass/${currentTejas}.png`} />
    </Container>
  );
};

App.getInitialProps = () => {
  const numberOfTejass = 14;
  const name = names[Math.floor(Math.random() * names.length)];

  return { name, numberOfTejass };
};

export default App;
