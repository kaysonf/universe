import * as React from "react";
import { MantineProvider } from "@universe/shared/components";
import { Workspace } from "./Workspace";
import { Navigation } from "./navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Root() {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
      }}
    >
      <MantineProvider>
        <DndProvider backend={HTML5Backend}>
          <Navigation />

          <div
            style={{
              flexGrow: 1,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              position: "relative",
            }}
          >
            <Workspace />
          </div>
        </DndProvider>
      </MantineProvider>
    </div>
  );
}
