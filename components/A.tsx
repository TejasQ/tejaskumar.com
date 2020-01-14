import styled from "@emotion/styled";

const A = styled.a<{ size?: number; color?: string }>`
  display: block;
  text-decoration: none !important;
  color: ${({ color }) => color || "black"} !important;
  font-size: ${({ size }) => `${size}px` || "inherit"};
  transition: 0.3s transform ease, 0.3s margin ease;

  @media (prefers-color-scheme: dark) {
    color: ${({ color }) => color || "white"} !important;
  }

  @media (hover: hover) {
    :hover {
      text-decoration: underline;
      transform: translateY(8px) scale(1.5);
      margin: 0 16px;
    }
  }
`;

export default A;
