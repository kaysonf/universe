import * as React from "react";
import { TileService, TileServiceArgs } from "@universe/shared/application";

type Props = TileServiceArgs & { name: string };
export function TileTab({ tileId, name }: Props) {
  const [animate, setAnimate] = React.useState(false);

  const [tile] = React.useState(TileService.register(tileId));

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const unsub = tile.onAnimateTab(() => {
      clearTimeout(timeout);

      setAnimate(true);

      timeout = setTimeout(() => {
        setAnimate(false);
      }, 1000);
    });

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, [tile]);

  const animationStyle = {
    opacity: animate ? 0 : 1,
    animation: animate ? "flash 1s infinite" : "none",
  };

  return <p style={animationStyle}>{name}</p>;
}
