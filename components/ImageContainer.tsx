import styled from "@emotion/styled";

const ImageContainer = styled.figure`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid;
  border-color: #0002;
  text-align: center;

  figcaption {
    font-size: 13px;
    font-style: italic;
    color: #555;
    margin-top: 4px;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #fff1;
    figcaption {
      color: #ccc;
    }
  }
`;

export default ImageContainer;
