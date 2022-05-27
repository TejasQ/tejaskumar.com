import { readFileSync } from "fs";
import { GetStaticProps } from "next";
import { tmpdir } from "os";
import { join } from "path";
import { FC } from "react";
import ReactPlayer from "react-player";
import { Plock } from "react-plock";
import { Tweet } from "react-static-tweets";

import Title from "../components/Title";

import styles from "../styles/talks.module.scss";
import { talks } from "../util/talks";

type Props = {
  testimonials: string[];
  talks: { name: string; url: string }[];
};

const Talks: FC<Props> = ({ testimonials, talks }) => {
  return (
    <div className={styles.talks}>
      <Title length={50}>Talks</Title>
      <h2>
        So far, I've spoken at {talks.length} conferences over 10 years. Scroll
        down to see what people are saying. Scroll sideways to see more
        conferences.
      </h2>
      <div className={styles.talk}>
        {talks.map(t => (
          <div className={styles.videoPlayer}>
            <ReactPlayer width="100%" height="100%" url={t.url} />
          </div>
        ))}
      </div>
      <div className={styles.testimonials}>
        <Title length={22} className={styles.title}>
          What People Are Saying
        </Title>
        <div className={styles.tweets}>
          <Plock>
            {testimonials.map(url => (
              <div key={url}>
                <Tweet
                  id={url
                    .split("/")
                    .slice(-1)
                    .join("")}
                />
              </div>
            ))}
          </Plock>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const testimonials = JSON.parse(
    readFileSync(join(tmpdir(), "twitter-people.json"), "utf-8")
  );

  return {
    props: {
      talks,
      testimonials: testimonials
        .map((t: any) => t.tweet)
        .slice(0, 25)
        .map((value: any) => ({ value, sort: Math.random() }))
        .sort((a: any, b: any) => a.sort - b.sort)
        .map(({ value }: any) => value),
    },
    revalidate: true,
  };
};

export default Talks;
