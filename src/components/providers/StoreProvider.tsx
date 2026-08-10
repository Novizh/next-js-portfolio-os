"use client";
import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, setStore, AppStore } from "stores/index";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    setStore(storeRef.current);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
