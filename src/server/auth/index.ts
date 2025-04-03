import { headers } from "next/headers";
import { auth } from "./config";

export const getServerSession = async () => {
  "use server";
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export { auth };
export type Session = typeof auth.$Infer.Session;
export type AuthUserType = Session["user"];