import * as React from "react";

// import Parcel from "single-spa-react/parcel";

import { Layout, Model, TabNode, IJsonModel } from "flexlayout-react";
import "flexlayout-react/style/light.css";

enum Component {
  App = "app",
  Nav = "nav",
}

const json: IJsonModel = {
  global: { tabEnableFloat: true },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "One",
            component: Component.App,
          },
        ],
      },
      {
        type: "tabset",
        weight: 50,
        children: [
          {
            type: "tab",
            name: "Two",
            component: Component.App,
          },
        ],
      },
    ],
  },
};

const model = Model.fromJson(json);

function isComponent(s: string): s is Component {
  return s in Component;
}

export default function Root() {
  const factory = (node: TabNode): JSX.Element => {
    const component = node.getComponent();

    if (component !== undefined && isComponent(component)) {
      switch (component) {
        case Component.App: {
          return <button>{node.getName()}</button>;
        }

        default: {
          return <></>;
        }
      }
    } else {
      return <></>;
    }
  };

  return <Layout model={model} factory={factory} />;
}
