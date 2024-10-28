import { LogoutButton } from "./logout-button";
import { PeopleSection } from "./people-section";
import { PostSection } from "./post-section";

export const Sidebar = () => {
  return (
    <div className="w-[250px] h-[calc(100vh-var(--navbarHeight))] border-2 border-y-0 p-[15px] px-[20px]">
      <div
        id="groups-container"
        className="flex flex-col  justify-start w-full items-center"
      >
        <PostSection />
        <PeopleSection />
      </div>

      <LogoutButton />
    </div>
  );
};
