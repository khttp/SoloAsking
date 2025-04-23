let questions: {
  id: string;
  question: string;
  username: string | null;
  anonymous: boolean;
  answer: string | null;
}[] = [
  {
    id: "1",
    question: "What is the meaning of life?",
    username: null,
    anonymous: true,
    answer: null,
  },
  {
    id: "2",
    question: "How to achieve world peace?",
    username: "john_doe",
    anonymous: false,
    answer: "By promoting understanding and empathy.",
  },
  {
    id: "3",
    question: "Is time travel possible?",
    username: null,
    anonymous: true,
    answer: null,
  },
];

export const getQuestions = async () => {
  return questions;
};

export const addQuestion = async (questionData: {
  question: string;
  username: string | null;
  anonymous: boolean;
}) => {
  const newQuestion = {
    id: Date.now().toString(),
    ...questionData,
    answer: null,
  };
  questions = [...questions, newQuestion];
  return newQuestion;
};

export const updateQuestion = async (
  id: string,
  updateData: { answer: string | null }
) => {
  questions = questions.map((question) =>
    question.id === id ? { ...question, ...updateData } : question
  );
};
