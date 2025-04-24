"use client";

import React from "react";

export default function Dashboard() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <iframe
        src="http://localhost:8000/dashboard/"
        title="Weather Dashboard"
        className="w-[95%] h-[95%] border-2 rounded-xl shadow-lg bg-white"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}