import React from "react";

// tslint:disable-next-line
import { storiesOf } from "@storybook/react";

import { FooterComplete } from "..";

storiesOf("FooterLinkGroup", module).add("example", () => {
  return <FooterComplete />;
});
