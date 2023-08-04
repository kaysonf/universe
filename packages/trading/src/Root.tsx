import * as React from "react";
import { useTileControl } from "@universe/shared/application";
// import { UnstyledButton } from "@universe/shared/components";

export default function Root() {
  const { animateTab } = useTileControl();

  return (
    <div>ok</div>
    // <UnstyledButton
    //   style={{ backgroundColor: "var(--color-primary)" }}
    //   onClick={() => {
    //     animateTab();
    //   }}
    // >
    //   animate
    // </UnstyledButton>
  );
}
