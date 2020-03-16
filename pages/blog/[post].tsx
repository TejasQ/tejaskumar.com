import React from "react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import fetch from "node-fetch";

import BlogPost from "../../components/BlogPost";
import BlogMeta from "../../components/BlogMeta";
import Breadcrumb from "../../components/Breadcrumb";
import { title } from "case";
import ContentSeparator from "../../components/ContentSeparator";
import BlogAttribution from "../../components/BlogAttribution";
import ReadingTime from "../../components/ReadingTime";
import { getBlogPostTitleFromFileName } from "../../util/getBlogPostTitleFromFileName";
import ImageContainer from "../../components/ImageContainer";

type Post = {
  content: string;
  slug: string
};

const BlogPostPage = ({ post, blogPostUrl }: { post: Post; blogPostUrl: string }) => {
  const heading = post.content.split('\n')[0].replace('# ', '')
  const body = post.content.split('\n').slice(1).join('\n')

  return (
    post && (
      <BlogPost>
        <Head>
          {body.match(/<meta name="(.*)" content="(.*)" \/>/gmi)?.map(r => r.match(/<meta name="(.*)" content="(.*)" \/>/mi)).map((m) => m&& (<meta name={m[1]} content={m[2]} />) ) ?? null}
          <title>
            {title(post.content.split("\n")[0].replace("# ", ""))} : Tejas Kumar | Speaker, Engineer, JavaScript, Love
          </title>
          <meta name="description" content={post.content.split("\n")[2]} />
        </Head>
        <Breadcrumb
          path={[{ label: "tejaskumar.com", link: "/" }, { label: "blog", link: "/blog" }, { label: getBlogPostTitleFromFileName(post.slug) }]}
        ></Breadcrumb>
        <h1>{title(heading)}</h1>
        <BlogMeta>
          <ReadingTime text={body} />
        </BlogMeta>
        <ReactMarkdown renderers={
          {
            image: ({alt,src}: {alt:string,src:string}) => {
              return <ImageContainer><img alt={alt} src={src}></img><figcaption>{alt}</figcaption></ImageContainer>
            }
          }
        } escapeHtml={false} source={body}></ReactMarkdown>
        <ContentSeparator />
        <BlogAttribution url={blogPostUrl} />
      </BlogPost>
    )
  );
};

BlogPostPage.getInitialProps = async ({ query, req, res }: any) => {
  if (!query.post.includes("__")) { 
    if(query.post.includes("bicycle")) {
      // It's the first blog post that isn't a placeholder. Redirect.
      res.writeHead(301, { Location: "/blog/1579078596000__what-i-learned-from-getting-pushed-off-my-bicycle" });
      res.end()
      return;
    }

    res.writeHead(302, { Location: "/blog"})
}
  const content = await fetch(
    `https://raw.githubusercontent.com/TejasQ/tejaskumar.com/${process.env.BRANCH || "master"}/blog/${query.post}.md`,
  ).then(r => r.text());
  return { post: { content, slug: query.post }, blogPostUrl: `https://${req.headers.host}/${req.url}` };
};

export default BlogPostPage;
