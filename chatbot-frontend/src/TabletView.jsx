import React from "react";
import './styles/TabletView.css';

import { useState } from "react";

import { TabletContent, TabletSideBar } from "./components/tablet-components/TabletComponents";

//icon imports
import menuIcon from './assets/icons/menu-icon.svg';
import historyIcon from './assets/icons/history-icon.svg';
import chatIcon from './assets/icons/chat-icon.svg';
import settingsIcon from './assets/icons/settings-icon.svg';
import sendIcon from './assets/icons/send-icon.svg';


function TabletView() {
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
            <div className="tablet-main">
                <TabletSideBar />
                <TabletContent chatSetter={setChats} gotInputSetter={setGotInput} gotInput={gotInput} userPrompt={userPrompt} userPromptSetter={setUserPrompt} chatBotName={"Chatbot"} welcomeMessages={welcomeMessages} historyMessages={historyMessages} chats={chats} userName={"Leon ronaldo"}/>
            </div>
        </>
    );
}

export default TabletView;