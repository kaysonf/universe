import * as React from "react";
import singleSpaReact from "single-spa-react";
import { TileServiceArgs } from "./services";
import { TileProvider } from "./services-react/useTileCtx";

export type UniverseParcelArgs = TileServiceArgs;
export function universeSingleSpaReact(
  params: Parameters<typeof singleSpaReact<UniverseParcelArgs>>[0]
) {
  const Root = params.rootComponent;

  if (Root === undefined) {
    throw Error("expected root component");
  }

  return singleSpaReact({
    ...params,
    rootComponent: (args) => {
      return (
        <TileProvider tileId={args.tileId}>
          <Root {...args} />
        </TileProvider>
      );
    },
  });
}
