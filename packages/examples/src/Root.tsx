import * as React from "react";
import { addOne } from "@universe/shared/utils";

export default function Root() {
  const [state, setState] = React.useState(0);
  return (
    <button onClick={() => setState((n) => addOne(n) + 1)}>
      <h1>{state}</h1>
    </button>
  );
}
