import * as React from "react";
import { useTheme } from "@mui/material/styles";

import AppHeader from "./AppHeader";
import ProfileMenu from "../components/ProfileMenu";
import AppDrawer from "./AppDrawer";

export default function AppMenu() {
  const theme = useTheme();

  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const MenuOptions = {
    anchorEl,
    mobileMoreAnchorEl,
    menuId,
    mobileMenuId,
    isMenuOpen,
    isMobileMenuOpen,
    isDrawerOpen,
    handleMenuClose,
    handleMobileMenuOpen,
    handleMobileMenuClose,
    handleProfileMenuOpen,
    handleDrawerOpen,
    handleDrawerClose,
    theme,
  };

  return (
    <React.Fragment>
      <AppHeader {...MenuOptions} />
      <ProfileMenu {...MenuOptions} />
      <AppDrawer {...MenuOptions} />
    </React.Fragment>
  );
}