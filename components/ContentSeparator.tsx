import React from "react";
import styles from "./ContentSeparator.module.css";

const ContentSeparator = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => (
  <div {...props} className={styles.div}>
    ❤️🔥💞🙌🏽🤝🎉
  </div>
);

export default ContentSeparator;
