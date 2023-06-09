import { MainLayout } from "@/components/layouts/MainLayout";
import { HomeContent } from "@/components/HomeContent";
import { SideBar } from "@/components/SideBar";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <MainLayout sidebar={<SideBar />} homeContent={<HomeContent />} />
    </>
  );
}
