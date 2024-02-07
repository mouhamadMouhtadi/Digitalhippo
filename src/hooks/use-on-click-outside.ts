import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>, // we pass a ref and here the ref is navRef that we have created in Navitems
  handler: (event: Event) => void // this handler is what should happen if we click outsid the element
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener("mousedown", listener); // PC
    document.addEventListener("touchstart", listener); // Mobile

    return () => {
      document.removeEventListener("mousedown", listener); // PC
      document.removeEventListener("touchstart", listener); // Mobile
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};
