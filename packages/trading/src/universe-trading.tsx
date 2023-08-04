import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { universeSingleSpaReact } from "@universe/shared/application";

const lifecycles = universeSingleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <>oh no!</>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
