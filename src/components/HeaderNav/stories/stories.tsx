import React from "react";

import { storiesOf } from "@storybook/react";

import { HeaderNav } from "..";

storiesOf("HeaderNav", module).add("example", () => {
  return <HeaderNav page="storybook" togglePageFix={() => "fixed"} />;
});
