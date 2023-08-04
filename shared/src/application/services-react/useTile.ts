import * as React from "react";
import { useTileCtx } from "./useTileCtx";
import { TileService } from "../services";

export function useTile() {
  const { tileId } = useTileCtx();

  const [tile] = React.useState(TileService.register(tileId));

  return tile;
}
