import React from "react";

import { storiesOf } from "@storybook/react";

import { HeroEventMeetup } from "..";
import background from "./background.jpeg";

storiesOf("HeroEventMeetup", module).add("example", () => {
  return (
    <HeroEventMeetup
      heading="Elixir Sydney"
      date="2018-12-06"
      time="6:00 - 8:30 PM"
      location1="Expert360"
      location2="Level 3, 14 Martin Place NSW 2000"
    />
  );
});
