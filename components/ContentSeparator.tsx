import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto max-content auto;
  gap: 16px;
  width: 100%;
  height: 40px;
  text-align: center;
  align-items: center;
  margin: 32px auto;

  ::before,
  ::after {
    content: "";
    width: 100%;
    height: 1px;
    background: #0003;

    @media (prefers-color-scheme: dark) {
      background: #fff3;
    }
  }
`;

const ContentSeparator = () => <Container>❤️🔥💞🙌🏽🤝🎉</Container>;

export default ContentSeparator;
