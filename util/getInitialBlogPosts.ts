import fs from "fs";
import { getBlogPostTitleFromFileName } from "./getBlogPostTitleFromFileName";

export type Post = {
  title: string;
  excerpt: string;
  body: string;
  slug: string;
};

// @ts-ignore
const path = __non_webpack_require__("path");

export async function getInitialBlogPosts(): Promise<{ posts: Post[] }> {
  const blogPosts = fs
    .readdirSync(path.resolve("./blog/"))
    .filter(e => e.endsWith(".md"))
    .sort()
    .reverse();

  return {
    posts: blogPosts.map(name => {
      const content = fs.readFileSync(path.resolve("./blog/", name), "utf8");
      const excerpt = content
      .split("\n")[2];
      return {
        title: getBlogPostTitleFromFileName(name),
        body: content,
        slug: name.replace(/\.md$/, ""),
        excerpt:
          excerpt.length > 260 ? excerpt
          .slice(0, 260) + "..." : excerpt,
      };
    }),
  };
}
