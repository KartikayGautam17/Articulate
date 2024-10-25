import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div>
      <Input
        className="w-[560px] h-[50px] rounded-[30px] outline-none focus-visible:ring-0 border-gray-400 dark:border-white  font-normal"
        placeholder="Search Posts..."
      />
    </div>
  );
};
