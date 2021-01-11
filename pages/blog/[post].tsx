import { title } from "case";
import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import path from "path";
import React from "react";
import ReactMarkdown from "react-markdown";
import BlogAttribution from "../../components/BlogAttribution";
import BlogMeta from "../../components/BlogMeta";
import BlogPost from "../../components/BlogPost";
import Breadcrumb from "../../components/Breadcrumb";
import ContentSeparator from "../../components/ContentSeparator";
import ImageContainer from "../../components/ImageContainer";
import ReadingTime from "../../components/ReadingTime";
import { getBlogPostTitleFromFileName } from "../../util/getBlogPostTitleFromFileName";

type Post = {
  content: string;
  slug: string;
};

const BlogPostPage = ({
  post,
  blogPostUrl,
}: {
  post: Post;
  blogPostUrl: string;
}) => {
  const heading = post.content.split("\n")[0].replace("# ", "");
  const body = post.content
    .split("\n")
    .slice(1)
    .join("\n");

  return (
    post && (
      <BlogPost>
        <Head>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@tejaskumar_" />
          <meta
            name="twitter:title"
            content={title(post.content.split("\n")[0].replace("# ", ""))}
          />
          <meta
            name="twitter:description"
            content={post.content.split("\n")[2]}
          />
          {body
            .match(/<meta name="(.*)" content="(.*)" \/>/gim)
            ?.map(r => r.match(/<meta name="(.*)" content="(.*)" \/>/im))
            .map(m => m && <meta name={m[1]} content={m[2]} />) ?? null}
          <title>
            {title(post.content.split("\n")[0].replace("# ", ""))} : Tejas Kumar
            | Speaker, Engineer, JavaScript, Love
          </title>
          <link
            rel="canonical"
            href={`https://tej.as/blog/${post.slug}`}
          ></link>
          <meta name="description" content={post.content.split("\n")[2]} />
        </Head>
        <Breadcrumb
          path={[
            { label: "tejaskumar.com", link: "/", local: true },
            { label: "blog", link: "/blog", local: true },
            { label: getBlogPostTitleFromFileName(post.slug) },
          ]}
        ></Breadcrumb>
        <h1>{title(heading)}</h1>
        <BlogMeta>
          <ReadingTime text={body} />
        </BlogMeta>
        <ReactMarkdown
          renderers={{
            image: ({ alt, src }: { alt: string; src: string }) => {
              return (
                <ImageContainer>
                  <img alt={alt} src={src}></img>
                  <figcaption>{alt}</figcaption>
                </ImageContainer>
              );
            },
          }}
          escapeHtml={false}
          source={body}
        ></ReactMarkdown>
        <ContentSeparator />
        <BlogAttribution url={blogPostUrl} />
      </BlogPost>
    )
  );
};

export const getStaticPaths: GetStaticPaths = async function() {
  const blogPosts = fs.readdirSync(path.resolve("./blog/"));
  return {
    paths: blogPosts.map(p => ({
      params: {
        post: p.replace(/\.md$/, ""),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async function({ params }) {
  const { post } = params!;
  const content = fs.readFileSync(
    path.resolve("./blog/", (post as string).concat(".md")),
    "utf8"
  );
  return {
    props: {
      post: { content, slug: post },
      blogPostUrl: `https://tejaskumar.com/blog/${encodeURI(post as string)}`,
    },
  };
};

export default BlogPostPage;
