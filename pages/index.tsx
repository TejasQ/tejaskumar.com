import React, { useEffect, useRef, useState } from "react";
import { title } from "case";
import ReactGA from "react-ga";
import Link from "next/link";
import Head from "next/head";

import Title from "../components/Title";
import { useBlog } from "../hooks/useBlog";
import names from "../util/tej-variants";
import Card from "../components/Card";
import styled from "@emotion/styled";
import SectionHeading from "../components/SectionHeading";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: auto;

  img {
    max-width: 100vw;
  }

  .intro {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .blog {
    display: grid;
    grid-template-rows: min-content auto;
    max-width: 768px;
    margin: 0 auto;
    padding: 16px;
  }
`;

const BlogList = styled.div`
  display: grid;
  gap: 16px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const App = ({ name, numberOfTejass }: { name: string; numberOfTejass: number }) => {
  const posts = useBlog();
  const containerElement = useRef<HTMLDivElement>(null);
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
    if (!containerElement.current) {
      return;
    }
    containerElement.current.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("shake", handleMouseMove);
    return () => {
      if (!containerElement.current) {
        return;
      }
      containerElement.current.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("shake", handleMouseMove);
    };
  });

  return (
    <Container ref={containerElement}>
      <Head>
        <title>Tejas Kumar | Speaker, Engineer, JavaScript, Love</title>
        <meta
          name="description"
          content="Personal website of Tejas Kumar, an award-winning web developer and international speaker."
        />
      </Head>
      <section className="intro">
        <Title length={name.length}>
          <b>TEJ</b>
          {name}
        </Title>
        <img
          style={{ zIndex: 1, background: "transparent" }}
          alt={`Tejas ${currentTejas}`}
          src={`/tejass/${currentTejas}.png`}
        />
      </section>
      {posts && (
        <section className="blog">
          <SectionHeading>Latest From the Blog</SectionHeading>
          <BlogList>
            {posts.slice(0, 1).map(post => (
              <Link href={`/blog/${post.title}`} key={post.title}>
                <Card>
                  <h2>{title(post.title)}&nbsp;&nbsp;👉🏾</h2>
                </Card>
              </Link>
            ))}
            <Link href={`/blog`}>
              <Card center>
                <h2>🚀</h2>
                <h2>MOAR BLOG POSTS</h2>
              </Card>
            </Link>
          </BlogList>
        </section>
      )}
    </Container>
  );
};

App.getInitialProps = () => {
  const numberOfTejass = 14;
  const name = names[Math.floor(Math.random() * names.length)];

  return { name, numberOfTejass };
};

export default App;
