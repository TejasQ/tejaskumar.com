import styled from "@emotion/styled";

const BlogPost = styled.div`
  margin: 0 auto;
  max-width: 768px;
  padding: 0 16px;
  font-family: Georgia, serif;
  font-size: 18px;
  backdrop-filter: blur(20px);
  border-top: 1px solid #fff2;
  border-left: 1px solid #fff2;
  border-right: 1px solid #fff2;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  img {
    max-width: 100%;
  }

  table {
    border-collapse: collapse;
  }

  th {
    background: #fff;
  }

  th,
  td {
    border: 1px solid #0003;
    padding: 8px;
  }

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
    th {
      background: #0005;
    }

    th,
    td {
      border: 1px solid #0005;
    }
  }

  @media (min-width: 768px) and (prefers-color-scheme: dark) {
    margin: 114px auto 0;
  }
`;

export default BlogPost;
