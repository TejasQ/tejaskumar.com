import React, { useState, useEffect } from "react";

type Posts = {
  title: string;
  excerpt: string;
}[];

export const useBlog = () => {
  const [posts, setPosts] = useState<Posts | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/graphql", {
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
        setPosts(
          r.data.repository.object.entries.reverse().map(e => ({
            title: e.name.replace(".md", ""),
            excerpt:
              e.object.text
                .split("\n")
                .slice(1)
                .join("\n")
                .slice(0, 260) + "...",
          })),
        ),
      );
  }, []);

  return posts;
};
