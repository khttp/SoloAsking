"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  question: string;
  username: string | null;
  anonymous: boolean;
};

export default function UnansweredQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Replace this with your actual data fetching logic from a database or API
    const fetchedQuestions: Question[] = [
      {
        id: "1",
        question: "What is the meaning of life?",
        username: null,
        anonymous: true,
      },
      {
        id: "2",
        question: "How to achieve world peace?",
        username: "john_doe",
        anonymous: false,
      },
      {
        id: "3",
        question: "Is time travel possible?",
        username: null,
        anonymous: true,
      },
    ];

    setQuestions(fetchedQuestions);
  }, []);

  const unansweredQuestions = questions.filter(
    (question) => !question.answer
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-2xl font-bold mb-4">Unanswered Questions</h1>
      <div className="w-full max-w-md">
        {unansweredQuestions.length > 0 ? (
          unansweredQuestions.map((question) => (
            <Card key={question.id} className="mb-4 bg-card">
              <CardHeader>
                <CardTitle>{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {question.anonymous
                    ? "Anonymous"
                    : question.username
                    ? question.username
                    : "Unknown"}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No unanswered questions.</p>
        )}
      </div>
    </div>
  );
}
