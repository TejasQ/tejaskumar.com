import styled from "@emotion/styled";

const Nav = styled.nav`
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 14px;
  letter-spacing: 1px;

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
`;

export default Nav;
