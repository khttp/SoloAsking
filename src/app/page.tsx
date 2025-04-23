"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [username, setUsername] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async () => {
    // Handle question submission logic here
    console.log("Question:", question);
    console.log("Username:", username);
    console.log("Anonymous:", anonymous);

    // Reset input fields
    setQuestion("");
    setUsername("");
    setAnonymous(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-2xl font-bold mb-4">Ask Anything!</h1>
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-foreground">
            Question:
          </label>
          <Input
            type="text"
            id="question"
            className="mt-1 p-2 w-full border rounded-md text-foreground"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-foreground">
            Your Name (Optional):
          </label>
          <Input
            type="text"
            id="username"
            className="mt-1 p-2 w-full border rounded-md text-foreground"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          <label htmlFor="anonymous" className="text-sm text-foreground">
            Ask Anonymously
          </label>
        </div>
        <Button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
          Submit Question
        </Button>
      </div>
    </div>
  );
}
