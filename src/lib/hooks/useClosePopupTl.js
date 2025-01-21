import { useRef, useEffect } from "react";
import { createClosePopupTl } from "@/lib/util/animations";

export default function useClosePopupTl(id) {
  const openPopupTlRef = useRef(null);

  useEffect(() => {
    openPopupTlRef.current = createClosePopupTl(id);
  }, []);

  return openPopupTlRef.current;
}
