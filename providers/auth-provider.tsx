import { headers } from "next/headers";
import { ReactElement } from "react";
import useAuthStore from "@/stores/auth-store";
import { redirect } from "next/navigation";

const AuthProvider = ({ children }: any) => {
  const headersList = headers();

  const token = headersList.get("x-authorization");

  const { authenticated, login } = useAuthStore.getState();

  if (!authenticated && token) login(token);

  return renderChildren(children);
};

const renderChildren = (children: ReactElement) => <>{children}</>;

export const publicRoutes = ["/", "/login", "/register"];

export default AuthProvider;
