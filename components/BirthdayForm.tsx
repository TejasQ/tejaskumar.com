import React, { useState } from "react";
import { Button } from "./Button";

export const BirthdayForm = () => {
  const [email, setEmail] = React.useState("");
  const [okToContact, setOkToContact] = React.useState(false);
  const [sendingState, setSendingState] = useState<
    "initial" | "sending" | "sent" | "failed"
  >("initial");

  const submit = () => {
    fetch("/api/attend-birthday", {
      method: "POST",
      body: JSON.stringify({ email, okToContact }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setSendingState("sent");
      alert(
        "Thanks for RSVPing! We'll be in touch closer to the date. See you soon!"
      );
    });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
    >
      <label>
        Your E-Mail Address
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="lea@artemov.de"
        />
      </label>
      <label className="inline">
        <input
          type="checkbox"
          checked={okToContact}
          onChange={() => setOkToContact(!okToContact)}
        />
        I'm OK to be contacted closer to the date with more details. I'm
        genuinely interested to come.
      </label>
      <Button
        disabled={
          sendingState !== "initial" ||
          !(
            okToContact &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
          )
        }
      >
        {sendingState === "sent"
          ? "See you there!"
          : sendingState === "sending"
          ? "One sec..."
          : "Sign me up!"}
      </Button>
      <style jsx>
        {`
          form {
            display: grid;
            gap: 1rem;
            max-width: 320px;
          }
          input[type="email"] {
            padding: 0.5rem;
            font-size: 1rem;
          }
          label {
            display: grid;
            gap: 0.25rem;
            font-size: 0.9rem;
            line-height: 1.6;
          }
          label.inline {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </form>
  );
};
