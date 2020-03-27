import React, { ReactNode } from "react";
import styles from "./Card.module.css";

export default function Card({
  center,
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  center?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      {...rest}
      className={
        styles.card +
        (center ? " " + styles.center : "") +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
}
