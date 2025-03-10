import { fabric } from "fabric";
import { useCallback, useState, useMemo } from "react";
import { useAutoResize } from "@/features/editor/hooks/use-auto-resize";
import { BuildEditorProps, Editor } from "@/features/editor/types";

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({
    canvas,
    container,
  });

  const buildEditor = ({
    canvas,

  }: BuildEditorProps): Editor => {

    return {
      addCircle: () => {
        const object = new fabric.Circle({
          radius: 150,
          height: 100,
          width: 100,
          fill: "black",
          stroke: "black",
        });

        canvas.add(object);
        canvas.setActiveObject(object);
      },
    };
  };

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
      });
    }

    return undefined;
  }, [canvas]);

  const innit = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });
      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0.0.0.0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const test = new fabric.Rect({
        height: 100,
        width: 100,
        fill: "black",
      });

      initialCanvas.add(test);
      initialCanvas.centerObject(test);
    },
    []
  );

  return { innit, editor };
};
