import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { title } from "case";
import styled from "@emotion/styled";
import Head from "next/head";

import Card from "../components/Card";
import { useBlog } from "../hooks/useBlog";
import Title from "../components/Title";

const Container = styled.div`
  max-width: 768px;
  display: grid;
  gap: 16px;
  padding: 16px;

  @media (min-width: 768px) {
    margin: 100px auto;
  }
`;

const Blog = ({ blogPosts }) => {
  const posts = useBlog();

  return (
    <>
      <Head>
        <title>Blog : Tejas Kumar | Speaker, Engineer, JavaScript, Love</title>
      </Head>
      <Title color="#0002" length={4}>
        BLOG BLOG BLOG BLOG
      </Title>
      <Container>
        {posts &&
          posts.map(post => (
            <Link key={post.title} href={`/blog/${post.title}`}>
              <Card>
                <h2>{title(post.title)}</h2>
                <ReactMarkdown source={post.excerpt} />
                <a href={`/blog/${post.title}`}>Keep reading... 👉🏾</a>
              </Card>
            </Link>
          ))}
      </Container>
    </>
  );
};

export default Blog;
