"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getQuestions, addQuestion } from "@/services/questions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Question = {
  id: string;
  question: string;
  answer: string | null;
  username: string | null;
  anonymous: boolean;
};

export default function AskMe() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [username, setUsername] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await getQuestions();
        setQuestions(questions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        toast({
          title: "Error fetching questions!",
          description: "Failed to load questions. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newQuestion.trim()) {
      toast({
        title: "Error!",
        description: "Question cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    try {
      const questionData = {
        question: newQuestion,
        username: anonymous ? null : username || "Anonymous", // Default username
        anonymous: anonymous,
      };
      const newQuestionResponse = await addQuestion(questionData);
      setQuestions((prevQuestions) => [...prevQuestions, newQuestionResponse]);
      setNewQuestion("");
      toast({
        title: "Success!",
        description: "Question submitted successfully.",
      });
    } catch (error) {
      console.error("Failed to add question:", error);
      toast({
        title: "Error!",
        description: "Failed to submit question. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-3xl font-bold mb-4 font-sans">Ask Me Anything</h1>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Question:</Label>
              <Input
                type="text"
                id="question"
                placeholder="Enter your question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Your Name (Optional):</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={anonymous}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={anonymous}
                onCheckedChange={(checked) => {
                  setAnonymous(checked || false);
                  if (checked) {
                    setUsername(""); // Clear username if anonymous is checked
                  }
                }}
              />
              <Label htmlFor="anonymous">Ask Anonymously</Label>
            </div>
            <Button type="submit">Submit Question</Button>
          </div>
        </form>

        {questions.length > 0 ? (
          questions.map((question) => (
            <Card key={question.id} className="mb-4 bg-card">
              <CardHeader>
                <CardTitle>{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  {question.anonymous
                    ? "Anonymous"
                    : question.username
                      ? question.username
                      : "Unknown"}
                </CardDescription>
                {question.answer && (
                  <p className="text-sm mt-2">Answer: {question.answer}</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No questions available.</p>
        )}
      </div>
    </div>
  );
}
