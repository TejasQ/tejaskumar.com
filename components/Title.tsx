import React, { ReactNode } from "react";
import styles from "./Title.module.css";

export default function Title({
  length,
  color,
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  length: number;
  color?: string;
  children?: ReactNode;
}) {
  return (
    <h1
      {...rest}
      className={styles.title}
      style={{
        fontSize: `${length > 9 ? 12 : 17}vw`,
        color: color || "inherit",
        ...rest.style,
      }}
    >
      {children}
    </h1>
  );
}
