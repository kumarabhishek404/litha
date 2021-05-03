import React from 'react';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import { LITHAPSYCHOLOGY_BG_IMAGE } from '../lib/config';
import dynamic from 'next/dynamic';
import useLang from '../hooks/useLang';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

/**
 * @description litha psychology page
 * @date 06/04/2021 
 * @param imageSrc: string - image url
 * @param heading?: string - 
 */
function LithaPsychology({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    return (
        <Layout>
            <Head pageTitle="About Litha Psychology" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={LITHAPSYCHOLOGY_BG_IMAGE}
                        alt="Conventional methods of understanding human behaviour usually concentrate on the 2% of human awareness"
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutLithaPsychology}</h1>
                        <h2>What Happens Inside, Happens Outside</h2>
                    </div>
                </div>
                <div className='about__section d-flex justify-content-center'>
                <div className='container about__wrapper'>

                        <h2>ABOUT LITHA LABS</h2>

                        <p className='p-0 m-0 mt-1'>Conventional methods of understanding human behaviour usually concentrate on the 2% of human awareness that is conscious and find it challenging to engage with the other 98%. Many applications of psychology go even further than this and completely ignore the 98% of unconscious human awareness.</p>

                        <p className='p-0 m-0'>The 2% of conscious awareness is predominantly logical and rational, working in a simple cause and effect manner. The unconscious 98% of human awareness provides a much deeper understanding of human behaviour.</p>

                        <p className='p-0 m-0'>Engaging with this 98% of awareness requires a quite different perspective than the typical psychological approach. Litha Psychology is based on a solid foundation of contemporary psychological research, including deep expertise in fields such as cognitive linguistics, psycholinguistics and embodied cognition.</p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default LithaPsychology;
