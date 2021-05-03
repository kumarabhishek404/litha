import React from 'react';
import dynamic from 'next/dynamic';
import ForgetPassword from '../../container/forget_password/index'
import Layout from '../../components/Layout';

const Head = dynamic(() => import("../../components/html/head"), { ssr: false });

const ForgotPassword = () => {
    return (
        <>
            <Layout>
                <Head pageTitle="forgotten Password" />
                <ForgetPassword />
            </Layout>
        </>
    )
}

export default ForgotPassword
