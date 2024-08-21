function ChatHistory() {
  // Retrieve session data from local storage
  const sessionData = JSON.parse(localStorage.getItem("sessionData")) || [];

  return (
    <div className="chat-history">
      <h3>Chat History</h3>
      <ul>
        {sessionData.length > 0 ? (
          sessionData.map((session, index) => (
            <li key={index}>
              Session ID: {session.sessionID} - Ended at: {session.endTime}
            </li>
          ))
        ) : (
          <li>No chat sessions found.</li>
        )}
      </ul>
    </div>
  );
}

export default ChatHistory;
