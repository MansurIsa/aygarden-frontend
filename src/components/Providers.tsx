"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSettings } from "@/store/slices/settingsSlice";

/** Parametrləri yükləyir və favicon / başlığı admin paneldəki dəyərlərlə yeniləyir. */
function SettingsBootstrap() {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((s) => s.settings);
  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      const t = setTimeout(() => setHideLoader(true), 300);
      return () => clearTimeout(t);
    }
  }, [status]);

  useEffect(() => {
    if (!data?.favicon) return;
    document.querySelectorAll<HTMLLinkElement>("link[rel~='icon']").forEach((l) => l.remove());
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = data.favicon;
    document.head.appendChild(link);
  }, [data?.favicon]);

  return (
    <div className={`page-loader ${hideLoader ? "is-hidden" : ""}`} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-icon.png" alt="" />
    </div>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  return (
    <Provider store={storeRef.current}>
      <SettingsBootstrap />
      {children}
    </Provider>
  );
}
