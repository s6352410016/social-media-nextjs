import { useEffect, useState } from "react";

export function useLoadingComponent(isLoading: boolean) {
  const [loadingComponent, setLoadingComponent] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setLoadingComponent(false);
    }
  }, [isLoading]);

  return loadingComponent;
}
