import { LogoutButton } from "./logout-button";
import { PeopleSection } from "./people-section";
import { PostSection } from "./post-section";
import { SearchPeopleDialog } from "./search-people";
export const Sidebar = () => {
  return (
    <div className="w-[275px] h-full border-2 border-y-0 p-[15px] px-[20px] ">
      <div
        id="groups-container"
        className="flex flex-col  justify-start w-full items-center"
      >
        <PostSection />
        <PeopleSection />
      </div>
      <div className="flex mt-10 gap-5 flex-col items-center justify-between">
        <SearchPeopleDialog />
        <LogoutButton />
      </div>
    </div>
  );
};
