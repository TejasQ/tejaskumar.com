import React, { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & { children?: ReactNode }) {
  return (
    <span {...rest} className={styles.span}>
      {children}
    </span>
  );
}
