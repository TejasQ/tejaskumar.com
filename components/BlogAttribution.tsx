import React from "react";
import styles from "./BlogAttribution.module.css";

const BlogAttribution = ({
  url,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { url: string }) => (
  <div {...rest} className={styles.container}>
    <div>
      <img
        alt="Tejas' Face"
        src="https://pbs.twimg.com/profile_images/1210680744407908353/5bTFS_QO_400x400.jpg"
      />
    </div>
    <div>
      <p>
        Tejas has a special love for humans and code that sometimes finds its
        way onto this blog and other parts of the internet. Say hi on{" "}
        <a
          href="https://twitter.com/tejaskumar_"
          rel="noopener"
          target="_blank"
        >
          twitter
        </a>
        !
        <br />
        <br />
        If you particularly enjoyed this post, consider{" "}
        <a
          href={`https://twitter.com/share?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(
            "I just read this article by @tejaskumar_ and I would love to share it with you!"
          )}`}
          rel="noopener"
          target="_blank"
        >
          sharing it
        </a>
        .
      </p>
    </div>
  </div>
);

export default BlogAttribution;
