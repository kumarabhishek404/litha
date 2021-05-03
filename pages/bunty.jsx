import React from 'react';
import Image from '../components/Images/Image';
import Layout from '../components/Layout/index';
import { BUNTY_BG_IMAGE } from '../lib/config';
import dynamic from 'next/dynamic';
import useLang from '../hooks/useLang';
import Chatbot from '../components/chatbot/index';
import { useRouter } from 'next/router';
import { getCookie } from '../lib/session';

const Head = dynamic(() => import("../components/html/head"), { ssr: false });

function Bunty({ imageSrc, heading, subHeading }) {
    const [lang] = useLang()
    const { query = {} } = useRouter()
    const botName = query.bot || "PHQ-9"
    const userId = getCookie('userId')
    const sessionId = getCookie('sessionId')
    return (
        <Layout>
            <Head pageTitle="About Bunty" />
            <div className='d-flex flex-column align-items-center'>
                <div className='landing__section'>
                    <Image
                        className='landing__image position-relative'
                        src={BUNTY_BG_IMAGE}
                        alt="Bunty is our Psychotherapist Conversationer. Whereas conventional therapy chat bots use ineffective and overly prescriptive methods of user engagement,"
                        width='100%'
                        height='100%' />

                    <div className='landing__overlay'></div>

                    <div className='landing__heading position-absolute w-100 text-center text-light'>
                        <h1>{lang.aboutBunty}</h1>
                        <h2>AI Psychotherapist</h2>
                    </div>
                </div>
                <div className='about__section d-flex justify-content-center'>
                    <div className='container about__wrapper'>

                        <h2>ABOUT BUNTY</h2>

                        <p className='p-0 m-0 mt-1'>Bunty is our Psychotherapist Conversationer. Whereas conventional therapy chat bots use ineffective and overly prescriptive methods of user engagement, Bunty creates a safe and secure listening space for the user.</p>

                        <p className='p-0 m-0'>Users can choose which type of talking therapy they would like to engage in with Bunty, such as Clean Language, Rational Emotive Behaviour Therapy, and Emotionally Focused Therapy.</p>

                        <p className='p-0 m-0'>Bunty can provide any type of therapy morphology and switch seamlessly between morphologies during the course of a single conversation.</p>

                        <p className='p-0 m-0'>This is achieved by actively listening not only to what the user is actually saying but also inferring what they are not saying but would like to articulate.</p>
                    </div>
                </div>
            </div>
            <Chatbot
                name='Bunty'
                botImage="https://imgur.com/6BQUrQW.png"
                botName={botName}
                portName="5020"
                userId={userId}
                sessionId={sessionId}
                botURLwithSender={`https://bunty-bot.litha.org.uk/conversations/${botName}_${userId}_${sessionId}/execute`}
                botServerURL="https://bunty-action.litha.org.uk/webhook/"
                botURL='https://bunty-bot.litha.org.uk/webhooks/rest/webhook' />
        </Layout>
    )
}


export default Bunty;
