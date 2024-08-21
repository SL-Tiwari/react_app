import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ChatComponent from "./pages/ChatComponent";
import NavBar from "./Components/NavBar";
import ChatStats from "./Components/ChatStats";
import ChatHistory from "./Components/ChatHistory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/start-chat" element={<ChatComponent />} />
          <Route exact path="/chat-history" element={<ChatHistory />} />
          <Route exact path="/chat-stats" element={<ChatStats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
