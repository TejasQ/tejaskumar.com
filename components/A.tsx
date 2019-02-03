import styled from "@emotion/styled";

const A = styled.a`
  text-decoration: none;
  color: ${({ color }) => color || "black"};

  :hover {
    text-decoration: underline;
  }
`;

export default A;
