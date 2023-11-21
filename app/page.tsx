import Layout from "../components/shared/layouts/layout";
import AppLayout from "@/components/shared/layouts/app-layout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Landing from "@/components/home/landing";

export default async function RootPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <AppLayout>
        <div>
          <h1>Root Page</h1>
        </div>
      </AppLayout>
    );
  } else {
    return (
      <Layout>
        <Landing />
      </Layout>
    );
  }
}
