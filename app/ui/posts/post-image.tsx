import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
export const PostImage = ({ src }: { src: string }) => {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="bg-black/50 rounded-[37px] py-2 my-4"
    >
      <Image
        src={src}
        alt="Failed to load image"
        fill
        loading="eager"
        style={{ objectFit: "contain", borderRadius: "25px" }}
        className="max-w-[700px] max-h-[500px] rounded-[15px] "
      ></Image>
    </AspectRatio>
  );
};
