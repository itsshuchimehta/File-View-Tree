import { useState } from "react";

// Helper hook to toggle ids inside a Set.
// Using a Set makes add/remove easy and keeps lookups fast.

export function useToggleSet<T extends string | number>() {
  const [set, setSet] = useState<Set<T>>(new Set());
  const toggle = (v: T) =>
    setSet((prev) => {
      const n = new Set(prev);
      n.has(v) ? n.delete(v) : n.add(v);
      return n;
    });
  return { set, toggle };
}
