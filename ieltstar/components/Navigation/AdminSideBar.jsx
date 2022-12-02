import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { tokens } from "../../material-ui-configs/theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link href={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar } = useProSidebar();

  return (
    <Box
      sx={{
        "& .ps-menu-button:hover": {
          background: `${theme.palette.background.default}`,
        },
      }}
    >
      <Sidebar style={{height: '100%'}} rootStyles={{
        ['.ps-sidebar-container']: {
          background: colors.primary[400]
        }
      }}>
        <Menu 
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                backgroundColor: active && theme.palette.background.default,
              };
          },
        }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => collapseSidebar()}
            icon={<MenuOutlinedIcon />}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
          </MenuItem>
          <Box>
            <Item
              title="Exam"
              to="/admin/exam"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />            
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;