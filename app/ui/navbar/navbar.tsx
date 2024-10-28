import { SearchBar } from "./search-bar";
import { Logo } from "./logo";
import { CreatePostButton } from "./create-post-button";
import { Avatar } from "./avatar";
import { ABeeZee } from "next/font/google";
import { ThemeToggle } from "./theme-toggle";

const roboto = ABeeZee({
  subsets: ["latin"],
  weight: ["400"],
});

export const Navbar = () => {
  return (
    <div className="w-full h-var(--navbarHeight) px-[16px] py-[10px] border-2 box-border border-t-0 border-l-0 border-r-0">
      <div className="w-full h-full flex justify-between items-center">
        <div id="logo" className={roboto.className}>
          <Logo />
        </div>
        <div id="search_bar">
          <SearchBar />
        </div>
        <div id="profile" className="flex justify-between h-[36px]">
          <div id="theme-toggle">
            <ThemeToggle />
          </div>
          <div id="create_post">
            <CreatePostButton />
          </div>
          <div id="user_profile">
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
};
