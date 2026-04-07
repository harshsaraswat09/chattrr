import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Join = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/chat/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="grow flex items-center justify-center px-6">
        <form
          onSubmit={handleJoin}
          className="w-full max-w-md p-8 rounded-3xl bg-neutral-50"
        >
          <h2 className="text-3xl font-black mb-6 text-center">Join a Room</h2>
          <input 
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e)=>setRoomId(e.target.value)}
            className="w-full px-5 py-4 rounded-xl mb-4 bg-white" 
          />
          <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all active:scale-95">
            Connect Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
