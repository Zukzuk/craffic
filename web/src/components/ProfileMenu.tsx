import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface IProfileMenuProps {
  anchorEl: HTMLElement | null;
  mobileMoreAnchorEl: HTMLElement | null;
  menuId: string;
  mobileMenuId: string;
  isMenuOpen: boolean;
  isMobileMenuOpen: boolean;
  handleMenuClose(): void;
  handleMobileMenuClose(event: React.MouseEvent<HTMLElement>): void;
  handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>): void;
}

export default function ProfileMenu(options: IProfileMenuProps) {
  const {
    anchorEl,
    mobileMoreAnchorEl,
    menuId,
    mobileMenuId,
    isMenuOpen,
    isMobileMenuOpen,
    handleMenuClose,
    handleMobileMenuClose,
    handleProfileMenuOpen,
  } = options;

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
