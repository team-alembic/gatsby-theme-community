import React from "react";

import { storiesOf } from "@storybook/react";

import { TalkProps } from "../../Talk/index";
import { TalksList } from "../index";

import jamesImage from "./james.jpg";
import paulImage from "./paul.jpg";

const fullTalk: TalkProps = {
  title: "Fun with TypeScript",
  speaker: {
    name: "James Sadler",
    avatarUrl: jamesImage
  },
  description:
    "In a format we've blatantly stolen borrowed from the end of year Cocoaheads trivia festival, we'll be throwing random questions at you which will stretch your noodles and maybe even teach you some interesting facts about Elixir or Erlang. Or maybe just programming in general.",
  videoUrl: "https://www.youtube.com/watch?v=xTUK3uhFnlU",
  slidesUrl: "https://speakerdeck.com/joshprice/elixir-performance-tuning"
};

const noResourcesTalk: TalkProps = {
  title: "Fun with TypeScript",
  speaker: {
    name: "Paul Fioravanti",
    avatarUrl: paulImage
  },
  description:
    "In a format we've blatantly stolen borrowed from the end of year Cocoaheads trivia festival, we'll be throwing random questions at you which will stretch your noodles and maybe even teach you some interesting facts about Elixir or Erlang. Or maybe just programming in general."
};

storiesOf("Talks", module)
  .add("One talk", () => <TalksList talks={[fullTalk]} />)
  .add("multiple talks", () => <TalksList talks={[fullTalk, noResourcesTalk]} />);
