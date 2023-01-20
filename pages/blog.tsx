import { title } from "case";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import BlogMeta from "../components/BlogMeta";
import Card from "../components/Card";
import ReadingTime from "../components/ReadingTime";
import Title from "../components/Title";
import styles from "../styles/blog.module.scss";
import { getInitialBlogPosts, Post } from "../util/getInitialBlogPosts";

const Blog = ({ posts }: { posts: Post[] }) => (
  <>
    <Head>
      <title>Blog : Tejas Kumar | Speaker, Engineer, JavaScript, Love</title>
      <meta
        name="description"
        content="Personal blog of Tejas Kumar – an award-winning web developer and international speaker."
      />
    </Head>
    <Title
      style={{
        zIndex: -1,
        position: "absolute",
        transform: "translateY(-50%)",
      }}
      color="#0002"
      length={4}
    >
      BLOG BLOG BLOG BLOG
    </Title>
    <div className={styles.container}>
      {posts &&
        posts.map(post => (
          <Link
            key={post.title}
            href="/blog/[post]"
            as={`/blog/${encodeURI(post.slug)}`}
          >
            <Card className={styles.blogCard}>
              <h2>{title(post.title)}</h2>
              <BlogMeta>
                <ReadingTime text={post.body} />
              </BlogMeta>
              <ReactMarkdown>{post.excerpt}</ReactMarkdown>
              <p>
                <a href={`/blog/${encodeURI(post.slug)}`}>Keep reading... 👉🏾</a>
              </p>
            </Card>
          </Link>
        ))}
    </div>
  </>
);

export async function getStaticProps() {
  return { props: await getInitialBlogPosts() };
}

export default Blog;
