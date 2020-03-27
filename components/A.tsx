import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import styles from "./A.module.css";

export default function A({
  color,
  size,
  children,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  color?: string;
  size?: number;
  children?: ReactNode;
}) {
  return (
    <a
      {...rest}
      className={styles.a}
      style={{
        ...(color ? { color } : undefined),
        fontSize: size ? size : "inherit",
      }}
    >
      {children}
    </a>
  );
}
