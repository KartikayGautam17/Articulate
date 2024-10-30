import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
export const PostTitle = ({ title }: { title: string }) => {
  return (
    <>
      <Label className="font-semibold text-lg">{title}</Label>
    </>
  );
};
