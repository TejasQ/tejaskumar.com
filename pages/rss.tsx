import React from "react";
import { NextPageContext } from "next";
import { title } from "case";

import { getInitialBlogPosts, Post } from "../util/getInitialBlogPosts";

const getRssXml = (blogPosts: Post[]) => {
  let rssItemsXml = "";
  blogPosts.forEach(post => {
    const permalink = `https://tejaskumar.com/blog/${post.slug}`
    rssItemsXml += `
      <item>
        <title>${title(post.body.split("\n")[0].replace("# ", ""))}</title>
        <link>${permalink}</link>

        <description>
        <![CDATA[${post.body}]]>
        </description>
        <author>tejas@tejas.qa (Tejas Kumar)</author>
        <guid>${permalink}</guid>
    </item>`;
  });
  return `<?xml version="1.0" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
          <title>Blog by Tejas Kumar</title>
          <link>https://tejaskumar.com</link>
          <description>Personal blog of Tejas Kumar – an award-winning web developer and international speaker.</description>
          <language>en</language>
          <atom:link href="https://tejaskumar.com/rss" rel="self" type="application/rss+xml" />
          ${rssItemsXml}
      </channel>
    </rss>`;
};

class Rss extends React.Component {
  static async getInitialProps({ res }: NextPageContext) {
    if (!res) {
      return;
    }
    const { posts } = await getInitialBlogPosts();
    res.setHeader("Content-Type", "text/xml");
    res.write(getRssXml(posts));
    res.end();
  }

  render() {
    return null;
  }
}


export default Rss;
