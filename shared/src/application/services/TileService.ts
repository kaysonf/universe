export type TileServiceArgs = {
  tileId: string;
};

const tiles = new Map<string, Tile>();

export const TileService = {
  register(tileId: string) {
    const tile = tiles.get(tileId) || new Tile();
    tiles.set(tileId, tile);

    return tile;
  },

  remove(tileId: string) {
    return tiles.delete(tileId);
  },
};

export class Tile {
  private animateTabSubject = new Set<() => void>();

  onAnimateTab = (animateFn: () => void) => {
    this.animateTabSubject.add(animateFn);
    return () => this.animateTabSubject.delete(animateFn);
  };
  animateTab = () => {
    this.animateTabSubject.forEach((animate) => animate());
  };
}
