import React, { FC } from "react";
import readingTime from "reading-time";
import BlogMeta from "./BlogMeta";
import EmojiContainer from "./EmojiContainer";

const ReadingTime: FC<{ text: string }> = ({ text }) => {
  const readingTimeForThisPost = readingTime(text);

  return (
    <BlogMeta>
      <EmojiContainer>
        {"☕️".repeat(Math.ceil(readingTimeForThisPost.minutes / 15))}
      </EmojiContainer>
      {readingTimeForThisPost.text}
    </BlogMeta>
  );
};

export default ReadingTime;
