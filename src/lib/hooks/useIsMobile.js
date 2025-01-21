import { useState, useEffect } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobileDevice = /mobile/i.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  return isMobile;
}
