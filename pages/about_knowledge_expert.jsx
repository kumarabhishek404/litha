import React from 'react';
import dynamic from 'next/dynamic';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import { ABOUT_KNOWLEDGE_EXPERT_BG_IMAGE } from '../lib/config';
import useLang from '../hooks/useLang';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

function AboutKnowledgeExpert({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    return (
        <Layout>
            <Head pageTitle="About Knowledge Expert" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={ABOUT_KNOWLEDGE_EXPERT_BG_IMAGE}
                        alt="Knowledge Expert uses our Curious Technology to help a user to learn and retain knowledge about a particular subject area."
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutKnowledgeExpert}</h1>
                        <h2>The Listening Book</h2>
                    </div>
                </div>
                <div className='about__section d-flex justify-content-center'>
                <div className='container about__wrapper'>

                        <h2>ABOUT KNOWLEDGE EXPERT</h2>

                        <p className='p-0 m-0 mt-1'>Knowledge Expert uses our Curious Technology to help a user to learn and retain knowledge about a particular subject area.</p>

                        <p className='p-0 m-0'>Most conventional sources of knowledge, such as books, videos and online resources, present knowledge in a linear format.</p>

                        <p className='p-0 m-0'>Rather than presenting knowledge in a prescriptive linear format, Knowledge Expert provides it in an accessible conversation. Your chosen source of knowledge listens to your questions and expertly answers them.</p>

                        <p className='p-0 m-0'>Knowledge Expert can also test your knowledge of a subject area by asking intelligently structured questions about it.</p>

                        <p className='p-0 m-0'>Although talking book technology has been around for some time now, Knowledge Expert is like a listening book that you can easily converse with.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutKnowledgeExpert;
