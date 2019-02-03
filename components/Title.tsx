import styled from "@emotion/styled";

const Title = styled.h1<{ length: number }>`
  font-size: ${({ length }) => (length > 9 ? 12 : 17)}vw;
  font-weight: 400;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  z-index: -1;
  line-height: 1;
  text-align: center;
`;

export default Title;
