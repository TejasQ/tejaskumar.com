import styled from "@emotion/styled";

const Card = styled.div<{ center?: boolean }>`
  max-width: 768px;
  border-radius: 4px;
  box-shadow: 0 6px 8px #0001;
  padding: 24px;
  backdrop-filter: blur(20px);
  transition: box-shadow 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  z-index: 2;
  background-color: #fff;
  border: 1px solid #0002;
  color: #444;

  ${({ center }) => {
    if (center) {
      return `display: grid; align-items: center; justify-content: center;text-align: center;`;
    }
    return "";
  }}
  :hover {
    transform: translateY(-4px);
    background-color: #fff1;
    box-shadow: 0 12px 32px #0003;
  }

  h2 {
    font-size: 24px;
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #0002;
    border: 1px solid #fff2;
    box-shadow: 0 6px 8px #0003;
    color: white;
    :hover {
      box-shadow: 0 12px 32px #0006;
    }
  }
`;

export default Card;
