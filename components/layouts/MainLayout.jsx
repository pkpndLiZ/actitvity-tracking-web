import { NavBar } from "../NavBar";
import { SideBar } from "../SideBar";

export function MainLayout({ sidebar, homeContent }) {
  return (
    <div className="h-screen">
      <div>
        <NavBar />
      </div>
      <div className="main-layout-container">
        <div className="w-[250px]">{sidebar}</div>
        <div className="main">{homeContent}</div>
        <div></div>
      </div>
    </div>
  );
}
