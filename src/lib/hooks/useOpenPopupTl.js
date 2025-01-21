import { useRef, useEffect } from "react";
import { createOpenPopupTl } from "@/lib/util/animations";

export default function useOpenPopupTl(id) {
  const openPopupTlRef = useRef(null);

  useEffect(() => {
    openPopupTlRef.current = createOpenPopupTl(id);
  }, []);

  return openPopupTlRef.current;
}
