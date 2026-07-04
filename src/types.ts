export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Question {
  id: number;
  questionText: string;
  choices: string[];
  correctAnswer: string;
  category: string;
  explanation: string;
  difficulty: Difficulty;
}

export type AppState = 'START' | 'QUIZ' | 'END' | 'REVIEW_WRONG';

export interface UserAnswer {
  questionId: number;
  selectedAnswer: string | null; // null if timed out
  isCorrect: boolean;
  timeTaken: number;
}

export interface UserProfile {
  username: string;
  bio: string;
  avatar: string;
  followersCount: number;
  friends: string[];
}

export interface QuizAttempt {
  id: string;
  score: number;
  total: number;
  language: string;
  difficulty: Difficulty;
  timestamp: string;
}
