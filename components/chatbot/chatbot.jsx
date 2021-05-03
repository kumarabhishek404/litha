import React, { useEffect, useState } from 'react';
import { openBot, clearChat, closeBot, setUserResponse, botClicked, send, hitEnter, restartConversation, sendMessageFromButton } from '../../lib/chatbot/chat';
import { authenticate, redirectRoute, handleLogout, close_drawer } from '../../lib/global';
import ProfileDropdownMenu from '../Dropdown/dropdownMenu';
import LockIcon from '@material-ui/icons/Lock';
import useAuth from '../../hooks/useAuth';
// import {send} from '../../lib/chat';


function chatbot(props) {
    const [auth] = useAuth();
    const [botWelcomeImage, setBotWelcomeImage] = useState()
    const [showBotTyping, setShowBotTyping] = useState(null)
    const [showBotImage, setShowBotImage] = useState(null)
    
        const {
            botImage,
            botName,
            botMsg1,
            botMsg2,
            ...otherProps
        } = props;

    console.log(auth);
    useEffect(() => {
        let botOpened = window.botOpened
        setTimeout(() => {
            setShowBotTyping(botOpened || false)
            setShowBotImage(true)
            console.log(botOpened);
        }, 1000);
        // const botAvatar = window.botAvatar
        setBotWelcomeImage(botImage || 'https://imgur.com/6BQUrQW.png')
    }, [openBot, closeBot])

    const [botImageURL, setbotImageURL] = useState('')
    const [botNameString, setBotNameString] = useState('')

    const orientersItems = [
        {
            icon: '',
            iconWidth: "",
            iconHeight: "",
            label: "Clear",
            onClick: () => clearChat()
        },
        {
            icon: '',
            iconWidth: "",
            iconHeight: "",
            label: "Restart",
            onClick: () => restartConversation()
        }
    ]


    useEffect(() => {
        // clearChat()
        // setUserResponse()
        setbotImageURL(botImage || '/img/demoBotImage.png')
        setBotNameString(botName)
    })

    return (
        <div className="chatbot__container">
            <div className="widget">
                <div className="chat_header d-flex justify-content-between align-items-center">
                    <i className="fa fa-times chat_header_cancel" onClick={closeBot} id="close" aria-hidden="true"></i>
                    <span className="chat_header_title">{botNameString}</span>

                    <div className='chat_header_action d-flex text-light p-0 m-0'>
                        <p className='p-0 m-0 mx-2' onClick={clearChat}>Clear</p>
                        <p className='p-0 m-0' onClick={restartConversation}>Restart</p>
                    </div>
                    {/* <ProfileDropdownMenu button="About" menuItems={orientersItems}  /> */}

                    {/* <span className="dropdown-trigger" href="#" data-target={`${(botName).replace(' ','_')}`}>
                        <i className="material-icons"> more_vert </i>
                    </span>

                    <ul id={(botName).replace(' ','_')} className="dropdown-content">
                        <li><a href="#" onClick={clearChat} id="clear">Clear</a></li>
                        <li><a href="#" onClick={restartConversation} id="restart">Restart</a></li>
                        <li><a href="#" id="close">Close</a></li>
                    </ul> */}
                </div>

                <div className="chats" id="chats">
                    <div className='clearfix welcome__message'>
                        <img class="botAvatar"
                            src={`${botWelcomeImage}`}
                            style={{
                                animation: "animateElement linear 0.2s",
                                animationIterationCount: '1'
                            }} />
                        <p className='botMsg'>
                            {/* {botMsg1} */}
                            {`Hello! I'm your ${botName} Assessor, a helpful Assessor who contributes to your psychological well-being. My task is to analyze your answers and help you with the diagnosis and treatment of any mental health issues.`}
                        </p>
                        {/* {
                            showBotTyping
                                ? <div class="botTyping"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
                                : <p className='botMsg'>
                                    Welcoming visitors is an excellent way of improving user experience (UX). It can set the tone for the rest of their visit on your site.
                                </p>
                        } */}
                    </div>
                    <div className='clearfix welcome__message'>
                        <img class="botAvatar"
                            src={`${botWelcomeImage}`}
                            style={{
                                animation: "animateElement linear 0.2s",
                                animationIterationCount: '1'
                            }} />
                        <p className='botMsg'>
                            {/* {botMsg2} */}
                            Is it OK if I ask you just 2 questions to make the evaluation?
                            </p>
                        {/* {
                            showBotTyping
                                ? <div class="botTyping"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>
                                : <p className='botMsg'>
                                    Welcoming visitors is an excellent way of improving user experience (UX). It can set the tone for the rest of their visit on your site.
                                </p>
                        } */}
                    </div>
                    <div className="clearfix"></div>
                </div>

                <div className="keypad d-flex">
                    {/* <textarea
                        id="userInput"
                        placeholder="Type a message..."
                        className="usrInput"
                        onKeyPress={hitEnter}
                    ></textarea> */}
                    {/* <p>
                        <strong>
                            Solution with span:
                            </strong>
                        <span
                            id="userInput"
                            placeholder="Type a message..."
                            // className="usrInput"
                            className="textarea"
                            role="textbox"
                            onKeyPress={hitEnter}
                            contenteditable>
                        </span>
                    </p> */}
                    <span
                        id="userInput"
                        onKeyPress={hitEnter}
                        placeholder="Type a message..."
                        className="chatbot__textarea usrInput"
                        role="textbox"
                        contenteditable='true' />
                    <div onClick={sendMessageFromButton} id="sendButton">
                        <i className="fa fa-paper-plane" style={{color: '#004b6a'}} aria-hidden="true"></i>
                    </div>
                </div>
            </div>

            <div className="profile_div" id="profile_div">
                {
                    !auth
                        ? (<div className='bot__lock' onClick={() => { authenticate(auth) }} >
                            <LockIcon style={{ fontSize: '50px' }} />
                        </div>)
                        : <></>
                }
                {
                    showBotImage
                        ? <img className="imgProfile" onClick={() => { openBot() }} style={{ opacity: auth ? '1' : '0.2', pointerEvents: auth ? 'all' : 'none' }} src={botImageURL} alt="bot image" />
                        : <></>
                }
            </div>
        </div>

    )
}

export default chatbot
