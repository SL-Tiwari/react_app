import React from "react";
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>  
      <div className="navbar">
        <Link className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</Link>
        <Link to="/start-chat"><i className="fa fa-fw fa-wechat"></i> Start Chat</Link>
        <Link to="/chat-history"><i className="fa fa-fw fa-history"></i> Chat History</Link>
        <Link to="/chat-stats"><i className="fa fa-fw fa-bar-chart"></i> Chat Stats</Link>
        <div className="navbar-title">
          <span>Cosmos Chat UI</span>
        </div>
      </div>
    </>
  );
}

export default NavBar;
