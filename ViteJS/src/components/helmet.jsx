import React from "react";
import { Helmet } from "react-helmet";

export default function Tab({ name }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Mailify | {name}</title>
    </Helmet>
  );
}
