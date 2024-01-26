import React from "react";
import Chatboat from "../components/Chatboat";

const ChatSupport = () => {
  return (
    <div className="bg-white shadow-md mb-6 container mx-auto">
      <div className="text-md pb-4 flex items-center justify-start gap-x-4 pt-4 px-2 border border-b-4">
        <img src="/flipkart-icon.svg" className="w-8 h-8 rounded-full" alt="" />
        <span>Flip2kart Support</span>
      </div>

      <div className="h-96 bg-green-40 p-2 bg-green-200">
        <Chatboat />
      </div>
    </div>
  );
};

export default ChatSupport;
