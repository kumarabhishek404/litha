import React, { useEffect } from 'react'
import Headers from '../header/headers';
import Footer from '../footer/footer';
import Chatbot from '../chatbot/index';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { getCookie } from '../../lib/session';
import { useDispatch } from 'react-redux';
import isLoading from '../../hooks/isLoading';
import Loader from '../../components/loader/loader';

const Layout = (props) => {
    const Router = useRouter();
    const conditions = ["login", "registration", "forgot"]
    const currentPath = Router.pathname;
    const dispatch = useDispatch()

    const [loading] = isLoading();
    // const loading = true

    const style ={
        'display': loading ? '' : 'none',
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'z-index': '9999'
    }

    return (
        <React.Fragment>
            <div class="" style={style}>
                <Loader />
            </div>
            <div className='' style={{ opacity: loading ? '0.2' : '1', pointerEvents: loading ? 'none' : 'all' }}>
                {
                    (conditions.some(single => currentPath.includes(single))
                        ? <>
                            <div className='onlyHeaderLogo d-flex align-items-center pl-4'>
                                <Link className='onlyHeaderLogo__link' href="/">
                                    <a className='onlyHeaderLogo__link__a'>Litha Labs</a>
                                </Link>
                            </div>
                        </>
                        : <Headers />
                    )}
                <div id="home-body" className="home-body">
                    {props.children}
                </div>
                {
                    (conditions.some(single => currentPath.includes(single))
                        ? <></>
                        : <Footer />
                    )}
            </div>
        </React.Fragment>
    )
}

export default Layout;
