// src/components/PublicRoute.tsx
import useUser from "@/hooks/useUser";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  const { user } = useUser();

  return user.access_token !== "" ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
