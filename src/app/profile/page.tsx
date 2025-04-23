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
import { useState, useEffect } from "react";
import { getQuestions, updateQuestion } from "@/services/questions";
import { useToast } from "@/hooks/use-toast";

type Question = {
  id: string;
  question: string;
  answer: string | null;
  username: string | null;
  anonymous: boolean;
};

export default function Profile() {
  const [questionsAnswers, setQuestionsAnswers] = useState<Question[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const allQuestions = await getQuestions(); // Fetch all questions
        // Filter questions where the username matches or the question has an answer
        const filteredQuestions = allQuestions.filter(
          (qa) => qa.username === "Anonymous" || qa.answer !== null || qa.username !== null // Show user-asked questions
        );
        setQuestionsAnswers(filteredQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        toast({
          title: "Error!",
          description: "Failed to load questions. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchQuestions();
  }, []);

  const handleEdit = (index: number, currentAnswer: string) => {
    setEditingIndex(index);
    setAnswerText(currentAnswer || "");
  };

  const handleSave = async (index: number) => {
    const updatedQuestion = questionsAnswers[index];
    try {
      await updateQuestion(updatedQuestion.id, { answer: answerText });

      const updatedQuestionsAnswers = [...questionsAnswers];
      updatedQuestionsAnswers[index] = {
        ...updatedQuestionsAnswers[index],
        answer: answerText,
      };
      setQuestionsAnswers(updatedQuestionsAnswers);
      setEditingIndex(null);
      setAnswerText("");
      toast({
        title: "Success!",
        description: "Answer saved successfully.",
      });
    } catch (error) {
      console.error("Failed to update question:", error);
      toast({
        title: "Error!",
        description: "Failed to save answer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-2xl font-bold mb-4">All User Questions and Answers</h1>
      <div className="w-full max-w-md">
        {questionsAnswers.map((qa, index) => (
          <Card key={qa.id} className="mb-4 bg-card">
            <CardHeader>
              <CardTitle>{qa.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-muted-foreground">
                {qa.anonymous
                  ? "Anonymous"
                  : qa.username
                    ? qa.username
                    : "Unknown"}
              </CardDescription>
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
                  <CardDescription className="text-foreground">
                    {qa.answer || "No answer yet"}
                  </CardDescription>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleEdit(index, qa.answer || "")}
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
