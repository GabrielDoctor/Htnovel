"use client";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { addFocusStyle, clearAllLineFocusStyle } from "@/utils/utils";
interface EditBoxContextProps {
  HtmlNodes: HTMLSpanElement[] | undefined;
  setHtmlNodes: React.Dispatch<
    React.SetStateAction<HTMLSpanElement[] | undefined>
  >;
  toolbarPos: { top: number; left: number };
  setToolbarPos: React.Dispatch<
    React.SetStateAction<{ top: number; left: number }>
  >;
  firstNode: HTMLSpanElement | undefined;
  setFirstNode: React.Dispatch<
    React.SetStateAction<HTMLSpanElement | undefined>
  >;
  openLookupBar: boolean;
  setOpenLookupBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContextValue: EditBoxContextProps = {
  HtmlNodes: {} as HTMLSpanElement[],
  setHtmlNodes: () => {},
  toolbarPos: { top: 0, left: 0 },
  setToolbarPos: () => {},
  firstNode: {} as HTMLSpanElement,
  setFirstNode: () => {},
  openLookupBar: false,
  setOpenLookupBar: () => {},
};

export const EditBoxContext =
  createContext<EditBoxContextProps>(initialContextValue);

export function EditBoxProvider({ children }: { children: ReactNode }) {
  const [firstNode, setFirstNode] = useState<HTMLSpanElement>();
  const [HtmlNodes, setHtmlNodes] = useState<HTMLSpanElement[]>();
  const [openLookupBar, setOpenLookupBar] = useState(false);

  //const [open, setOpen] = useState<string>("");
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
  let preHtmlNodes = useRef<HTMLSpanElement[]>();
  const value = {
    HtmlNodes,
    setHtmlNodes,
    toolbarPos,
    setToolbarPos,
    firstNode,
    setFirstNode,
    openLookupBar,
    setOpenLookupBar,
  };
  useEffect(() => {
    if (preHtmlNodes.current) {
      clearAllLineFocusStyle(preHtmlNodes.current);
    }
  }, [firstNode]);

  useEffect(() => {
    if (HtmlNodes) {
      preHtmlNodes.current = HtmlNodes;
      addFocusStyle(HtmlNodes);
    }
  }, [HtmlNodes]);
  useEffect(() => {
    if (openLookupBar && HtmlNodes) {
      clearAllLineFocusStyle(HtmlNodes);
    }
  }),
    [openLookupBar];
  return (
    <EditBoxContext.Provider value={value}>{children}</EditBoxContext.Provider>
  );
}
