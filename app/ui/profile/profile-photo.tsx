import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export const ProfilePhoto = ({
  fallback,
  src,
}: {
  fallback: string;
  src: string;
}) => {
  return (
    <>
      <Avatar className="flex justify-center items-center w-24 h-24">
        <AvatarImage src={src} className="w-24 h-24" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </>
  );
};
