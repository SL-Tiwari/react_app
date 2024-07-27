import { Button } from "@chatscope/chat-ui-kit-react";
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    return (
        <div id="body">
            <h1> Welcome to the Chat App</h1>
            <p> Click the button below to start a Chat </p>
            <Link to="/chat">
                <Button id="btn-start">Start Chat </Button>
            </Link>
        </div>

    )
}

export default Home;



