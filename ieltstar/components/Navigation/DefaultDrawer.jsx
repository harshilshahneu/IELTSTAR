import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DrawerHeader from "./DrawerHeader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PracticeIcon from "@mui/icons-material/Bolt";
import ArchiveIcon from "@mui/icons-material/MoveToInbox";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Link from "next/link";
import { useState } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DefaultDrawer = ({ open, handleDrawerClose }) => {
  const [selected, setSelected] = useState('dashboard');
  const theme = useTheme();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button component={Link} href="/" selected={selected == 'dashboard'} onClick={() => setSelected('dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} href="/test" selected={selected == 'test'} onClick={() => setSelected('test')}>
          <ListItemIcon>
            <PracticeIcon />
          </ListItemIcon>
          <ListItemText primary="Practice Test" />
        </ListItem>
       
        <ListItem button component={Link} href="/archive" selected={selected == 'archive'} onClick={() => setSelected('archive')}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItem>
      </List>
      <Divider />
      <List>
      <ListItem button component={Link} href="/leaderboard" selected={selected == 'leaderboard'} onClick={() => setSelected('leaderboard')}>
          <ListItemIcon>
            <LeaderboardIcon />
          </ListItemIcon>
          <ListItemText primary="Leaderboard" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DefaultDrawer;
