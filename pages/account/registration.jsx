import dynamic from 'next/dynamic';
import React from 'react';
import useLang from '../../hooks/useLang';
import Registration from '../../container/registration/index';
import Layout from '../../components/Layout';

const Head = dynamic(() => import("../../components/html/head"), { ssr: false });

function SignUp({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    return (
        <>
        <Layout>
            <Head pageTitle="SignIn" />
            <Registration />
        </Layout>
        </>
    )
}

export default SignUp;
