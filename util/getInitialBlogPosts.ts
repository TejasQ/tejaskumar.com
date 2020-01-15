import fetch from "node-fetch";

export type Posts = {
  title: string;
  excerpt: string;
  body: string;
}[];

export const getInitialBlogPosts = async () => {
  const posts: Promise<Posts> = await fetch("https://api.github.com/graphql", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    method: "POST",
    body: JSON.stringify({
      query: `{
            repository(name: "tejaskumar.com", owner: "TejasQ") {
                object(expression: "master:blog") {
                ... on Tree {
                    entries {
                    name
                    object {
                        ... on Blob {
                        text
                        }
                    }
                    }
                }
                }
            }
        }
            `,
    }),
  })
    .then(r => r.json())
    .then(r =>
      r.data.repository.object.entries.reverse().map((e: { name: string; object: { text: string } }) => ({
        title: e.name.replace(".md", ""),
        body: e.object.text,
        excerpt:
          e.object.text
            .split("\n")
            .slice(1)
            .join("\n")
            .slice(0, 260) + "...",
      })),
    );

  return { posts };
};
