import React from 'react';
import dynamic from 'next/dynamic';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import useLang from '../hooks/useLang';
import { ABOUT_ASSESSMENTS_BG_IMAGE } from '../lib/config';

const Head = dynamic(() => import("../components/html/head"), {ssr: false});

function AboutAssessors({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    console.log('lang', lang)
    return (
        <Layout>
            <Head pageTitle="About Assessors" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={ABOUT_ASSESSMENTS_BG_IMAGE}
                        alt="Our Assessors use the clinically approved assessment methods for identifying feelings"
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutAccessory}</h1>
                        <h2>Understanding How You Feel</h2>
                    </div>
                </div>

                <div className='about__section d-flex justify-content-center'>
                    <div className='container about__wrapper'>

                        <h2>About Assessors</h2>
                        <p className='p-0 m-0 mt-1'>Our Assessors use the clinically approved assessment methods for identifying feelings associated with anxiety, depression and stress. The conventional methods of using these clinical assessments is to fill in a form in the course of an interview.</p>
                        <p className='p-0 m-0'>The Litha Assessors use our Conversationers technology to complete the forms and score the results through a conversational chat with the user.</p>
                        <p className='p-0 m-0'>It is also possible to have a subsequent free-ranging conversation after the initial assessment conversation. This enables the Litha Assessors to assess the user's feelings from a qualitative as well as a quantitative perspective.</p>

                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default AboutAssessors;
