import { useState } from "react";

export default function useLoading(defaultValue) {
  const [isLoading, setIsLoading] = useState(defaultValue);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return { isLoading, startLoading, stopLoading };
}
