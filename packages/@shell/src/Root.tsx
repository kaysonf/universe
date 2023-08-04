import * as React from "react";
import { Workspace } from "./Workspace";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LeftDrawer } from "./containers/LeftDrawer";

export default function Root() {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        height: "100vh",
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <LeftDrawer />
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
    </div>
  );
}
