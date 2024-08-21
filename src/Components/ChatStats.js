import React from "react";
import { ResponsiveBar } from "@nivo/bar";

function ChatStats() {
  // Retrieve session data from local storage
  const sessionData = JSON.parse(localStorage.getItem("sessionData")) || [];

  // Check if sessionData is an array and ensure it's not empty
  if (!Array.isArray(sessionData)) {
    console.error("Invalid session data format");
    return <p>No chat sessions found.</p>;
  }

  // Process the session data to count the number of chats per day
  const chatCounts = sessionData.reduce((acc, session) => {
    // Convert endTime to a date object
    const date = new Date(session.endTime);
    const dateString = date.toLocaleDateString(); // Format date as 'MM/DD/YYYY'

    // Increment the count for this date
    if (acc[dateString]) {
      acc[dateString]++;
    } else {
      acc[dateString] = 1;
    }

    return acc;
  }, {});

  // Convert the chatCounts object to an array of objects suitable for Nivo
  const data = Object.entries(chatCounts).map(([date, count]) => ({
    date,
    count,
  }));

  // Render the Nivo Bar chart with the processed data
  return (
    <div style={{ height: "700px", width: "1200px" }}>
      {data.length > 0 ? (
        <ResponsiveBar
          data={data}
          keys={["count"]}
          indexBy="date"
          margin={{ top: 50, right: 130, bottom: 50, left: 80 }}
          padding={0.3}
          colors={{ scheme: "nivo" }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Number of Chats",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          tooltip={({ value }) => <div>{value} Chats</div>}
        />
      ) : (
        <p>No chat sessions found.</p>
      )}
    </div>
  );
}

export default ChatStats;
