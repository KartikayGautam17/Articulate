import { SearchBar } from "./search-bar";
import { Logo } from "./logo";
import { CreatePostButton } from "./create-post-button";
import { UserAvatar } from "./avatar";
import { ABeeZee } from "next/font/google";
import { ThemeToggle } from "./theme-toggle";

const roboto = ABeeZee({
  subsets: ["latin"],
  weight: ["400"],
});

export const Navbar = ({
  searchBar = true,
  createPostButton = true,
  id,
}: {
  searchBar?: boolean;
  createPostButton?: boolean;
  id: string | null | undefined;
}) => {
  return (
    <div className="w-full h-[var(--navbarHeight)] px-[16px] py-[10px] border-2 box-border border-t-0 border-l-0 border-r-0">
      <div className="w-full h-full flex  justify-between items-center">
        <div id="logo" className={roboto.className}>
          <Logo />
        </div>
        {searchBar ? (
          <div id="search_bar">
            <SearchBar />
          </div>
        ) : (
          <div></div>
        )}
        <div id="profile" className="flex justify-between h-[36px]">
          <div id="theme-toggle">
            <ThemeToggle />
          </div>
          {createPostButton ? (
            <div id="create_post">
              <CreatePostButton id={id} />
            </div>
          ) : (
            <></>
          )}
          <div id="user_profile">
            <UserAvatar id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
