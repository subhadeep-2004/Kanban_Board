import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";




function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="static" className="bg-slate-900">
                <Toolbar className="flex justify-between">

                    <Typography variant="h6" className="text-white">Kanban</Typography>

                    {/* Buttons visible on large screens (hidden on mobile) */}
                    <div className="hidden md:flex w-full items-center justify-center space-x-4">
                        <Button color="inherit">Home</Button>
                       
                       
                    </div>

                    {/* Icon button visible only on mobile (hidden on large screens) */}

                    <div className="md:hidden">
                    <IconButton color="inherit" edge="end" className="" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer for Mobile */}
            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                <List className="w-64">
                    {["Home"].map((text) => (
                        <ListItem button key={text} onClick={handleDrawerToggle}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default NavBar;
