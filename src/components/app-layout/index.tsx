import { Outlet } from "react-router-dom";

import { Header } from "@/components/app-layout/header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-[1380px] mx-auto px-6 pt-[7px] pb-[6px]">
        <Outlet />
      </main>
    </div>
  );
}
