import React, { ReactNode } from "react";
import styles from "./ImageContainer.module.css";

export default function ImageContainer({
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  children?: ReactNode;
}) {
  return (
    <figure {...rest} className={styles.figure}>
      {children}
    </figure>
  );
}
