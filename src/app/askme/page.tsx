"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addQuestion } from "@/services/questions";
import { useRouter } from "next/navigation";
import { GeistSans } from 'next/font/google';

const geist = GeistSans({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const [question, setQuestion] = useState("");
  const [username, setUsername] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!question) {
      toast({
        title: "Error",
        description: "Question cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addQuestion({
        question,
        username: username || null,
        anonymous,
      });

      toast({
        title: "Success",
        description: "Question submitted successfully!",
      });

      setQuestion("");
      setUsername("");
      setAnonymous(false);

      // Refresh the questions and profile pages
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit question.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className={`${geist.className} text-2xl font-bold mb-4`}>Ask Anything!</h1>
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md">
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-foreground"
          >
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
          <label
            htmlFor="username"
            className="block text-sm font-medium text-foreground"
          >
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
        <Button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
        >
          Submit Question
        </Button>
      </div>
    </div>
  );
}

