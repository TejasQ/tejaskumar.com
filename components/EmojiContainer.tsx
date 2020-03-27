import React, { ReactNode } from "react";
import styles from "./EmojiContainer.module.css";

export default function EmojiContainer({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & { children?: ReactNode }) {
  return (
    <span {...rest} className={styles.container}>
      {children}
    </span>
  );
}
