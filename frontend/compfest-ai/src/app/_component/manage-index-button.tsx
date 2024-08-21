"use client";
import { useState } from "react";

export const ManageIndexButton = () => {
  const [message, setMessage] = useState<string>("Manage Shit");

  const handleClick = async () => {
    try {
      const res = await fetch("/api/manage-index", {
        method: "POST",
      });
      const data = await res.json();

      setMessage(data.message);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 border-2 border-black rounded-lg"
    >
      {message}
    </button>
  );
};
