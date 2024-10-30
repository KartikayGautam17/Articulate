import { ProfileProvider } from "@/app/context/profile-context";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <ProfileProvider>{children}</ProfileProvider>;
}
