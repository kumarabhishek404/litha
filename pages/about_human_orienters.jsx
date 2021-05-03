import React from 'react';
import dynamic from 'next/dynamic';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import useLang from '../hooks/useLang';
import { ABOUT_ORIENTERS_BG_IMAGE } from '../lib/config';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

function AboutHumanOrienters({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    return (
        <Layout>
            <Head pageTitle="About Human Orienters" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={ABOUT_ORIENTERS_BG_IMAGE}
                        alt="Conventional methods of understanding and influencing human behaviour invariably use a mechanistic approach"
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutHumanOrienters}</h1>
                        <h2>Illuminating and Reflecting Awareness</h2>
                    </div>
                </div>
                <div className='about__section d-flex justify-content-center'>
                    <div className='container about__wrapper'>

                        <h2>ABOUT HUMAN ORIENTERS</h2>

                        <p className='p-0 m-0 mt-1'>Conventional methods of understanding and influencing human behaviour invariably use a mechanistic approach. In this conventional approach, the human brain is considered to be like a computer and individuals in an organisation are viewed as components of a machine.</p>

                        <p className='p-0 m-0'>Although this conventional perspective may seem a simple way of understanding human behaviour, it is largely ineffective in making sense of complex human interactions.</p>

                        <p className='p-0 m-0'>Rather than using this mechanistic approach, Human Orienters use our unique Circumplexicon technology to enable users to orient themselves in cognitive space.</p>

                        <p className='p-0 m-0'>Human Orienters can be used at both an individual and collective level to provide a coherent understanding of complex human behaviours.</p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutHumanOrienters;
