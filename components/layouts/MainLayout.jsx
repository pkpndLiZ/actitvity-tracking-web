import { NavBar } from "../NavBar";
import { SideBar } from "../SideBar";

export function MainLayout({ children }) {
  return (
    <div className="h-screen">
      <div>
        <NavBar />
      </div>
      <div className="main-layout-container">
        <div className="w-[250px]">
          <SideBar />
        </div>
        <div className="main">{children}</div>
        <div>blank</div>
      </div>
    </div>
  );
}
