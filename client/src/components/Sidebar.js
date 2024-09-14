import { useEffect, useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
} from "@mui/material";


import {
    DashboardOutlined,
    MapsHomeWorkOutlined,
    AccountCircleOutlined,
    PeopleAltOutlined,
    ExpandMore,
    ExpandLess,
} from '@mui/icons-material';

const menuItems = [
    {
        name: 'Trang chủ',
        icon: <DashboardOutlined />,
    },
    {
        name: 'Kho',
        icon: <MapsHomeWorkOutlined />,
        // submenu: [
        //     { name: 'Xem danh sách kho', icon: <MapsHomeWorkOutlined /> },
        //     { name: 'Submenu 2', icon: <MapsHomeWorkOutlined /> },
        // ]
    },
    {
        name: 'Nhân sự',
        icon: <AccountCircleOutlined />,
        submenu: [
            { name: 'Danh sách nhân sự', icon: <MapsHomeWorkOutlined /> },
            { name: 'Trực kho', icon: <MapsHomeWorkOutlined /> },
        ]
    },
    {
        name: 'Khách hàng',
        icon: <PeopleAltOutlined />,
    },
];

function Sidebar({ sidebarState, toggleSidebar }) {
    const [isOpen, setOpen] = useState(sidebarState);
    const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

    useEffect(() => {
        setOpen(sidebarState);
    }, [sidebarState]);

    const handleSubmenuToggle = (index) => {
        setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
    };

    const SidebarComponent = (
        <Box sx={{ width: 300 }} role="presentation">
            <List>
                {
                    menuItems.map((item, index) => (
                        <div key={index}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={item.submenu ? (() => handleSubmenuToggle(index)) : toggleSidebar}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                    {item.submenu ? (openSubmenuIndex === index ? <ExpandLess /> : <ExpandMore />) : null}
                                </ListItemButton>
                            </ListItem>
                            {
                                item.submenu && openSubmenuIndex === index && (
                                    <List component="div" style={{padding: 0, paddingLeft: 15}}>
                                        {item.submenu.map((subitem, subIndex) => (
                                            <ListItem key={subIndex} disablePadding>
                                                <ListItemButton onClick={toggleSidebar}>
                                                    <ListItemIcon>
                                                        {subitem.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={subitem.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                )
                            }
                        </div>
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