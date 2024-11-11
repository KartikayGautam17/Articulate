import { ProfileMain } from "./profile";

export const ProfileWrapper = ({
  paramId,
  sessionId,
  profile,
  ownProfile,
}: {
  paramId: string;
  sessionId: string;
  profile: {
    id: string | null;
    name: string | null;
    description: string | null;
    links: string[] | null;
    image: string | null;
  };
  ownProfile: boolean;
}) => {
  return (
    <div>
      <ProfileMain
        paramId={paramId}
        ownProfile={ownProfile}
        sessionId={sessionId}
        {...profile}
      />
    </div>
  );
};
