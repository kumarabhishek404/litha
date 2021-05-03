import React, { useEffect } from 'react';
import Chatbot from './chatbot';


function index(props) {

    const {
        name,
        botName,
        botURL,
        botImage,
        portName,
        userId,
        sessionId,
        botServerURL,
        botURLwithSender,
        botMsg1,
        botMsg2,
        ...otherProps
    } = props;

    const ProfileImg = 'https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    useEffect(() => {
        console.log("window changes")
        window.botName = botName
        window.botURL = botURL
        window.portName = portName
        window.botURLwithSender = botURLwithSender
        window.botServerURL = botServerURL
        window.senderId = `${botName}_${userId}_${sessionId}`
        window.userAvatar = ProfileImg
        window.botAvatar = botImage
    }, [botURL, botName])

    return (
        <div>
            <Chatbot
                botMsg1={botMsg1}
                botMsg2={botMsg2}
                botImage={botImage}
                botName={name} />
        </div>
    )
}

export default index
