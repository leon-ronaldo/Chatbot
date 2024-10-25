import React, { useState } from "react";

//icon imports
import settingsIcon from '../../assets/icons/settings-icon.svg';
import roboIcon from '../../assets/icons/robot-icon.svg';
import sendIcon from '../../assets/icons/send-icon.svg';
import micIcon from '../../assets/icons/mic-icon.svg';
import historyIcon from '../../assets/icons/history-icon.svg';

import {UserChat, BotChat} from '../smartphone-components/SmarphoneComponenets';

import { useEffect } from "react";

function TabletSideBar() {
    return(
        <>
            <div className="tablet-sidebar-container">

            </div>
        </>
    )
}

function ChatSection({gotInput, userName, welcomeMessages, chats}) {

    const [last, setLast] = useState(0);

    useEffect(() => {
        const chatInterface = document.querySelector('.chatbot-chat-interface');
        if (chatInterface) {
            chatInterface.scrollTop = chatInterface.scrollHeight; // Auto-scroll to the bottom when new messages arrive
        }
        setLast(chats.length - 2);
    }, [chats]); 
    
    return(
        <>
            <div className="chatbot-chat-section-chat-box">
            {
                    gotInput && chats.length > 0
                    ? 
                        <div>
                            {chats && chats.map((chat, index) => (
                                chat.type === "user" ? <UserChat userPrompt={chat.message} key={index} keyIndex={index} last={last} /> : <BotChat botReply={chat.message} key={index} />
                            ))}
                        </div>
                    :
                        <div>
                            <p className="chatbot-welcome">
                                Hello <br /> <span style={{fontWeight: "normal"}}>{userName}!</span>
                            </p>
                            <p className="chatbot-welcome-sub">
                                How can I assist you today?
                            </p>
                            <div className="chatbot-welcome-container">
                                {
                                    welcomeMessages.map(message => 
                                        <div className="chatbot-welcome-container-item">
                                            <div>
                                                <img src={message.icon} alt="" className="chatbot-welcome-container-img"/>
                                                <p>{message.text}</p>
                                            </div>
                                            <span><img src={sendIcon} alt="" className="bottom-bar-icons icon-active"/></span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

function TabletChat({chatBotName, gotInput, gotInputSetter, userName, welcomeMessages, chats, userPrompt, userPromptSetter, chatSetter}) {

    const handleReply = (prompt) => {
        return `You asked for "${prompt}" so I will reply to this shortly.`
    }

    const handleSend = (e) => {
        gotInputSetter(true)
        
        if (userPrompt === "") return;
    
        chatSetter(prevChats => [
            ...prevChats,
            {
                type: "user",
                message: `${userPrompt}`
            },
            {
                type: "bot",
                message: handleReply(userPrompt)
            }
        ]);

        userPromptSetter("");
    }

    const handlePromptChange = (e) => {
        userPromptSetter(e.target.value);
    }

    return(
        <>
            <div className="tablet-content-chat">
                <div className="tablet-content-chat-header">
                    <h3>
                        {chatBotName}
                    </h3>
                    <div className="tablet-content-chat-header-options">
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search"
                            />
                            <button className="search-button">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </button>
                        </div>
                        <img src={settingsIcon} alt="" className={`bottom-bar-icons`}/>
                    </div>
                </div>
                <div className="chatbot-chat-section">
                    <ChatSection gotInput={gotInput} chats={chats} userName={userName} welcomeMessages={welcomeMessages} />
                    <div className="chatbot-chat-section-input-section">
                        <img src={micIcon} alt="" className={`bottom-bar-icons icon-active`}/>
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Chat"
                                value={userPrompt}
                                onChange={handlePromptChange}
                            />
                            <button className="search-button">
                                <img src={roboIcon} alt="" />
                            </button>
                        </div>
                        <img src={sendIcon} alt="" className={`chatbot-input-send-icon`} onClick={handleSend}/>
                    </div>
                </div>
            </div>
        </>
    )    
}

function TabletHistory({historyMessages}) {
    return(
        <>
            <div className="tablet-content-history">
                <div className="tablet-content-history-header">
                    <h3>
                        History
                    </h3>
                    <p className="bottom-bar-icons icon-active" style={{fontSize: "smaller"}}>
                        50
                    </p>
                </div>
                <div className="chatbot-history-section">
                    <div className="chatbot-history-container">
                        {
                            historyMessages.map((message, key) => 
                                <div className="tablet-chatbot-history-container-item" key={key}>
                                    <div className="tablet-chatbot-history-container-item-context">
                                        <img src={historyIcon} alt="" className="chatbot-history-container-img"/>
                                        <p>{`${message}sssssssssssssssssssssssssssssssssssssssssssssssssss`}</p>
                                    </div>
                                    <p style={{fontWeight: 'bolder'}}>:</p>
                                </div>
                            )
                        }
                        {
                            historyMessages.map((message, key) => 
                                <div className="tablet-chatbot-history-container-item" key={key}>
                                    <div className="tablet-chatbot-history-container-item-context">
                                        <img src={historyIcon} alt="" className="chatbot-history-container-img"/>
                                        <p>{message}</p>
                                    </div>
                                    <p style={{fontWeight: 'bolder'}}>:</p>
                                </div>
                            )
                        }
                        {
                            historyMessages.map((message, key) => 
                                <div className="tablet-chatbot-history-container-item" key={key}>
                                    <div className="tablet-chatbot-history-container-item-context">
                                        <img src={historyIcon} alt="" className="chatbot-history-container-img"/>
                                        <p>{message}</p>
                                    </div>
                                    <p style={{fontWeight: 'bolder'}}>:</p>
                                </div>
                            )
                        }
                        {
                            historyMessages.map((message, key) => 
                                <div className="tablet-chatbot-history-container-item" key={key}>
                                    <div className="tablet-chatbot-history-container-item-context">
                                        <img src={historyIcon} alt="" className="chatbot-history-container-img"/>
                                        <p>{message}</p>
                                    </div>
                                    <p style={{fontWeight: 'bolder'}}>:</p>
                                </div>
                            )
                        }   
                    </div>
                </div>
            </div>
        </>
    )
}
 
function TabletContent({chatBotName, gotInput, gotInputSetter, userName, welcomeMessages, historyMessages, chats, userPrompt, userPromptSetter, chatSetter}) {
    return(
        <>
            <div className="tablet-content-container">
                <TabletChat userPromptSetter={userPromptSetter} gotInputSetter={gotInputSetter}  userPrompt={userPrompt} chatSetter={chatSetter} chatBotName={chatBotName} gotInput={gotInput} chats={chats} userName={userName} welcomeMessages={welcomeMessages} />
                <TabletHistory historyMessages={historyMessages}/>
            </div>
        </>
    )
}

export {TabletSideBar, TabletContent}