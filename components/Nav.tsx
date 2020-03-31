import React, { ReactNode } from "react";
import styles from "./Nav.module.css";

export default function Nav({
  children,
  ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  children?: ReactNode;
}) {
  return (
    <nav {...rest} className={styles.nav}>
      {children}
    </nav>
  );
}
