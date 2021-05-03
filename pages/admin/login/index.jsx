import dynamic from 'next/dynamic';
import React from 'react'
import Layout from '../../../components/Layout/adminLayout'
import AdminLogin from '../../../container/login/adminLogin';

const Head = dynamic(() => import("../../../components/html/head"), { ssr: false });

function AdminLogIn() {
    return (
        <>
            <Layout>
                <Head pageTitle="AdminLogin" />
                <AdminLogin />
            </Layout>
        </>
    )
}

export default AdminLogIn
