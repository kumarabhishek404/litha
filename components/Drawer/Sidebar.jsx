import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import Divider from '@material-ui/core/Divider';
import Wrapper from '../../hoc/Wrapper';
import ChatIcon from '@material-ui/icons/Chat';
import MapIcon from '@material-ui/icons/Map';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AvatarImg from '../Images/AvatarImg';
import Dropdown from '../Dropdown/dropdownMb';
import Route from 'next/router';
import { close_drawer } from '../../lib/global';
import Link from 'next/link';
import headerData from '../header/headerData';
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import ProfileIntro from '../profileIntro';

const Sidebar = () => {
    const [auth] = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const headData = headerData()

    const handleClick = (event) => {
        Route.push(event)
        close_drawer()
    }

    return (
        <Wrapper>
            <div className="side_nav_menu">
                <div className="row m-0 flex-nowrap align-items-center">
                    <div className="col-12 p-0 my-2 row">
                        <div className="ml-3 w-100 d-flex align-items-center">
                            {auth
                                ? <ProfileIntro />
                                : <Link href='/account'>
                                    <>
                                        <AvatarImg width="60px" height="60px" className='ml-4' ></AvatarImg>
                                        <a className='ml-3' onClick={() => handleClick('account')} style={{ fontSize: '25px' }}>SignIn</a>
                                    </>
                                </Link>
                            }
                        </div>
                        {/* <div className="px-3">
                            {isLoggedIn
                                ? <p className="text-muted mx-3">
                                    katherine.langford
                            </p>
                                : <div className='p-2'> </div>
                            }
                        </div> */}
                    </div>
                </div>
                <Divider />
                <List>
                    <ListItem>
                        {
                            auth ?
                                (<Dropdown button="Profile" menuItems={headData.profileItems} />)
                                : (
                                    <Dropdown button="Account" menuItems={headData.accountItems} />
                                )}
                    </ListItem>
                    <ListItem>
                        <Dropdown button="About" menuItems={headData.aboutItems} />
                    </ListItem>
                    <ListItem>
                        <Dropdown button="Conversationers" menuItems={headData.conversationItems} />
                    </ListItem>
                    <ListItem>
                        <Dropdown button="Assessors" menuItems={headData.assessorsItems} />
                    </ListItem>
                    <ListItem>
                        <Dropdown button="Orienters" menuItems={headData.orientersItems} />
                    </ListItem>

                </List>
            </div>
            <style jsx="true">{`
                .side_nav_menu{
                    width: 100%;
                    height: 100vh;
                    position: relative;
                    float: right;
                }
                .profileName{
                    font-size: 5.266vw;
                    font-family: "Avenir-Roman", sans-serif !important;
                    text-transform: capitalize;
                    font-weight: bold;
                }
            `}</style>
        </Wrapper>
    )
}

export default Sidebar
