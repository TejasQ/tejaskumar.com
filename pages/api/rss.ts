import { NextApiRequest, NextApiResponse } from 'next'
import { title } from 'case';

import { getInitialBlogPosts, Post } from '../../util/getInitialBlogPosts';

const getRssXml = (blogPosts: Post[]) => {
  const rssItemsXml = blogPosts.map(post => {
    const permalink = `https://tejaskumar.com/blog/${post.slug}`;
      return `
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

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  if (!res) {
    return;
  }
  const { posts } = await getInitialBlogPosts();

  res.setHeader("Content-Type", "text/xml");
  res.write(getRssXml(posts));
  res.end();
}
