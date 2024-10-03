import { MantineProvider } from "@mantine/core";

type MantineUIProps = {
  children: React.ReactNode;
};

export const MantineUI: React.FC<MantineUIProps> = ({ children }) => {
  return <MantineProvider>{children}</MantineProvider>;
};
