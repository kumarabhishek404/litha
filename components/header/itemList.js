import React from 'react'
import { StarBorder } from '@material-ui/icons'
import TimelineIcon from '@material-ui/icons/Timeline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';


/**
 * @description all sidebar items list
 * Add your sidebar item here in this list
 * @author jagannath
 * @date 09/04/2021
 * @param color String - icon color
 * @return Array of sidebar items 
 */
const headerList = (color) => {
    return [
        {
            title: 'Home',
            icon: <DashboardIcon style={{color}} />,
            home: true,
            path: 'home'
        },
        {
            title: 'My Profile',
            icon: <AccountCircleIcon style={{color}} />,
            home: true,
            path: 'profile'
        },
        {
            title: 'My Assessments',
            icon: <AssignmentIcon style={{color}} />,
            home: true,
            path: 'assessments'
        }
    ]
}

export default headerList;
