import React, { useState } from "react";

interface WebhookSetupProps {
  token: string;
}

const WebhookSetup: React.FC<WebhookSetupProps> = ({ token }) => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [message, setMessage] = useState("");

  const handleSetupWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/createWebhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, owner, repo }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Webhook set up successfully!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessage("Error setting up webhook. Please try again.");
    }
  };

  return (
    <div>
      <h2>Set up GitHub Webhook</h2>
      <form onSubmit={handleSetupWebhook}>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Repository Owner"
          required
        />
        <input
          type="text"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="Repository Name"
          required
        />
        <button type="submit">Set up Webhook</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default WebhookSetup;
