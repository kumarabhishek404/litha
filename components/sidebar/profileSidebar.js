import React from 'react'
import { StarBorder } from '@material-ui/icons'
import TimelineIcon from '@material-ui/icons/Timeline';


/**
 * @description all sidebar items list
 * Add your sidebar item here in this list
 * @author jagannath
 * @date 09/04/2021
 * @param color String - icon color
 * @return Array of sidebar items 
 */
const sidebarList = (color) => {
    return [
        {
            title: 'Profile',
            icon: <StarBorder style={{color}} />,
            home: true,
            path: '/profile'
        },
        {
            title: 'Dashboard',
            icon: <TimelineIcon style={{color}} />,
            home: true,
            path: '/dashboard'
        },
        {
            title: 'Setting',
            icon: <TimelineIcon style={{color}} />,
            home: true,
            path: '/setting'
        },
    ]
}

export default sidebarList
