import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initalV: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) { return JSON.parse(jsonValue); }
    else {
      if (typeof initalV === "function") {
        return (initalV as () => T)();
      } else {
        return initalV;
      }
    }
  });

  //updates when the value or the storage-key change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key])

  return [value, setValue] as [T, typeof setValue];
};