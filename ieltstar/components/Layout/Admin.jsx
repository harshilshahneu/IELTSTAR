import Box from "@mui/material/Box";
import DefaultTopbar from "../Navigation/DefaultTopbar";
import AdminDrawer from "../Navigation/AdminDrawer";
import { useState } from "react";
import DrawerHeader from "../Navigation/DrawerHeader";

export default function Default({ children }) {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DefaultTopbar  open={open} handleDrawerOpen={handleDrawerOpen}/>
      <AdminDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
