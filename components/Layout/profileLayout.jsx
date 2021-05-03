import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import next from 'next'
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Sidebar from '../../components/Drawer/profileSideBar';
import ProfileIntro from '../profileIntro';
import HomeIcon from '@material-ui/icons/Home';
import createTypography from '@material-ui/core/styles/createTypography';
import { getCookie } from '../../lib/session';
import { getProfileData, logoutUserApi } from '../../services/auth.service';
import { Toast } from '../../lib/global';
import { useSelector } from 'react-redux';


function profileLayout(props) {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const profile = useSelector(state => state?.profile?.profileData)
    console.log(profile, "profile");
    const userId = getCookie('userId')
    const userType = getCookie('userType')
    const token = getCookie('token')

    const [edit, setEdit] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [mobile, setMobile] = useState('')

    const data = `userId=${userId}&userTypeCode=${userType}`

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

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

    useEffect(() => {
        console.log(token, data, "token");
        getProfileData(data, token)
            .then((res) => {
                console.log(res.data.data);
                const data = res.data.data
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setEmail(data.email)
                setRole(data.userType)
                setMobile(data.number || "not added")

                Toast('Profile data fetch Success', 'Success');

            })
            .catch((err) => {
                console.error(err);
                Toast('Profile data fetch failed', 'error');
            })
    }, [])

    return (
        <React.Fragment>
            <div className=''>
                <div className='profile__header d-flex align-items-center justify-content-between border pl-4'>
                    <Link className='text-dark p-4' href="/">
                        <a className='text-dark text-end p-3'>Litha Labs</a>
                    </Link>
                    {/* <div className='d-flex align-items-center'> */}
                    {/* <div onClick={logoutHandler} className='home__button pr-4'>
                                <ExitToAppIcon style={{ fontSize: '30px' }} />
                            </div> */}
                    <Link href='/'>
                        <div className='home__button pr-4'>
                            <a><HomeIcon style={{ fontSize: '35px' }} />
                                {/* <small>Home</small> */}
                            </a>
                        </div>
                    </Link>
                    {/* </div> */}
                    {/* <Menu
                        anchorEl={mobileMoreAnchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        
                        keepMounted
                        className={`headerMenuButton`}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isMobileMenuOpen}
                        onClose={handleMobileMenuClose}
                    >
                        <MenuItem onClick={logoutHandler}>
                            <IconButton><ExitToAppIcon /></IconButton>
                            <Typography>Logout</Typography>
                        </MenuItem>

                    </Menu> */}
                </div>
                <div className=''>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}

export default profileLayout
