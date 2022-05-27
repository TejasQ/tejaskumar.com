import { GetStaticProps } from "next";
import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Plock } from "react-plock";
import { Tweet } from "react-static-tweets";
import { fetchTweetAst } from "static-tweets";

import Title from "../components/Title";

import styles from "../styles/talks.module.scss";
import { getIdFromTweetUrl } from "../util/getIdFromTweetUrl";
import { randomizeArray } from "../util/randomizeArray";
import { talks } from "../util/talks";
import { XataClient } from "../util/xata";

type Props = {
  initialTestimonials: { id: string; ast: string }[];
  talks: { name: string; url: string }[];
};

const Talks: FC<Props> = ({ initialTestimonials, talks }) => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const $end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!$end.current) {
      return;
    }

    const onIntersect: IntersectionObserverCallback = e => {
      if (e[0].isIntersecting) {
        fetch(`/api/testimonials?from=${testimonials.length}`)
          .then(r => r.json())
          .then(d => setTestimonials([...testimonials, ...d]));
      }
    };
    const observer = new IntersectionObserver(onIntersect);
    observer.observe($end.current);

    return () => observer.disconnect();
  }, [testimonials.length]);

  return (
    <div className={styles.talks}>
      <Title length={50}>Talks</Title>
      <h2>
        So far, I've spoken at {talks.length} conferences over 10 years. Scroll
        down to see what people are saying. Scroll sideways to see more
        conferences.
      </h2>
      <div className={styles.talkScrollContainer}>
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
            {testimonials.map(tweet => (
              <div key={tweet.id}>
                <Tweet ast={tweet.ast} id={tweet.id} />
              </div>
            ))}
          </Plock>
          <div
            ref={$end}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
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

  const tweetIds = testimonials.map(t => {
    const id = getIdFromTweetUrl(String(t.tweet_url));
    if (!t.ast) {
      fetchTweetAst(id)
        .then(ast => {
          if (!ast) return;
          client.db.testimonials
            .filter({ tweet_url: t.tweet_url })
            .getOne()
            .then(result =>
              client.db.testimonials.update(result!.id, {
                ast: JSON.stringify(ast),
              })
            );
        })
        .catch(() => {});
    }
    return {
      ast: t.ast ? JSON.parse(t.ast) : null,
      id,
    };
  });

  return {
    props: {
      talks,
      initialTestimonials: randomizeArray(tweetIds),
    },
    revalidate: true,
  };
};

export default Talks;
