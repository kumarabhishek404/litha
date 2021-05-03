import React, { useEffect, useState } from 'react';
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
import { SideNavbarToggleSubject } from '../../lib/rxSubject';
import { ListItemText } from '@material-ui/core';
import isMobile from '../../hooks/isMobile';
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

const Sidebar = () => {

  const themeType = useSelector(state => state?.store?.theme)
  const theme = customTheme[themeType]

  // const [theme] = useTheme()
  const [mobileView] = isMobile()
  const classes = useStyles();
  const [open, setOpen] = React.useState({});
  const [minimize, setMinimize] = useState(false);
  const Route = useHistory()
  // const Route = useRouter()
  // const {pathname=""} = Route.location;
  const router = useRouter()
  const { pathname } = router.pathname;

  useEffect(() => {
    SideNavbarToggleSubject.subscribe((flag) => setMinimize(flag || false))
  }, [])

  const handleClick = (title, item) => {
    if (mobileView) return;
    if (minimize) {
      SideNavbarToggleSubject.next()
    }
    setOpen(prev => {
      return {
        ...prev,
        [title]: !prev[title]
      }
    });
    if (item.path) {
      // Route.push(item.path)
      router.push(`/dashboard${item.path}`)
    }
  };

  const itemList = sidebarList(theme.iconColor)
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      style={{
        color: theme.textColor,
        backgroundColor: theme.drawerBgColor,
        boxShadow: theme.drawerShadow,
        height: "100%"
      }}
      className={classes.root}
    >
      {itemList.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <ListItem
              className={`d-flex justify-content-between side_nav_item ${router.pathname == `/dashboard${item.path}` ? 'active' : ''}`}
              button
              onClick={() => handleClick(item.title, item)}>
              <span
                className="d-flex sidebar nav__link"
                style={{ color: theme.textColor }}>
                <ListItemIcon style={{ color: router.pathname === `/dashboard${item.path}` ? "#fff" : theme.textColor }}>
                  {item.icon}
                </ListItemIcon>
                {!minimize && <ListItemText className="nav_item_text" primary={item.title} />}
              </span>
              {!minimize && item.children && item.children.length ? (open[item.title] ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItem>
            {item.children && item.children.map((childItem, childIndex) => {
              return (
                <Collapse key={childItem.title + childIndex} in={open[item.title]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <NavLink style={{ color: theme.textColor }} className="d-flex sidebar nav__link" to={{ pathname: childItem.path }}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon
                          style={{ color: router.pathname === `/dashboard${item.path}` ? "#fff" : theme.iconColor }}>
                          {childItem.icon}
                        </ListItemIcon>
                        {!minimize && <ListItemText className="nav_item_text" primary={childItem.title} />}
                      </ListItem>
                    </NavLink>
                  </List>
                </Collapse>
              )
            })}
          </React.Fragment>
        )
      })}

    </List>
  );
}

export default Sidebar;