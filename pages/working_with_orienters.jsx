import React from 'react';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import { ORIENTERS_BG_IMAGE } from '../lib/config';
import dynamic from 'next/dynamic';
import useLang from '../hooks/useLang';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

function WorkingWithOrieters({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    return (
        <Layout>
            <Head pageTitle="Working With Orienters" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={ORIENTERS_BG_IMAGE}
                        alt="Using Human Orienters is quite different from using conventional methods of understanding human behaviour."
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.workingWithOrienters}</h1>
                        <h2>Developing Self and Situational Awareness</h2>
                    </div>
                </div>
                <div className='about__section d-flex justify-content-center'>
                <div className='container about__wrapper'>

                        <h2>WORKING WITH ORIENTERS</h2>

                        <p className='p-0 m-0 mt-1'>Using Human Orienters is quite different from using conventional methods of understanding human behaviour.</p>

                        <p className='p-0 m-0'>Conventional methods typically use outdated and questionable statistical methods in largely ineffective attempts to provide behavioural insights. They also tend to view humans as unchanging entities rather than human beings whose awarenesses naturally emerge, exist and evolve.</p>

                        <p className='p-0 m-0'>Human Orienters, however, use contemporary psychological research to identify and illuminate self-awareness and situational awareness for the user.</p>

                        <p className='p-0 m-0'>Rather than using forced choice methods and Likert scales, Human Orienters engage with a user by inviting them to share some words about how they are feeling, either simply as words or in the form of a narrative or story.</p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default WorkingWithOrieters;
