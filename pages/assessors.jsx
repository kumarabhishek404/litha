import React from 'react';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import { WORKING_WITH_ASSESSMENTS_BG_IMAGE } from '../lib/config';
import dynamic from 'next/dynamic';
import useLang from '../hooks/useLang';
import Chatbot from '../components/chatbot/index';
import { useRouter } from 'next/router';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

const Accessors = ({ imageSrc, heading, subHeading }) => {
    const [lang] = useLang();
    const { query={} } = useRouter()
    const botName = query.bot || "PHQ-9"

    return (
        <Layout>
            <Head pageTitle="Working With Assessors" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={WORKING_WITH_ASSESSMENTS_BG_IMAGE}
                        alt="Each Litha Assessor follows the format provided by the formal questionnaire for whichever assessment is being used."
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.workingWithAssessors}</h1>
                        <h2>Understanding How You Feel</h2>
                    </div>
                </div>
                <div className='about__section d-flex justify-content-center'>
                <div className='container about__wrapper'>

                        <h2>WORKING WITH ASSESSORS</h2>

                        <p className='p-0 m-0 mt-1'>Each Litha Assessor follows the format provided by the formal questionnaire for whichever assessment is being used. The user simply engages in conversation with the specific Litha Assessor, a process which typically takes a few minutes.</p>

                        <p className='p-0 m-0'>Whereas in a conventional assessment setting, a user may feel judged by the human Assessor, they usually feel that they can be more open and authentic with the Litha Assessor.</p>

                        <p className='p-0 m-0'>This can be a common challenge in any form of face-to-face assessment as clients and patients often try to please the assessor rather than actually expressing how they really feel and how their experiences may have affected them.</p>

                    </div>
                </div>

            </div>
        </Layout>
    )
}


export default Accessors;
