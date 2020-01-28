import React from "react";

// tslint:disable-next-line
import { storiesOf } from "@storybook/react";

import { Logo } from "..";
import logo from "./elixir-logo.svg";

storiesOf("Logo", module)
  .add("elixir small", () => <Logo size="small" logoUrl={logo} />)
  .add("elixir large", () => <Logo size="large" logoUrl={logo} />);
