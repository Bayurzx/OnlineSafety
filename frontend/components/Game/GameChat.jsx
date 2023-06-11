import React, { useEffect, useState } from "react";
import { ListOfQuestions } from "../../data/localDb";
import { Modal } from "antd";

export default function GameChat({ isChat, setIsChat, questionNumber }) {

    const chats = ListOfQuestions[questionNumber].chats
    const chatPerson = ListOfQuestions[questionNumber].chatPerson
    const chatTopic = ListOfQuestions[questionNumber].chatTopic
    const chatFacts = ListOfQuestions[questionNumber].chatFacts
    const [currentChatIndex, setCurrentChatIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentChatIndex((prevIndex) => prevIndex + 1);
        }, 7000);

        return () => clearTimeout(timeout)
    }, [isChat, currentChatIndex]);

    const renderChat = (chatIndex) => {
        const chat = chats[chatIndex];
        if (chatIndex >= chats.length - 1) {
            setCurrentChatIndex(prevIndex => 0)
        }
        // console.log("isChat", isChat);
        // console.log('chatIndex', chatIndex, 'chats.length', chats.length, "chats.id", ListOfQuestions[questionNumber].id);
        // console.log("chat", chat);
        return (
            <>
                <div style={myStyleChatOut}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{chatPerson.in}:</p>

                    {chat.in && <p dangerouslySetInnerHTML={{ __html: chat.in }} />}
                </div>
                <div style={myStyleChatIn}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{chatPerson.out}:</p>

                    {/* {chat.out && <p>{chat.out}</p>} */}
                    <p dangerouslySetInnerHTML={{ __html: chat.out }} />

                </div>
            </>
        );
    };


    const myStyleBody = {
        display: "flex",
        flexDirection: "column",
        alignItems: "right",
        padding: "20px",
    };

    const myStyleChatOut = {
        marginTop: "10%",
        background: "#f5f5f5",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
        textAlign: "right",
        width: "60%",
        marginLeft: "40%",
        marginBottom: "40px",
    };

    const myStyleChatIn = {
        background: "#f5f5f5",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
        width: "60%",
        marginRight: "40%",
    };

    const myCentredNugget = {
        marginTop: "10%",
        background: "#f5f5f5",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "10px",
        textAlign: "center",
    };



    return (
        <div>
            <Modal
                open={isChat}
                onCancel={() => setIsChat(false)}
                footer={null}
                centered
                width="80%"
                bodyStyle={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), #020230), url('/assets/bg_dialog.gif') center" }}

            >

                <div style={myStyleBody}>
                    <div style={myCentredNugget}>
                        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{chatTopic}:</p>
                        <ul>
                            {chatFacts.map((facts, i) => (
                                <li key={i} style={{padding: "10px"}}>
                                    {/* <p>📃 {facts}</p> */}
                                    <p dangerouslySetInnerHTML={{ __html: facts }} />
                                </li>
                            ))}
                        </ul>

                    </div>


                    <div>
                        <div>{currentChatIndex < chats.length && renderChat(currentChatIndex)}</div>
                    </div>
                </div>
            </Modal>
        </div>

    );
}
