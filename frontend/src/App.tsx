import React from "react";
import TelemetryBoard from "./dashboard/TelemetryBoard";
import "./App.css";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#0b0b0b",
        color: "#f0f0f0",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Hurley Enterprise Telemetry
      </h1>
      <TelemetryBoard />
    </div>
  );
}

export default App;
