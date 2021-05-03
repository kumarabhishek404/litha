import React from 'react';
import dynamic from 'next/dynamic';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import { GAILS_BAKERY_BG_IMAGE } from '../lib/config';
import useLang from '../hooks/useLang';
import Chatbot from '../components/chatbot/index';
import { useRouter } from 'next/router';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

function AboutDreamsExpert({ imageSrc, heading, subHeading }) {

    const [lang] = useLang()
    const { query = {} } = useRouter()
    const botName = query.bot || "PHQ-9"

    return (
        <Layout>
            <Head pageTitle="About Dreams Expert" />
            <div className='d-flex flex-column align-items-center'>

                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={GAILS_BAKERY_BG_IMAGE}
                        alt="Dreams Expert was initially created and built as a proof of concept to test out a component of our Curious Technology that we were developing for Bunty."
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutDreamsExpert}</h1>
                        <h2>Psycholinguistic Analyst</h2>
                    </div>
                </div>

                <div className='about__section d-flex justify-content-center'>
                    <div className='container about__wrapper'>

                        <h2>ABOUT DREAMS EXPERT</h2>

                        <p className='p-0 m-0 mt-1'>Dreams Expert was initially created and built as a proof of concept to test out a component of our Curious Technology that we were developing for Bunty.</p>

                        <p className='p-0 m-0'>As a user has a conversation with Dreams Expert, it will identify linguistic imagery that may have associated symbolic significance for the user.</p>

                        <p className='p-0 m-0'>After identifying linguistic imagery in the conversation, Dreams Expert can provide meanings associated with specific significant symbolism and then ask the user a series of questions to help them use that symbolic understanding.</p>

                        <p className='p-0 m-0'>During a conversation, the user can share as many linguistic images as they like and Dreams Expert will guide the user through the images and turn them into meaningful questions.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default AboutDreamsExpert;
