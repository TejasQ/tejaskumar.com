import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { title } from "case";
import styled from "@emotion/styled";
import Head from "next/head";

import Card from "../components/Card";
import BlogMeta from "../components/BlogMeta";
import Title from "../components/Title";
import { Posts, getInitialBlogPosts } from "../util/getInitialBlogPosts";
import ReadingTime from "../components/ReadingTime";

const Container = styled.div`
  max-width: 768px;
  display: grid;
  gap: 16px;
  padding: 16px;

  @media (min-width: 768px) {
    margin: 100px auto;
  }
`;

const BlogCard = styled(Card)`
  p {
    font-family: Georgia, serif;
  }
`;

const Blog = ({ posts }: { posts: Posts }) => (
  <>
    <Head>
      <title>Blog : Tejas Kumar | Speaker, Engineer, JavaScript, Love</title>
      <meta
        name="description"
        content="Personal blog of Tejas Kumar – an award-winning web developer and international speaker."
      />
    </Head>
    <Title color="#0002" length={4}>
      BLOG BLOG BLOG BLOG
    </Title>
    <Container>
      {posts &&
        posts.map(post => (
          <Link key={post.title} href={`/blog/${post.title}`}>
            <BlogCard>
              <h2>{title(post.title)}</h2>
              <BlogMeta>
                <ReadingTime text={post.body} />
              </BlogMeta>
              <ReactMarkdown source={post.excerpt} />
              <a href={`/blog/${post.title}`}>Keep reading... 👉🏾</a>
            </BlogCard>
          </Link>
        ))}
    </Container>
  </>
);

Blog.getInitialProps = getInitialBlogPosts;

export default Blog;
