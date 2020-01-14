import React, { FC, Fragment } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    font-size: 14px;
    letter-spacing: 1px;
  }
`;

const Separator = styled.span`
  margin: 0 8px;
`;

const Breadcrumb: FC<{ path: Array<{ label: string; link?: string }> }> = ({
  path
}) => {
  return (
    <Container>
      {path.map((part, index) =>
        part.link ? (
          <Fragment key={part.link}>
            <a href={part.link}>{part.label}</a>
            {index < path.length - 1 && <Separator>/</Separator>}
          </Fragment>
        ) : (
          part.label
        )
      )}
    </Container>
  );
};

export default Breadcrumb;
