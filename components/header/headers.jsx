import React, { useEffect, useState } from 'react'
import DropdownMenu from '../Dropdown/dropdownMenu';
import { authenticate, handleLogout, open_drawer } from '../../lib/global';
import Route from 'next/router';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import headerData from './headerData';


const Header = () => {

  const [auth] = useAuth();

  const headData = headerData()

  return (
    <div className='text-light navbar d-flex justify-content-between align-items-center p-5'>
      <div className="container">
        <div className=''>
          <Link href="/">
            <a>Litha Labs</a>
          </Link>
        </div>
        <div onClick={() => { open_drawer("SIDEBAR", "", "left") }} className='menu__bar__icon'>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className='navbar__links'>
          <ul className='d-flex justify-content-between p-0 m-0'>

            <li>
              <DropdownMenu button="About" menuItems={headData.aboutItems} />
            </li>
            <li>
              <DropdownMenu button="Conversationers" menuItems={headData.conversationItems} />
            </li>
            <li>
              <DropdownMenu button="Assessors" menuItems={headData.assessorsItems} />
            </li>
            <li>
              <DropdownMenu button="Orienters" menuItems={headData.orientersItems} />
            </li>
            <li>
              {
              auth ?
              (<DropdownMenu button="Profile" menuItems={headData.profileItems} />)
              :(
                <DropdownMenu button="Account" menuItems={headData.accountItems} />
              )}
              
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
