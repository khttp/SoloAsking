"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type QuestionAnswer = {
  question: string;
  answer: string;
};

export default function Profile() {
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>([
    { question: "What is your favorite color?", answer: "Blue" },
    { question: "What is your favorite food?", answer: "Pizza" },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");

  const handleEdit = (index: number, currentAnswer: string) => {
    setEditingIndex(index);
    setAnswerText(currentAnswer);
  };

  const handleSave = (index: number) => {
    const updatedQuestionsAnswers = [...questionsAnswers];
    updatedQuestionsAnswers[index] = {
      ...updatedQuestionsAnswers[index],
      answer: answerText,
    };
    setQuestionsAnswers(updatedQuestionsAnswers);
    setEditingIndex(null);
    setAnswerText("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="w-full max-w-md">
        {questionsAnswers.map((qa, index) => (
          <Card key={index} className="mb-4 bg-card">
            <CardHeader>
              <CardTitle>{qa.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {editingIndex === index ? (
                <div className="flex flex-col gap-2">
                  <Textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    className="border rounded-md p-2 text-foreground"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleSave(index)}
                      className="bg-primary text-primary-foreground hover:bg-primary/80"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <CardDescription className="text-foreground">{qa.answer}</CardDescription>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleEdit(index, qa.answer)}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      Answer
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
