import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { getCookie } from '../../lib/session';
import DashboardLayout from '../../components/Layout/dashboard';
import { useSelector } from 'react-redux';

function UserDashboard() {
    const route = useRouter();
    const auth = useSelector(state => state?.profile?.auth)

    useEffect(() => {
        if (route.pathname == '/dashboard') {
            route.push('/dashboard/home')
        }
    }, [])

    useEffect(() => {
        auth 
        ? route.push('/dashboard/home')
        : route.push('/account/login')
    }, [])

    return (
        <></>
    )
}

export default UserDashboard
