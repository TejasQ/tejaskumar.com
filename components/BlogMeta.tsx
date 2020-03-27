import React, { ReactNode } from "react";
import styles from "./BlogMeta.module.css";

export default function BlogMeta({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { children?: ReactNode }) {
  return (
    <div {...rest} className={styles.div}>
      {children}
    </div>
  );
}
