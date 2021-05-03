import React from 'react';
import dynamic from 'next/dynamic';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import useLang from '../hooks/useLang';
import { ABOUT_CONVERSATIONERS_BG_IMAGE } from '../lib/config';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

function AboutConversationers({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    return (
        <Layout>
            <Head pageTitle="About Conversationers" />
            <div className='d-flex flex-column align-items-center'>

                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={ABOUT_CONVERSATIONERS_BG_IMAGE}
                        alt="Conventional chat bots and conversation agents are designed to answer questions from a user."
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutConversationers}</h1>
                        <h2>Creating Listening Space</h2>
                    </div>
                </div>

                <div className='about__section d-flex justify-content-center'>
                    <div className='container about__wrapper'>

                        <h2>ABOUT CONVERSATIONERS</h2>

                        <p className='p-0 m-0 mt-1'>Conventional chat bots and conversation agents are designed to answer questions from a user. They have a limited application and can only be used in domain specific conversation processes.</p>

                        <p className='p-0 m-0'>Litha Conversationers are unique. Rather than being designed to answer questions, they have been created to ask questions.</p>

                        <p className='p-0 m-0'>This fundamental change of perspective enables Litha Conversationers to create a safe and secure listening space for the user. The listening space that Litha Conversationers provide is not simply a passive silence.</p>

                        <p className='p-0 m-0'>Instead, it is an active listening space where our Curious Technology listens to the user and asks meaningful questions as a way of surfacing deeper self and situational awareness for the user.</p>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default AboutConversationers;
