import React from "react";

// tslint:disable-next-line
import { storiesOf } from "@storybook/react";

import { Banner } from "..";

storiesOf("Banner", module).add("examples", () => {
  return (
    <>
      <Banner backgroundImageUrl="https://pbs.twimg.com/media/EBWx40nUwAANM9G?format=jpg&name=medium" />
    </>
  );
});
