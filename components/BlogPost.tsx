import styled from "@emotion/styled";

import { navHeight } from "./Nav";

const BlogPost = styled.div`
  margin: 0 auto;
  max-width: 768px;
  padding: 0 16px;
  font-family: Georgia, serif;
  font-size: 18px;
  height: calc(100vh - ${navHeight}px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  backdrop-filter: blur(20px);
  border-top: 1px solid #fff2;
  border-left: 1px solid #fff2;
  border-right: 1px solid #fff2;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  h2 {
    margin-top: 40px;
    ::after {
      content: "";
      display: block;
      height: 1px;
      background: #ccc;
      margin-top: 4px;
    }
  }

  @media (min-width: 768px) {
    padding: 16px;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0002;
    box-shadow: 0 12px 32px #0006;

    h2::after {
      background: #fff2;
    }
  }
`;

export default BlogPost;
