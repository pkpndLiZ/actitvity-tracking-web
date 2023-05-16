import { MainLayout } from "@/components/layouts/MainLayout";
import { HomeContent } from "@/components/HomeContent";
import { SideBar } from "@/components/SideBar";
import ProfileContent from "@/components/ProfileContent";

export default function Home() {
  return (
    <>
      <MainLayout sidebar={<SideBar />} homeContent={<ProfileContent />} />
    </>
  );
}
