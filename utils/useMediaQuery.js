import { useState, useCallback, useEffect } from "react";

export const useMediaQuery = width => {
  const [targetReached, setTargetReached] = useState("initial");

  const updateTarget = useCallback(e => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", e => updateTarget(e));

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }

      return () => media.removeEventListener("change", e => updateTarget(e));
    }
  }, []);

  return targetReached;
};
