import React, { useEffect } from "react";
import { useState } from "react";

//icon imports
import menuIcon from '../../assets/icons/menu-icon.svg';
import historyIcon from '../../assets/icons/history-icon.svg';
import chatIcon from '../../assets/icons/chat-icon.svg';
import settingsIcon from '../../assets/icons/settings-icon.svg';
import sendIcon from '../../assets/icons/send-icon.svg';
import editIcon from '../../assets/icons/edit-icon.svg';
import robotIcon from '../../assets/icons/robot-icon.svg';


function TopBar({profilePicture}) {
    return(
        <>
            <div className="top-bar">
                <img src={menuIcon} alt="" className={`bottom-bar-icons`}/>
                <img src={profilePicture} className="profile-picture" alt="" />
            </div>
        </>
    )
}

function BottomBar({userPrompt, userPromptSetter, gotInputSetter, chats, chatsSetter}) {

    const handleReply = (prompt) => {
        return `You asked for "${prompt}" so I will reply to this shortly.`
    }

    const handleSend = () => {
        if (userPrompt === "") return;
    
        chatsSetter(prevChats => [
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

    const handleUserInput = (e) => {
        userPromptSetter(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        gotInputSetter(true);
        handleSend();
    }

    return(
        <>
            <div className="bottom-bar">
                <input type="text" className="chatbot-text-input" value={userPrompt} onChange={handleUserInput} placeholder="Type or enter a prompt"/>
                <img src={sendIcon} alt="" className={`bottom-bar-icons icon-active chatbot-input-send-icon`} onClick={handleSubmit}/>
            </div>
        </>
    )
}

function UserChat({userPrompt}) {
    return(
        <>
            <div className="user-chat-container">
                <div style={{display: "flex", alignItems: "center"}}>
                    <img src={editIcon} alt="" onClick={() => {}}/>
                    <div className="user-chat-bubble">
                        <p> {userPrompt} </p>
                    </div>
                </div>
            </div>
        </>
    );
}

function BotChat({botReply}) {
    return(
        <>
            <div className="bot-chat-container">
                <div style={{display: "flex", alignItems: "center"}}>
                    <img src={robotIcon} alt="" onClick={() => {}}/>
                    <div className="bot-chat-bubble">
                        <p> {botReply} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

function Content({gotInput, userName, welcomeMessages, historyMessages, chats}) {

    useEffect(() => {
        const chatInterface = document.querySelector('.chatbot-chat-interface');
        if (chatInterface) {
            chatInterface.scrollTop = chatInterface.scrollHeight; // Auto-scroll to the bottom when new messages arrive
        }
    }, [chats]);  

    return(
        <>
            <div className="chatbot-content">
                {
                    gotInput && chats.length > 0
                    ? 
                        <div className="chatbot-chat-interface">
                            {chats && chats.map((chat, index) => (
                                chat.type === "user" ? <UserChat userPrompt={chat.message} key={index}/> : <BotChat botReply={chat.message} key={index} />
                            ))}
                        </div>
                    :
                        <div className="chatbot-chat-welcome">
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
                                            <span><img src={sendIcon} alt="" /></span>
                                        </div>
                                    )
                                }
                            </div>

                            <p> Previous chats </p>

                            <div className="chatbot-history-container">
                                {
                                    historyMessages.map(message => 
                                        <div className="chatbot-history-container-item">
                                            <div className="chatbot-history-container-item-context">
                                                <img src={historyIcon} alt="" className="chatbot-history-container-img"/>
                                                <p>{message}</p>
                                            </div>
                                            <p style={{fontWeight: 'bolder'}}>:</p>
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

export {TopBar, BottomBar, Content}