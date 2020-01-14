import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import fetch from "node-fetch";

import BlogPost from "../../components/BlogPost";
import Breadcrumb from "../../components/Breadcrumb";
import { title } from "case";

type Post = {
  content: string;
  slug: string
};

const BlogPostPage = ({ post, slug }: { post: Post; slug: string }) => {
  return (
    post && (
      <BlogPost>
        <Head>
          <title>
            {title(post.content.split("\n")[0].replace("# ", ""))} : Tejas Kumar | Speaker, Engineer, JavaScript, Love
          </title>
          <meta name="description" content={post.content.split("\n")[2]} />
        </Head>
        <Breadcrumb
          path={[{ label: "tejaskumar.com", link: "/" }, { label: "blog", link: "/blog" }, { label: post.slug }]}
        ></Breadcrumb>
        <ReactMarkdown escapeHtml={false} source={post.content}></ReactMarkdown>
      </BlogPost>
    )
  );
};

BlogPostPage.getInitialProps = async ({ query }: any) => {
  const content = await fetch(
    `https://raw.githubusercontent.com/TejasQ/tejaskumar.com/master/blog/${query.post}.md`,
  ).then(r => r.text());

  return { post: { content, slug: query.post } };
};

export default BlogPostPage;
