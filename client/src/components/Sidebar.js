import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';

const menuItems = [
    {
        name: 'Dashboard',
        icon: <MailIcon/>,
    },
    {
        name: 'Warehouse',
        icon: <MailIcon/>,
    },
    {
        name: 'Users',
        icon: <MailIcon/>,
    },
];

function Sidebar({ sidebarState, toggleSidebar }) {
    const [isOpen, setOpen] = useState(sidebarState);

    useEffect(() => {
        setOpen(sidebarState);
    }, [sidebarState]);

    const SidebarComponent = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {
                    menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={toggleSidebar}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer 
                open={isOpen} 
                onClose={toggleSidebar}
            >
                {SidebarComponent}
            </Drawer>
        </div>
    )
}

export default Sidebar;