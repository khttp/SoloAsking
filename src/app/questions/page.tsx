"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getQuestions } from "@/services/questions";

type Question = {
  id: string;
  question: string;
  answer: string | null;
  username: string | null;
  anonymous: boolean;
};

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await getQuestions();
        setQuestions(questions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        // Consider adding a toast notification to inform the user about the error
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-2xl font-bold mb-4">All Questions</h1>
      <div className="w-full max-w-md">
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
                  <p className="text-sm mt-2">
                    Answer: {question.answer}
                  </p>
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

