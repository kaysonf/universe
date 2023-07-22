import { Actions, IJsonModel, Layout, Model, TabNode } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import * as React from "react";
import { useApplicationDrop } from "./hooks/useApplicationDnD";
import { ApplicationMetaData } from "./applicationLoader";
import Parcel from "single-spa-react/parcel";

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
        weight: 100,
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

function isComponent(s: string): s is Component {
  return Object.values(Component).includes(s as Component);
}

function isApplicationMetaData(a: any): a is ApplicationMetaData {
  return a && a["id"] && a["name"] && a["sysImportUrl"];
}

export function Workspace() {
  const [{ currentDraggedAppMetaData }] = useApplicationDrop();

  const [model] = React.useState(Model.fromJson(json));

  const factory = (node: TabNode): JSX.Element => {
    const component = node.getComponent();

    if (component !== undefined && isComponent(component)) {
      switch (component) {
        case Component.App: {
          const possibleMeta = node.getConfig();

          if (isApplicationMetaData(possibleMeta)) {
            return (
              <Parcel
                // @ts-ignore
                config={() => System.import(possibleMeta.sysImportUrl)}
                // onClicky={() => singleton.push(Date.now().toString())}
              />
            );
          } else {
            return <></>;
          }
        }

        default: {
          return <></>;
        }
      }
    } else {
      return <></>;
    }
  };

  return (
    <Layout
      onExternalDrag={() => {
        return {
          dragText: "",
          json: {
            type: "tab",
            component: Component.App,
          },
          onDrop: (node) => {
            if (node instanceof TabNode) {
              model.doAction(
                Actions.updateNodeAttributes(node.getId(), {
                  name: currentDraggedAppMetaData.name,
                  config: { ...currentDraggedAppMetaData },
                })
              );
            }
          },
        };
      }}
      model={model}
      factory={factory}
    />
  );
}
