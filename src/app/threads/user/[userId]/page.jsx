import React from "react";
import MainThreadsPage from "@/components/MainThreadsPage";

export default function page({ params }) {

  const { userId } = params

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: "1rem" }}>Profile Stuff</h1>
      <MainThreadsPage userId={userId}/>
    </div>
  );
}
