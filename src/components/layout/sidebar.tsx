import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { AdminRouterItem, routes } from "../../router";
import { useLocation, useNavigate } from "react-router-dom";
import IMAGES from "@theming/images";
import { ReactSVG } from "react-svg";
const { Sider } = Layout;

const getMenuItems = (routes: AdminRouterItem[]): any[] => {
  return routes
    .filter((itm) => !!itm.isAuth)
    .map((itm) => {
      if (!itm.meta) return null;
      let children = null;
      if (itm.children) children = getMenuItems(itm.children);
      return children
        ? {
            ...itm.meta,
            children,
            order: itm.order ?? 1000,
          }
        : {
            ...itm.meta,
            path: itm.path,
            order: itm.order ?? 1000,
          };
    })
    .filter((itm) => !!itm);
};

/**
 * PageSidebar
 * @param props {autoCollapse?: boolean} automatic collapes menu when click another menu
 * @returns
 */
const PageSidebar = (props: { autoCollapse?: boolean }) => {
  const { autoCollapse = true } = props;
  const menuItems = getMenuItems(routes);
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [lastOpenedMenu, setLastOpenedMenu] = useState<string[]>([]);
  const location = useLocation();

  const onSwitchMenu = ({
    key,
    keyPath,
  }: {
    key: string;
    keyPath: string[];
  }) => {
    if (autoCollapse && keyPath.slice(1)) setLastOpenedMenu(keyPath.slice(1));
    navigate(key);
  };

  const onOpenChange = (openKeys: string[]) => {
    setLastOpenedMenu(openKeys);
  };

  const sortMenuItems = (items: any[]) => {
    // by order field
    //if not order field, set to 1000

    return items.sort((a, b) => {
      const orderA = a.order;
      const orderB = b.order;
      return orderA - orderB;
    });
  };

  const sortedMenuItems = sortMenuItems(menuItems);

  useEffect(() => {
    setSelectedKeys([`${location.pathname}`]);
    navigate(location.pathname);
  }, [location.pathname]);

  return (
    <Sider>
      <ReactSVG
        src={IMAGES.ICONS_SVG.logo_letters}
        style={{
          width: "100%",
          height: "auto",
          padding: "20px",
          marginBottom: "20px",
          display: "block",
          margin: "auto",
        }}
      />

      <Menu
        style={{
          fontWeight: "bold",
        }}
        openKeys={lastOpenedMenu}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        mode="inline"
        items={sortedMenuItems}
        onClick={onSwitchMenu}
      />
    </Sider>
  );
};

export default PageSidebar;
