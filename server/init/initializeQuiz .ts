import { Quiz } from "../models/Quiz";

export const initializeQuiz = async (courseId: string) => {
  await Quiz.create({
    title: "General Knowledge Quiz",
    time: 5,
    courseId: courseId,
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris",
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: [
          "Harper Lee",
          "J.K. Rowling",
          "Ernest Hemingway",
          "Mark Twain",
        ],
        correctAnswer: "Harper Lee",
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Osmium", "Iron"],
        correctAnswer: "Oxygen",
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Jupiter",
      },
      {
        question: "Which year did World War II end?",
        options: ["1942", "1945", "1939", "1950"],
        correctAnswer: "1945",
      },
      {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "8",
      },
      {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
      },
      {
        question: "Who painted the Mona Lisa?",
        options: [
          "Vincent van Gogh",
          "Pablo Picasso",
          "Leonardo da Vinci",
          "Claude Monet",
        ],
        correctAnswer: "Leonardo da Vinci",
      },
      {
        question: "Which continent is the largest by area?",
        options: ["North America", "Europe", "Asia", "Africa"],
        correctAnswer: "Asia",
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        correctAnswer: "Diamond",
      },
    ],
  });

  console.log("Quiz created...");
};
