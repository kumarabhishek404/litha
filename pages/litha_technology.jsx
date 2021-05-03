import React from 'react';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import { LITHATECHOLOGY_BG_IMAGE } from '../lib/config';
import dynamic from 'next/dynamic';
import useLang from '../hooks/useLang';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

function AboutLithaLabs({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    return (

        <Layout>
            <Head pageTitle="About Litha Technology" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={LITHATECHOLOGY_BG_IMAGE}
                        alt="The challenge with applying technology to psychology is ensuring that it is as engaging and as accessible as possible without oversimplifying the complexities of human behaviour."
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutLithaTechnology}</h1>
                        <h2>Make It Easy. Make It Powerful. Make It Beautiful.</h2>
                    </div>
                </div>
                <div className='about__section d-flex justify-content-center'>
                <div className='container about__wrapper'>

                        <h2>ABOUT LITHA TECHNOLOGY</h2>

                        <p className='p-0 m-0 mt-1'>The challenge with applying technology to psychology is ensuring that it is as engaging and as accessible as possible without oversimplifying the complexities of human behaviour.</p>

                        <p className='p-0 m-0'>At Litha Labs, we focus on making our technology as easy-to-use as possible while retaining its fundamental power. We also like to make sure our technology looks as good as possible because it attracts user engagement and creates and enjoyable experience.</p>

                        <p className='p-0 m-0'>We have created and built our proprietary conversational AI architecture, designing it to be easily and infinitely scalable so that the same core architecture can provide the basis for a wide range of our Litha Conversationers.</p>

                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default AboutLithaLabs;
