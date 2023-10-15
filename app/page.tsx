"use client";
import Layout from "../components/shared/layouts/layout";
import useAuthStore from "@/stores/auth-store";
import AppLayout from "@/components/shared/layouts/app-layout";
import { Button } from "@/components/ui/button";

export default function RootPage() {
  const auth = useAuthStore.subscribe(console.log);
  console.log(auth);
  //TODO

  if (true) {
    return (
      <AppLayout>
        <div>
          <h1>Root Page</h1>
          <Button
            onClick={(e) => {
              e.preventDefault();
              console.log("click");
              useAuthStore.getState().logout();
            }}
          ></Button>
        </div>
      </AppLayout>
    );
  } else {
    return (
      <Layout>
        <div>
          <h1>Root Page</h1>
          <p>Not authenticated</p>
        </div>
      </Layout>
    );
  }
}
