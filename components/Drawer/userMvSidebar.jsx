import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { NavLink, useHistory } from 'react-router-dom';
import sidebarList from '../sidebar/index';
import useTheme from '../../hooks/useTheme';
import { IconButton, ListItemText } from '@material-ui/core';
import { close_drawer } from '../../lib/global';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router'

import { customTheme } from '../../lib/theme';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const MvAdminSidebar = (props) => {

    const themeType = useSelector(state => state?.store?.theme)
    const theme = customTheme[themeType]

    const classes = useStyles();
    const [open, setOpen] = React.useState({});
    const Route = useHistory()
    const router = useRouter()


    const handleClick = (title, item) => {
        setOpen(prev => {
            return {
                ...prev,
                [title]: !prev[title]
            }
        });
        if (item.path) {
            router.push(`/dashboard${item.path}`)
            setTimeout(() => {
                handleToggleDrawer()
            }, 1);
        }
    };

    const handleClickChild = (path) => {
        Route.push(path);
        setTimeout(() => {
            handleToggleDrawer()
        }, 1);
    }
    const handleToggleDrawer = () => {
        close_drawer("ADMINSIDEBAR")
    }

    const itemList = sidebarList(theme.iconColor)
    return (
        <React.Fragment>
            {/* <AppBar
            style={{
            backgroundColor: theme.headerColor,

            }} 
            className={`header_sidebar`}
            position="static"
        > */}

            {/* </AppBar> */}
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                style={{
                    color: theme.textColor,
                    backgroundColor: theme.drawerBgColor,
                    boxShadow: theme.drawerShadow,
                    height: "100%",
                    overflowX: 'hidden'
                }}
                className={classes.root, 'p-0'}
            >
                <ListItem className="w-100">
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        onClick={handleToggleDrawer}
                        color="inherit"
                        style={{ zIndex: 100 }}
                        aria-label="open drawer"
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    <div className="w-100 position-absolute text-center">
                        <h3 className="m-0">Dashboard</h3>
                    </div>
                </ListItem>
                <hr className="mt-0" />

                {itemList.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <ListItem
                                className={`d-flex justify-content-between side_nav_item ${router.pathname == `/dashboard${item.path}` ? 'active' : ''}`}
                                button
                                onClick={() => handleClick(item.title, item)}>
                                <span className="d-flex sidebar nav__link" style={{ color: theme.textColor }}>
                                    <ListItemIcon style={{ color: router.pathname == `/dashboard${item.path}` ? "#fff" : theme.iconColor }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText className="nav_item_text" primary={item.title} />
                                </span>
                                {item.children && item.children.length ? (open[item.title] ? <ExpandLess /> : <ExpandMore />) : null}
                            </ListItem>
                            {item.children && item.children.map((childItem, childIndex) => {
                                return (
                                    <Collapse key={childItem.title + childIndex} in={open[item.title]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem
                                                button
                                                onClick={() => handleClickChild(childItem.path)}
                                                className={`${classes.nested} side_nav_item child ${router.pathname == `/admin${item.path}` ? 'active' : ''}`}>
                                                <ListItemIcon style={{ color: router.pathname == `/dashboard${item.path}` ? "#fff" : theme.iconColor }}>
                                                    {childItem.icon}
                                                </ListItemIcon>
                                                <ListItemText className="nav_item_text" primary={childItem.title} />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </List>
        </React.Fragment>
    );
}

export default MvAdminSidebar;