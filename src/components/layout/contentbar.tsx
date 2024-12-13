import React from "react";

import { Outlet } from "react-router-dom";
import { Card } from "antd";

const PageContent: React.FC = () => {
  return (
    <div
      style={{
        padding: "0 20px",
        height: "calc(100vh - 120px)",
        overflow: "auto",
      }}
    >
      <Outlet />
    </div>
  );
};

export default PageContent;
