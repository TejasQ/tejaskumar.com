import { GetStaticProps } from "next";
import { FC } from "react";
import ReactPlayer from "react-player";
import { Plock } from "react-plock";
import { Tweet } from "react-static-tweets";
import { fetchTweetAst } from "static-tweets";

import Title from "../components/Title";

import styles from "../styles/talks.module.scss";
import { talks } from "../util/talks";
import { XataClient } from "../util/xata";

type Props = {
  testimonials: { id: string; ast: string }[];
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
          <div key={t.url} className={styles.videoPlayer}>
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
            {testimonials.map(t => (
              <div key={t.id}>
                <Tweet ast={t.ast} id={t.id} />
              </div>
            ))}
          </Plock>
        </div>
      </div>
    </div>
  );
};

const client = new XataClient();
export const getStaticProps: GetStaticProps<Props> = async () => {
  const testimonials = await client.db.testimonials
    .sort("followers", "desc")
    .getMany({ page: { size: 25 } });

  const tweetIds = await Promise.all(
    testimonials.map(async (t: any) => {
      const id = t.tweet_url
        .split("/")
        .slice(-1)
        .join("");

      const ast = await fetchTweetAst(id)
        .then(ast => ast)
        .catch(() => {});

      return {
        ast,
        id,
      };
    })
  );

  return {
    props: {
      talks,
      testimonials: tweetIds
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    },
    revalidate: true,
  };
};

export default Talks;
