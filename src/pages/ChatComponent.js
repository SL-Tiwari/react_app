import { useState } from 'react';
import '../pages/ChatComponent.css'
import { Link } from 'react-router-dom';
import { Button } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
const API_KEY1 = "sk-proj-B6NU3PG0mMRinHtRxQemT3BlbkFJjb1d8LIGzDZ8SBzJeviA";

function ChatComponent() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello Sahil!, Welcome to the Chat App. I Am ChatGPT!.",
      sender: "ChatGPT",
      direction: "incoming"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts as if I am 10 years old"
    };

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage, ...apiMessages]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY1}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const gptMessage = data.choices[0].message.content;

        const newMessage = {
          message: gptMessage,
          sender: "ChatGPT",
          direction: "incoming"
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="App">

      <h1 id="heading">Cosmos Chat UI</h1>
      <Link to="/"> <Button id='btn-home' > Home</Button>  </Link>

      <div className="chat-container">
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="ChatGPT is Typing..." /> : null}
              className="MessageList">
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder='Type Message here' onSend={handleSend} className="MessageInput" />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ChatComponent;
