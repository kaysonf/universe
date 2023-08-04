import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@universe/shared/components";
import { ApplicationMetaData } from "../../applicationLoader";
import { useApplicationDrag } from "../../hooks/useApplicationDnD";

type Props = {
  open: boolean;
  onCloseInitiated: () => void;
};

export function ApplicationList(props: Props) {
  return (
    <>
      <Sheet
        open={props.open}
        modal={false}
        /**
         * HACK - close should be initiated only when
         * user presses "esc" key, clicks the close button,
         * or clicks outside the drawer
         *
         * Radix doesn't expose what events trigger the close
         */
        onOpenChange={() => {
          props.onCloseInitiated();
        }}
      >
        <SheetContent side={"left"} style={{ width: "18em" }}>
          <SheetHeader>
            <SheetTitle>Applications</SheetTitle>
            {/*<SheetDescription>Drag an Application into view!</SheetDescription>*/}
          </SheetHeader>

          {/*<Label>App Search</Label>*/}
          <Input placeholder={"search for an application..."}></Input>

          <Application
            tags={["crypto", "trading"]}
            meta={{
              id: "unique",
              name: "Order Books",
              description: "A collection of order books from crypto exchanges",
              sysImportUrl: "http://localhost:3000/universe-trading.js",
            }}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

function Application(props: { tags: string[]; meta: ApplicationMetaData }) {
  const [{ isDragging }, drag] = useApplicationDrag(props.meta);
  const [isMouseDown, setMouseDown] = React.useState(false);

  // TODO add dragging styles
  return (
    <Card
      ref={drag}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      style={{ cursor: isMouseDown || isDragging ? "grabbing" : "grab" }}
    >
      <CardHeader>
        <CardTitle>{props.meta.name}</CardTitle>
        <CardDescription>{props.meta.description}</CardDescription>
      </CardHeader>

      <CardContent style={{ display: "flex", gap: "0.5em" }}>
        {props.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </CardContent>
    </Card>
  );
}
