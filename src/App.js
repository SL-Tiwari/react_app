import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/home';
import ChatComponent from './pages/ChatComponent'

function App()
{
  return (
    <BrowserRouter>
      <Routes>  
      <Route exact path="/" element={<Home/>}/>
       <Route exact path="/chat" element={<ChatComponent/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;