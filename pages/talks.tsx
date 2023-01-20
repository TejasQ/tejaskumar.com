import { GetStaticProps } from "next";
import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Plock } from "react-plock";
import { Tweet } from "react-static-tweets";
import Head from "next/head";
import { fetchTweetAst } from "static-tweets";

import Title from "../components/Title";

import styles from "../styles/talks.module.scss";
import { getIdFromTweetUrl } from "../util/getIdFromTweetUrl";
import { randomizeArray } from "../util/randomizeArray";
import { talks } from "../util/talks";
import { XataClient } from "../util/xata";
import { Button } from "../components/Button";

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
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tejaskumar_" />
        <meta name="twitter:creator" content="@tejaskumar_" />
        <meta name="twitter:title" content="Talks by Tejas Kumar" />
        <meta
          name="twitter:description"
          content="An aggregation of all of Tejas' talks and feedback about them."
        />
        <meta name="og:title" content="Talks by Tejas Kumar" />
        <meta
          name="og:description"
          content="An aggregation of all of Tejas' talks and feedback about them."
        />
        <meta
          property="og:image"
          content="https://tej.as/img/talks-og-image.jpg"
        />
        <meta
          property="twitter:image"
          content="https://tej.as/img/talks-og-image.jpg"
        />
        <title>Talks : Tejas Kumar | Speaker, Engineer, JavaScript, Love</title>
        <link rel="canonical" href="https://tej.as/talks"></link>
        <meta
          name="description"
          content="An aggregation of all of Tejas' talks and feedback about them."
        />
      </Head>
      <Title length={50}>Talks</Title>
      <h2>
        So far, I've spoken at{" "}
        <strong>
          {talks.length} conferences, meetups, and podcasts over 10 years
        </strong>
        . Scroll down to see what people are saying. Scroll sideways to see more
        conferences.
      </h2>
      <Button
        onClick={() => {
          window.open(
            "mailto:tejas+speaking@tejas.qa?subject=Invitation to speak at my event&body=Hi, I'd love it if you spoke at my event [...]"
          );
        }}
      >
        Invite me to speak at your event &rarr;
      </Button>
      <div className={styles.talkScrollContainer}>
        {talks.map(t => (
          <div key={t.url} className={styles.videoPlayer}>
            <ReactPlayer controls width="100%" height="100%" url={t.url} />
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
    .getMany({ pagination: { size: 25 } });

  const tweetIds = testimonials.map(t => {
    const id = getIdFromTweetUrl(String(t.tweet_url));
    if (t.ast === '""') {
      console.log("No AST for", t.tweet_url, ". Adding...");
      fetchTweetAst(id)
        .then(ast => {
          if (!ast) {
            console.log("Couldn't get AST");
            return;
          }
          client.db.testimonials.update(t.id, {
            ast: JSON.stringify(ast),
          });
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
