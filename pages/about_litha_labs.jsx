import React from 'react';
import dynamic from 'next/dynamic';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import { LITHALABS_BG_IMAGE } from '../lib/config';
import useLang from '../hooks/useLang';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

function AboutLithaLabs({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    return (
        <Layout>
            <Head pageTitle="About Litha Labs" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={LITHALABS_BG_IMAGE}
                        alt="At Litha Labs, we create and build psychology technology."
                        width='100%'
                        height='100%'/>

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutLithaLabs}</h1>
                        <h2>Inventing Psychology Technology</h2>
                    </div>
                </div>
                <div className='about__section d-flex justify-content-center'>
                <div className='container about__wrapper'>

                        <h2>ABOUT LITHA LABS</h2>

                        <p className='p-0 m-0 mt-1'>At Litha Labs, we create and build psychology technology. The technology we develop at Litha Labs emerges from a deep understanding of contemporary psychology research and how it can be applied technologically.</p>

                        <p className='p-0 m-0'>Most conventional applications of technology to psychology are ineffective because they are based on bad statistics, disproven theories, and unfounded pop psychology.</p>

                        <p className='p-0 m-0'>Rather than viewing the human brain some form of mechanistic computer, we use artificial intelligence to reflect complex neural processes and the behaviours that emerge from them.</p>

                        <p className='p-0 m-0'>We use our unique blend of psychology and technology expertise to invent products that can be used to understand and influence with individual and collective human behaviours.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutLithaLabs;
