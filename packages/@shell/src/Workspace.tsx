import { Actions, IJsonModel, Layout, Model, TabNode } from "flexlayout-react";

import * as React from "react";
import { useApplicationDrop } from "./hooks/useApplicationDnD";
import { ApplicationMetaData } from "./applicationLoader";
import Parcel from "single-spa-react/parcel";
import { ReactElement } from "react";
import {
  TileServiceArgs,
  UniverseParcelArgs,
} from "@universe/shared/application";
import { TileTab } from "./TileTab";

import "./workspace.css";
enum Component {
  App = "app",
  Nav = "nav",
}

const json: IJsonModel = {
  global: { tabEnableFloat: false },
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

function isComponent(s: string | undefined): s is Component {
  return s !== undefined && Object.values(Component).includes(s as Component);
}

function isApplicationMetaData(a: any): a is ApplicationMetaData {
  return a && a["id"] && a["name"] && a["sysImportUrl"];
}

function extractTileServiceArgs(node: TabNode): TileServiceArgs {
  return {
    tileId: node.getId(),
  };
}

export function Workspace() {
  const [{ currentDraggedAppMetaData }] = useApplicationDrop();

  const [model] = React.useState(Model.fromJson(json));

  const factory = (node: TabNode): ReactElement => {
    const component = node.getComponent();

    if (isComponent(component)) {
      switch (component) {
        case Component.App: {
          const possibleMeta = node.getConfig();

          if (isApplicationMetaData(possibleMeta)) {
            return (
              <Parcel<UniverseParcelArgs>
                {...extractTileServiceArgs(node)}
                config={() => System.import(possibleMeta.sysImportUrl)}
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
      onRenderTab={(node, renderValues) => {
        const component = node.getComponent();
        if (isComponent(component)) {
          switch (component) {
            case Component.App: {
              renderValues.content = (
                <TileTab
                  {...extractTileServiceArgs(node)}
                  name={node.getName()}
                />
              );
              break;
            }

            default: {
              return;
            }
          }
        }
      }}
      model={model}
      factory={factory}
    />
  );
}
