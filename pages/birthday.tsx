import Head from "next/head";
import { BirthdayForm } from "../components/BirthdayForm";

const BirthdayPage = () => {
  return (
    <div
      style={{
        width: "100vw",
        padding: "3rem 1rem",
        maxWidth: "1024px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <h1>You're Invited!</h1>
      <p>
        This year as I turn 30, I'm hosting a church service to celebrate my
        birthday. This is not just for Christians, but for open-minded everyday
        thinking people. Berlin is one of the{" "}
        <a
          href="https://www.dw.com/en/berlin-capital-of-loneliness/a-50867492"
          target="_blank"
        >
          loneliest
        </a>{" "}
        cities on the planet, and the goal is to create a thriving community
        where people from all backgrounds and lifestyles can respectfully
        connect, discuss, learn, grow, and have fun together.
      </p>
      <h2>Good to Know</h2>
      <ul>
        <li>
          My birthday is on February 19th. If you didn't already know this, I'm
          not sure we're friends.
        </li>
        <li>
          It's at{" "}
          <a href="https://goo.gl/maps/QsgEG2rPtivdCxdKA" target="_blank">
            Kastanienallee 71
          </a>
          , and you'll get the time by email if you sign up below.
        </li>
        <li>
          This is <em>not</em> religious. Religion has caused many problems
          around the world including wars and genocide, and has been abused for
          fear and control.
        </li>
        <li>
          This is really just an exploration of life, meaning, and purpose
          together based on Biblical ideas like "
          <span className="red">love your neighbor as yourself</span>" and "
          <span className="red">
            do unto others as you would have others do unto you
          </span>
          ".{" "}
        </li>
        <li>This is for literally everyone. Feel free to invite 10 friends.</li>
        <li>
          We will look at the Bible together openly and respectfully to figure
          stuff out. If that's offputting to you, feel free to skip this one.
        </li>
      </ul>
      <h2>The Schedule</h2>
      <table>
        <tr>
          <td>
            <em>begin</em>
          </td>
          <td>People arrive</td>
        </tr>
        <tr>
          <td>
            <em>30 min</em>
          </td>
          <td>Chit chat, snacks, get to know each other</td>
        </tr>
        <tr>
          <td>
            <em>15 min</em>
          </td>
          <td>
            ~15 minute talk from me
            <br />
            <span className="meta">
              about the past 30 years and this church idea
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <em>15 min</em>
          </td>
          <td>
            Music
            <br />
            <span className="meta">
              We'll listen to/sign songs together in response
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <em>45 min</em>
          </td>
          <td>Cake, coffee, tea, and more socializing</td>
        </tr>
        <tr>
          <td>
            <em>15 min</em>
          </td>
          <td>Wind down</td>
        </tr>
      </table>
      <h2>Wanna Join?</h2>
      <p>
        We'd love to have you celebrate and explore with us! We will be looking
        at/talking about the Christian bible and that can be off-putting to
        some. If you're comfortable, RSVP below!
      </p>
      <BirthdayForm />
      <style jsx>
        {`
          h1 {
            font-size: 4rem;
            margin: 0;
          }
          h2 {
            font-size: 3rem;
          }
          p,
          ul {
            font-family: Georgia, serif;
            font-size: 1.2rem;
          }
          td {
            padding: 0.5rem;
            font-size: 1.2rem;
          }
          td:first-child {
            font-family: Georgia, serif;
          }
          div {
            padding-bottom: 2rem;
          }
          ul {
            max-width: 640px;
            margin: 0 auto;
          }
          li {
            line-height: 2;
          }
          li:not(:first-child):not(:last-child) {
            margin: 1rem 0;
          }
          .red {
            color: #ff6161;
          }
          .meta {
            font-size: 0.9rem;
            font-style: italic;
            color: #8699a7;
          }
        `}
      </style>
    </div>
  );
};

export default BirthdayPage;
