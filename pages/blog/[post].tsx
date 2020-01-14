import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import fetch from "node-fetch";

import BlogPost from "../../components/BlogPost";
import Breadcrumb from "../../components/Breadcrumb";
import { title } from "case";
import ContentSeparator from "../../components/ContentSeparator";
import BlogAttribution from "../../components/BlogAttribution";

type Post = {
  content: string;
  slug: string
};

const BlogPostPage = ({ post, blogPostUrl }: { post: Post; blogPostUrl: string }) => {
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
        <ContentSeparator />
        <BlogAttribution url={blogPostUrl} />
      </BlogPost>
    )
  );
};

BlogPostPage.getInitialProps = async ({ query, req }: any) => {
  const content = await fetch(
    `https://raw.githubusercontent.com/TejasQ/tejaskumar.com/master/blog/${query.post}.md`,
  ).then(r => r.text());
  return { post: { content, slug: query.post }, blogPostUrl: `https://${req.headers.host}/${req.url}` };
};

export default BlogPostPage;
