"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("fbApp/Header"), {
  ssr: false,
  loading: () => <div>Loading header…</div>,
});

export default function RemoteHeader() {
  return <Header />;
}
