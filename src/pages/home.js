import React from "react";
import "./home.css";
import rexImage from "../assets/rex.png"; // Adjust the path as necessary

function Home() {
    return (
        <div id="body">
            <img src={rexImage} alt="Rex" id="rex-image" />
            <div id="content">
                <h1>Welcome to the Chat App</h1>
                <p>Click the Start Button to start a Chat</p>
            </div>
        </div>
    );
}

export default Home;
