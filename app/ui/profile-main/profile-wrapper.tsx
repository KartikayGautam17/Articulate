import { ProfileMain } from "./profile";

export const ProfileWrapper = ({
  paramId,

  profile,
  ownProfile,
}: {
  paramId: string | null;

  profile: {
    name: string | null;
    description: string | null;
    links: string[] | null;
    image: string | null;
  };
  ownProfile: boolean;
}) => {
  return (
    <div>
      <ProfileMain ownProfile={ownProfile} {...profile} />
    </div>
  );
};
