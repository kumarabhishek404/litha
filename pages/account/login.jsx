import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import useLang from '../../hooks/useLang';
import Login from '../../container/login/index';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';



const Head = dynamic(() => import("../../components/html/head"), { ssr: false });

function SignIn({ imageSrc, heading, subHeading }) {

    // const isAuthenticate = useSelector(state => state?.store?.auth)

    // useSelector(state => {
    //     console.log(state)
    // })
    // useEffect(() => {
    // }, [])
   
    const [lang] = useLang()
    return (
        <Layout>
            <Head pageTitle="Login" />
            <Login />
        </Layout>
    )
}

export default SignIn;
