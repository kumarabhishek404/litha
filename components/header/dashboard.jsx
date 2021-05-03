import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { APP_NAME } from '../../lib/config';
import { useDispatch, useSelector } from 'react-redux';
import useTheme from '../../hooks/useTheme';
import { SideNavbarToggleSubject } from '../../lib/rxSubject';
import { getCookie, removeLocalStorageKey, setCookie, setLocalStorage } from '../../lib/session';
import { actionThemeChange } from '../../redux/actions/home.action';
import isMobile from '../../hooks/isMobile';
import { open_drawer, redirectRoute } from '../../lib/global';

import { customTheme } from '../../lib/theme';
import Images from '../Images/Image';
import { logoutUserApi } from '../../services/auth.service';
import useAuth from '../../hooks/useAuth';
import Router from 'next/router'
import Link from 'next/link';
import ProfileIntro from '../../components/profileIntro/index'
import HomeIcon from '@material-ui/icons/Home';
import Alert from '../../components/AlertComp/Alert'
import { Toast } from '../../lib/global';
import HeaderLinks from './dashboardLink';


const useStyles = makeStyles((theme) => ({
    grow: {
        border: '2px solid red',
        flexGrow: 1,
    },
    menuButton: {
        border: '2px solid red',
        marginRight: theme.spacing(2),
    },
    title: {
        border: '2px solid black',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        border: '2px solid black',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        border: '2px solid red',
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const Headers = (props) => {
    const dispatch = useDispatch()
    // const [theme, themeType] = useTheme();
    const [mobileView] = isMobile()
    // const mobileView = true;
    const Route = useHistory();
    const classes = useStyles();
    const [isErrorLogin, setIsErrorLogin] = useState(false);
    const [isSuccessLogin, setIsSuccessLogin] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [minimize, setMinimize] = useState(false);

    const themeType = useSelector(state => state?.store?.theme)
    const theme = customTheme[themeType]

    useEffect(() => {
        SideNavbarToggleSubject.subscribe((flag) => setMinimize(flag || false))
    }, [])

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleThemeChange = () => {
        const newTheme = themeType === "dark" ? "light" : "dark";
        setCookie("theme", newTheme)
        dispatch(actionThemeChange(newTheme))
        handleMenuClose()
    }

    const refreshToken = getCookie('refreshToken');
    const token = getCookie('token');
    const userId = getCookie('userId');
    const sessionId = getCookie('sessionId');
    const userType = getCookie('userType');

    const data = {
        userType: userType,
        refreshToken: refreshToken,
        userId: userId,
        sessionId: sessionId
    }

    const [auth] = useAuth();

    const logoutHandler = () => {

        logoutUserApi(data, token)
            .then((res) => {
                console.log(res, 'logout')
                dispatch({ type: "AUTH", payload: false })
                setCookie('isAuthenticate', false)
                handleMenuClose()
                Toast('Logout Success', 'Success');

                setCookie('firstName', '')
                setCookie('lastName', '')
                setCookie('email', '')
                setCookie('userType', '')
                setCookie('number', '')

                setTimeout(() => {
                    Router.push('/')
                }, 500);
                setIsSuccessLogin(true)
            })
            .catch((err) => {
                console.error(err)
                Toast('Logout Failed', 'error');
            })
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            className={`headerMenuButton`}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem className='d-flex flex-column'>
                <ProfileIntro />
                <Link href='/dashboard/profile'>
                    <div className='w-100 d-flex align-items-center'>
                        <IconButton><AccountCircleIcon /></IconButton>
                        <Typography>Profile</Typography>
                    </div>
                </Link>
                <Link href='/'>
                    <div className='w-100 d-flex align-items-center'>
                        <IconButton><HomeIcon /></IconButton>
                        <Typography>Home</Typography>
                    </div>
                </Link>
                <div onClick={logoutHandler} className='w-100 d-flex align-items-center'>
                    <IconButton><ExitToAppIcon /></IconButton>
                    <Typography>Logout</Typography>
                </div>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            className={`headerMenuButton`}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem className='d-flex flex-column'>
                <ProfileIntro />
                <Link href='/dashboard/profile'>
                    <div className='w-100 d-flex align-items-center'>
                        <IconButton><AccountCircleIcon /></IconButton>
                        <Typography>Profile</Typography>
                    </div>
                </Link>
                <Link href='/'>
                    <div className='w-100 d-flex align-items-center'>
                        <IconButton><HomeIcon /></IconButton>
                        <Typography>Home</Typography>
                    </div>
                </Link>
                <div onClick={logoutHandler} className='w-100 d-flex align-items-center'>
                    <IconButton><ExitToAppIcon /></IconButton>
                    <Typography>Logout</Typography>
                </div>
            </MenuItem>

        </Menu>
    );

    const handleToggleDrawer = () => {
        if (mobileView) {
            open_drawer("ADMINSIDEBAR", {
                paperClass: "mv_side_navbar"
            }, "right")
        } else {
            SideNavbarToggleSubject.next(!minimize)
        }
    }
    return (
        <>
            <div className={`grow main-header`} style={{ backgroundColor: '#224d8a' }}>
                {/* {!mobileView ?
                    (<AppBar
                        style={{
                            backgroundColor: theme.headerColor,

                        }}
                        className={`header_sidebar ${minimize ? "min" : "max"}`}
                        position="static"
                    >
                        <Typography className='title Bold text-start' variant="h6" noWrap>
                            <Images
                                src="/img/admin_dashboard_header_icon.png"
                                alt="Header logo on the admin dashboard page"
                                width="74px"
                                height="90%"
                                style={{ padding: '7px 23px 2px 15px' }}
                                className='' />
              User Dashboard
        </Typography>
                    </AppBar>) : <></>} */}

                <AppBar
                    style={{
                        backgroundColor: theme.headerColor,
                        color: '#fff'
                    }}
                    className={`header_body ${minimize ? "min" : "max"}`}
                    position="static">
                    <Toolbar>
                        {/* <IconButton
                            edge="start"
                            className='menuButton text-light'
                            onClick={handleToggleDrawer}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton> */}
                        {/* {mobileView ? (
                            <div className="w-100 text-start text-light">
                                <h4 className="m-0">{APP_NAME}</h4>
                            </div>) : <></>} */}
                        {/* <Typography className='title Bold text-light' variant="h5" noWrap>
                            {APP_NAME}
                        </Typography> */}
                        {/* <div className='grow' /> */}
                        <div className='header_links'>
                            <HeaderLinks className={{ width: '100%', height: '100%', backgroundColor: 'red' }} />
                        </div>

                        {/* <div onClick={handleThemeChange}>
                            {themeType === 'dark'
                                ? <IconButton className='text-light' ><Brightness5Icon /></IconButton>
                                : <IconButton><Brightness4Icon /></IconButton>
                            }
                        </div> */}
                        {/* <div className='sectionDesktop'>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                className="text-light"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                        </div> */}

                        {/* <div className='sectionMobile'>
                            <IconButton
                                aria-label="show more"
                                className="text-light"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div> */}
                    </Toolbar>
                </AppBar>
                {/* {renderMobileMenu} */}
                {/* {renderMenu} */}
            </div>
        </>
    );
}


export default Headers