import { useTile } from "./useTile";

export function useTileControl() {
  const tile = useTile();

  return {
    animateTab: tile.animateTab,
  };
}
