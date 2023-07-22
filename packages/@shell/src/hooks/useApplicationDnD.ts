import { useDrag, useDrop } from "react-dnd";
import { ApplicationMetaData } from "../applicationLoader";

export function useApplicationDrag(data: ApplicationMetaData) {
  return useDrag(() => ({
    type: "app",
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
}

export function useApplicationDrop() {
  return useDrop(() => ({
    accept: "app",
    collect: (monitor) => ({
      currentDraggedAppMetaData: monitor.getItem<ApplicationMetaData>(),
    }),
  }));
}
