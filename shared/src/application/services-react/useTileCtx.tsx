import { TileServiceArgs } from "../services";
import * as React from "react";

const Ctx = React.createContext<TileServiceArgs | null>(null);

export function TileProvider(
  props: TileServiceArgs & { children: React.ReactElement }
) {
  return (
    <Ctx.Provider value={{ tileId: props.tileId }}>
      {props.children}
    </Ctx.Provider>
  );
}

export function useTileCtx() {
  return React.useContext(Ctx as React.Context<TileServiceArgs>);
}
