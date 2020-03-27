import { title } from "case";
import fs from "fs";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import SectionHeading from "../components/SectionHeading";
import Title from "../components/Title";
import styles from "../styles/home.module.css";
import { getInitialBlogPosts, Post } from "../util/getInitialBlogPosts";
import names from "../util/tej-variants";

// @ts-ignore
const path = __non_webpack_require__("path");

const App = ({
  name,
  numberOfTejass,
  firstPost,
}: {
  name: string;
  numberOfTejass: number;
  firstPost: Post;
}) => {
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
      containerElement.current.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      window.removeEventListener("shake", handleMouseMove);
    };
  });

  return (
    <div className={styles.container} ref={containerElement}>
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
          width={408}
          height={612}
          style={{ zIndex: 1, background: "transparent" }}
          alt={`Tejas ${currentTejas}`}
          src={`/tejass/${currentTejas}.png`}
        />
      </section>
      {firstPost && (
        <section className="blog">
          <SectionHeading>Latest From the Blog</SectionHeading>
          <div className={styles.blogList}>
            <Link
              href="/blog/[post]"
              as={`/blog/${firstPost.slug}`}
              key={firstPost.title}
            >
              <Card>
                <h2>{title(firstPost.title)}&nbsp;&nbsp;👉🏾</h2>
              </Card>
            </Link>

            <Link href={`/blog`}>
              <Card center>
                <h2>🚀</h2>
                <h2>MOAR BLOG POSTS</h2>
              </Card>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const numberOfTejass = fs
    .readdirSync(path.resolve("./public/tejass/"))
    .filter(entry => entry.endsWith(".png")).length;

  const name = names[Math.floor(Math.random() * names.length)];

  const { posts } = await getInitialBlogPosts();
  return {
    props: { name, numberOfTejass, firstPost: posts[0] },
    // 🤫 shhh... this is Next.js' incremental SSG feature. It's still in beta,
    // please don't share 😄.
    // We are incrementally rebuilding this page so that the random name seen
    // by the visiting user changes.
    revalidate: true,
  };
}

export default App;
