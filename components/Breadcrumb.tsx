import Link from "next/link";
import React, { FC, Fragment } from "react";
import styles from "./Breadcrumb.module.css";

const Breadcrumb: FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  path: Array<
    { label: string } | { label: string; link: string; local: boolean }
  >;
}> = ({ path, ...rest }) => {
  return (
    <div {...rest} className={styles.container}>
      {path.map((part, index) =>
        "link" in part ? (
          <Fragment key={part.link}>
            <Link href={part.link}>
              <a>{part.label}</a>
            </Link>
            {index < path.length - 1 && (
              <span className={styles.separator}>/</span>
            )}
          </Fragment>
        ) : (
          part.label
        )
      )}
    </div>
  );
};

export default Breadcrumb;
