import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminLayout = () => {
    const route = useRouter();

    useEffect(() => {
        if(route.pathname == '/dashboard') {
            route.push('/admin/litha')
        }
        else {
            route.push('/admin/login')
        }
    }, [])

    return (
        <></>
    )
}

export default AdminLayout;
