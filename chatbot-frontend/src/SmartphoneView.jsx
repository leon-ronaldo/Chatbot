import React, { useState } from "react";
import profile from './assets/images/profile.jfif';

//component imports
import {TopBar, BottomBar, Content} from './components/smartphone-components/SmarphoneComponenets';

//icon imports
import menuIcon from './assets/icons/menu-icon.svg';
import historyIcon from './assets/icons/history-icon.svg';
import chatIcon from './assets/icons/chat-icon.svg';
import settingsIcon from './assets/icons/settings-icon.svg';
import sendIcon from './assets/icons/send-icon.svg';

import './styles/smartphone.css';

function SmartphoneView() {
    const [gotInput, setGotInput] = useState(false);
    const [userPrompt, setUserPrompt] = useState("");
    const [chats, setChats] = useState([]);

    const welcomeMessages = [
        {
            icon: settingsIcon,
            text: "Ask me how to cook some rice"
        },
        {
            icon: chatIcon,
            text: "Ask me some topic content to start a conversation"
        },
        {
            icon: chatIcon,
            text: "Ask me some topic content to start a conversation"
        }
    ]

    const historyMessages = [
        "Css grid auto fill",
        "Html cheatsheet!",
        "What is racoon homicide?"
    ]

    return(
        <>
            <div className="smartphone-main-container">
                <TopBar profilePicture={profile}/>  
                <Content chats={chats} gotInput={gotInput} userName={"Leon Ronaldo"} welcomeMessages={welcomeMessages} historyMessages={historyMessages}/> 
                <BottomBar userPrompt={userPrompt} userPromptSetter={setUserPrompt} gotInputSetter={setGotInput} chats={chats} chatsSetter={setChats}/>
            </div>
        </>
    );
}

export default SmartphoneView;