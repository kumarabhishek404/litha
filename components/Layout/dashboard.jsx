import React, { useEffect, useState, useContext } from 'react'
import isMobile from '../../hooks/isMobile';
import useTheme from '../../hooks/useTheme';
import { SideNavbarToggleSubject } from '../../lib/rxSubject';
import Sidebar from '../Drawer/userSidebar';
import DashboardHeaders from '../header/dashboard';
import ThemeContext from '../../context/ThemeContext';
import { customTheme } from '../../lib/theme';
import { useDispatch, useSelector } from 'react-redux';
import { actionThemeChange, setMobileView } from '../../redux/actions/home.action';
import { detectDevice } from '../../lib/global';
import { getCookie, getLocalStorage } from '../../lib/session';
import { useRouter } from 'next/router';
import isLoading from '../../hooks/isLoading';
import Loader from '../../components/loader/loader';
import Link from 'next/link'

const DashboardLayout = (props) => {
    const Router = useRouter();
    const dispatch = useDispatch();
    const themeType = useSelector(state => state?.store?.theme)
    const theme = customTheme[themeType]
    const [minimize, setMinimize] = useState(false)
    const [mobileView] = isMobile()
    const currentPath = Router.pathname;
    const conditions = ["admin/login"]

    const [loading] = isLoading();

    const style = {
        'display': loading ? '' : 'none',
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'z-index': '9999'
    }

    useEffect(() => {
        dispatch(setMobileView(detectDevice()))
    }, [dispatch])

    useEffect(() => {
        // get default theme from localstorage and set to state
        const defTheme = getCookie('theme')
        if (defTheme) {
            dispatch(actionThemeChange(defTheme))
        }
    }, [])

    useEffect(() => {
        SideNavbarToggleSubject.subscribe((flag) => setMinimize(flag || false))
    }, [theme])

    return (
        <React.Fragment>
            <div class="" style={style}>
                <Loader />
            </div>
            <div className='' style={{ opacity: loading ? '0.2' : '1', pointerEvents: loading ? 'none' : 'all' }}>
                <div className='dashboard__header d-flex align-items-center justify-content-between'>
                    <div className='dashboard__logo'>
                        <Link href='/' >
                            <h3>Litha</h3>
                        </Link>
                    </div>
                    <div className='dashboard__items'>
                        <ul className='d-flex align-items-center p-0 m-0'>
                            <li className='m-0 mr-3'>Welcome Abhishek</li>
                            <li className='m-0 mr-3 d-flex flex-column'>LoginIP: <p className='m-0 p-0'>1234567890</p></li>
                            <li className='m-0 mr-3 d-flex flex-column'>LoginTime:<p className='m-0 p-0'>03/05/2021 07:40:23</p></li>
                            <li className='m-0 mr-3 profile__button border'>
                                <h3 className='m-0 p-0'>Logout</h3>
                            </li>
                            <li className='m-0 mr-3 profile__button'>
                                <Link href='/'>
                                    <h3 className='m-0 p-0'>My Home</h3>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    (conditions.some(single => currentPath.includes(single))
                        ? <div className='' style={{ padding: '70px' }}>
                            {props.children}
                        </div>
                        : <>
                            <DashboardHeaders />
                            {/* <div id="home-body" className={`home-body d-flex ${mobileView ? 'mobile' : 'desktop'}`}>
                                {!mobileView ?
                                    (<div style={{ backgroundColor: theme.drawerBgColor }} className={`home_sidebar ${minimize ? "min" : "max"}`}>
                                        <Sidebar />
                                    </div>) : (<></>)}
                                </div> */}
                            <div style={{ backgroundColor: theme.bgColor }} className={`home_body ${minimize ? "min" : "max"}`}>
                                {props.children}
                            </div>
                        </>
                    )}
            </div>
        </React.Fragment>
    )
}

export default DashboardLayout;
