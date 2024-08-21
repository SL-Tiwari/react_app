import { useState } from "react";
import "../pages/ChatComponent.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const { v4: uuidv4 } = require("uuid");

function ChatComponent() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello Sahil!, Welcome to the Chat App. I Am ChatGPT!.",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const [sessionID, setSessionID] = useState(uuidv4());

  const handleEndChat = () => {
    alert("Chat Ended and Session ID Stored in Local storage");

    // Retrieve existing session data from local storage
    let sessionData = JSON.parse(localStorage.getItem("sessionData")) || [];

    if (!Array.isArray(sessionData)) {
      sessionData = [];
    }

    // Create a new session object with the session ID and end time
    const newSession = {
      sessionID: sessionID,
      endTime: new Date().toLocaleString(), // Save the current date and time
    };

    // Add the new session object to the array
    sessionData.push(newSession);

    // Store the updated array back to local storage
    localStorage.setItem("sessionData", JSON.stringify(sessionData));

    // Generate a new session ID and set it to state
    const newSessionID = uuidv4();
    setSessionID(newSessionID);

    console.log("Old Session Data Stored:", sessionData);
    console.log("New Session ID Generated:", newSessionID);
  };

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    // Simulate a short delay before showing typing indicator
    setTyping(true);

    setTimeout(async () => {
      await processMessageToChatGPT(newMessages);
    }, 3000); // 3-second delay before processing the message
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts as if I am 10 years old",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const gptMessage = data.choices[0].message.content;

        const newMessage = {
          message: gptMessage,
          sender: "ChatGPT",
          direction: "incoming",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      // Set typing to false after the response has been processed
      setTyping(false);
    }
  }

  return (
    <div className="App">
      <div className="chat-session">
        <h5>Current Session ID: {sessionID}</h5>
      </div>
      <div className="chat-container">
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                typing ? (
                  <TypingIndicator content="ChatGPT is Typing..." />
                ) : null
              }
              className="MessageList"
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type Message here"
              onSend={handleSend}
              className="MessageInput"
            />
          </ChatContainer>
        </MainContainer>
        <button id="btn-end-chat" onClick={handleEndChat}>
          End Chat
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
