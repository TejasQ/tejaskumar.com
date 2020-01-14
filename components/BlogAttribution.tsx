import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 150px auto;
    gap: 32px;
  }
`;

const Image = styled.img`
  width: 150px;
  border-radius: 50%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const BlogAttribution = ({ url }: { url: string }) => (
  <Container>
    <div>
      <Image alt="Tejas' Face" src="https://pbs.twimg.com/profile_images/1210680744407908353/5bTFS_QO_400x400.jpg" />
    </div>
    <div>
      <p>
        Tejas has a special love for humans and code that sometimes finds its way onto this blog and other parts of the
        internet. Say hi on{" "}
        <a href="https://twitter.com/tejaskumar_" rel="noopener" target="_blank">
          twitter
        </a>
        !
        <br />
        <br />
        If you particularly enjoyed this post, consider{" "}
        <a
          href={`https://twitter.com/share?url=${url}&text=I just read this article by @tejaskumar_ and I would love to share it with you!`}
          rel="noopener"
          target="_blank"
        >
          sharing it
        </a>
        .
      </p>
    </div>
  </Container>
);

export default BlogAttribution;
