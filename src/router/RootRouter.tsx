import PageLayout from "@/components/layout";
import useUser from "@/hooks/useUser";
import { Navigate } from "react-router-dom";

function RootRouter() {
  const { user } = useUser();
  console.log("user = ", user);

  return user.access_token !== "" ? (
    <PageLayout />
  ) : (
    <Navigate to="/onboarding" />
  );
}

export default RootRouter;
