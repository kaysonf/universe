import { Button } from "@universe/shared/components";
import * as React from "react";
import { ApplicationList } from "./ApplicationList";

export function LeftDrawer() {
  const [showDrawer, setShowDrawer] = React.useState(false);

  return (
    <div
      style={{
        borderRight: "solid 1px hsl(var(--border))",
        paddingRight: "0.5em",
        marginRight: "0.5em",
        marginLeft: "0.5em",
      }}
    >
      <Button
        variant={"secondary"}
        onClick={() => setShowDrawer((show) => !show)}
      >
        show
      </Button>
      <ApplicationList
        open={showDrawer}
        onCloseInitiated={() => setShowDrawer(false)}
      />
    </div>
  );
}
