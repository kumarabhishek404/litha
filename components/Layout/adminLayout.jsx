import React, { useEffect, useState, useContext } from 'react'
import isMobile from '../../hooks/isMobile';
import useTheme from '../../hooks/useTheme';
import { SideNavbarToggleSubject } from '../../lib/rxSubject';
import Sidebar from '../Drawer/adminSidebar';
import Headers from '../header/adminHeader';
import ThemeContext from '../../context/ThemeContext';
import { customTheme } from '../../lib/theme';
import { useDispatch, useSelector } from 'react-redux';
import { actionThemeChange, setMobileView } from '../../redux/actions/home.action';
import { detectDevice } from '../../lib/global';
import { getCookie, getLocalStorage } from '../../lib/session';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import isLoading from '../../hooks/isLoading';
import Loader from '../../components/loader/loader';

const AdminLayout = (props) => {
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

    const [auth] = useAuth();
    console.log(auth, "adminLayout");

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
           <div style={style}>
                <Loader />
            </div>
            <div style={{ opacity: loading ? '0.2' : '1', pointerEvents: loading ? 'none' : 'all' }}>
                {
                    (conditions.some(single => currentPath.includes(single))
                        ? <div className='' style={{ padding: '70px' }}>
                            {props.children}
                        </div>
                        : <>
                            <Headers />
                            <div id="home-body" className={`home-body d-flex ${mobileView ? 'mobile' : 'desktop'}`}>
                                {!mobileView ?
                                    (<div style={{ backgroundColor: theme.drawerBgColor }} className={`home_sidebar ${minimize ? "min" : "max"}`}>
                                        <Sidebar />
                                    </div>) : (<></>)}
                                <div style={{ backgroundColor: theme.bgColor }} className={`home_body ${minimize ? "min" : "max"}`}>
                                    {props.children}
                                </div>
                            </div>
                        </>
                    )}
            </div>
        </React.Fragment>
    )
}

export default AdminLayout;
