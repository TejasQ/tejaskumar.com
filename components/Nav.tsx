import styled from "@emotion/styled";

export const navHeight = 50;

const Nav = styled.nav`
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 14px;
  letter-spacing: 1px;
  height: ${navHeight}px;
  display: flex;
  top: 0;
  background: #fffd;
  backdrop-filter: blur(10px);
  z-index: 100;

  ul {
    padding: 0;
    margin: 0 auto;
    justify-content: center;
    list-style-type: none;
    display: flex;
    align-items: center;
  }

  li + li {
    margin-left: 16px;
  }

  @media (prefers-color-scheme: dark) {
    background: #0003;
  }
`;

export default Nav;
