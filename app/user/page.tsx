"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function UserPage() {
  const session = useSession();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (session.data?.user?.email) {
      setUserEmail(session.data?.user?.email as string);
    }
    if (session.data?.user?.name) {
      setUserName(session.data.user.name);
    }
  }, [session.data?.user]);
  return (
    <div>
      <div>You are viewing the User Page</div>
      {!userEmail ? (
        <div>Loading Details</div>
      ) : (
        <div>
          <div>Welcome {userEmail} </div>
          <div>Happy to see you {userName}</div>
        </div>
      )}
    </div>
  );
}
