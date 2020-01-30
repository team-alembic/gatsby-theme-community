import { storiesOf } from "@storybook/react";

import React from "react";

import { PageLayout } from "../";

storiesOf("PageLayout", module).add("example", () => {
  return (
    <PageLayout>
      <div />
    </PageLayout>
  );
});
