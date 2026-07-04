import { safeGetItem, safeSetItem, safeRemoveItem } from "../lib/storage";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, UserAnswer } from '../types';
import { Timer, Check, X, AlertCircle, HelpCircle, FileText, ChevronRight, PenTool } from 'lucide-react';

const CORRECT_MESSAGES = [
  "Spot-on! Excellent logic trace! 🌟",
  "Perfect! You parsed this compiled block flawlessly! 🎉",
  "Amazing! Your code comprehension is top-tier! 🚀",
  "Correct! Spot-on understanding of the system rules! 💎",
  "Boom! Correct! Your programmer index is climbing! 📈",
  "Awesome work! You handled that with complete precision! 🎯",
  "Brilliant! The compiler is fully satisfied! 🛠️",
  "Incredible! That's exactly how the runtime executes it! 🎓"
];

const INCORRECT_MESSAGES = [
  "Ah, a subtle trap! Don't worry, keep exploring! 🔍",
  "Oops! A small logic exception occurred here. 🛠️",
  "Incorrect this time. Review the annotations to master this! 📝",
  "Darn! A little bug slipped through your test script. 🐛",
  "Not quite, but every failed run is a step closer to success! 🌱",
  "Ah, close try! Master the concept in the feedback below! 💡"
];

const TIMEOUT_MESSAGES = [
  "Time limit reached! Under pressure, even senior scripts time out. ⏰",
  "Out of time! Don't worry, speed comes with practice. ⚡"
];

const getFeedbackMessage = (isCorrect: boolean, isTimeout: boolean, qId: number) => {
  if (isTimeout) {
    return TIMEOUT_MESSAGES[qId % TIMEOUT_MESSAGES.length];
  }
  if (isCorrect) {
    return CORRECT_MESSAGES[qId % CORRECT_MESSAGES.length];
  }
  return INCORRECT_MESSAGES[qId % INCORRECT_MESSAGES.length];
};

interface QuizScreenProps {
  questions: Question[];
  currentQuestionIndex: number;
  timeLimit: number;
  onAnswerSelected: (answer: UserAnswer) => void;
  score: number;
}

export default function QuizScreen({
  questions,
  currentQuestionIndex,
  timeLimit,
  onAnswerSelected,
  score,
}: QuizScreenProps) {
  const currentQuestion = questions[currentQuestionIndex];

  // States
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(() => {
    const saved = safeGetItem('pl_quiz_auto_advance');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return false;
      }
    }
    return false; // Default to false for manual validation control
  });

  // Refs for tracking timer and next page timeouts
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const nextTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggleAutoAdvance = (checked: boolean) => {
    setAutoAdvance(checked);
    safeSetItem('pl_quiz_auto_advance', JSON.stringify(checked));

    if (!checked) {
      if (nextTimeoutRef.current) {
        clearTimeout(nextTimeoutRef.current);
        nextTimeoutRef.current = null;
      }
    } else {
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
      
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      const timeTaken = isTimedOut ? timeLimit : (timeLimit - timeLeft);
      
      nextTimeoutRef.current = setTimeout(() => {
        onAnswerSelected({
          questionId: currentQuestion.id,
          selectedAnswer: selectedOption,
          isCorrect,
          timeTaken,
        });
      }, 4500);
    }
  };

  // Reset state on each new question
  useEffect(() => {
    setTimeLeft(timeLimit);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsTimedOut(false);

    if (nextTimeoutRef.current) {
      clearTimeout(nextTimeoutRef.current);
    }

    // Set up 1-second interval timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (nextTimeoutRef.current) {
        clearTimeout(nextTimeoutRef.current);
      }
    };
  }, [currentQuestionIndex, timeLimit]);

  // Handle Timeout
  const handleTimeOut = () => {
    setIsAnswered(true);
    setIsTimedOut(true);

    const answerResult: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: null,
      isCorrect: false,
      timeTaken: timeLimit,
    };

    if (autoAdvance) {
      nextTimeoutRef.current = setTimeout(() => {
        onAnswerSelected(answerResult);
      }, 4500);
    }
  };

  // Handle Option Select
  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    const timeTaken = timeLimit - timeLeft;

    const answerResult: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: option,
      isCorrect,
      timeTaken,
    };

    if (autoAdvance) {
      nextTimeoutRef.current = setTimeout(() => {
        onAnswerSelected(answerResult);
      }, 4500);
    }
  };

  // Progress calculations
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Hand-drawn timer classification
  const getTimerStyles = () => {
    if (timeLeft > 15) {
      return {
        stroke: 'stroke-indigo-700 dark:stroke-indigo-400',
        text: 'text-indigo-700 dark:text-indigo-400',
        bg: 'bg-indigo-50/50 dark:bg-zinc-800',
        note: '// Pencil standard speed limit.',
        statusColor: 'text-neutral-500'
      };
    } else if (timeLeft > 7) {
      return {
        stroke: 'stroke-amber-600',
        text: 'text-amber-600',
        bg: 'bg-amber-50/50 dark:bg-zinc-800',
        note: '// Time crunch is real!',
        statusColor: 'text-amber-600 font-semibold'
      };
    } else {
      return {
        stroke: 'stroke-rose-600',
        text: 'text-rose-600 animate-pulse',
        bg: 'bg-rose-50/50 dark:bg-zinc-800',
        note: '// Ink bleeding! HURRY!',
        statusColor: 'text-rose-600 font-bold'
      };
    }
  };

  const timerStyle = getTimerStyles();

  // Circular timer circumference math (r=56 -> 351.85)
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * timeLeft) / timeLimit;

  return (
    <div className="w-full max-w-5xl flex flex-col gap-8" id="quiz-screen-container">
      
      {/* Top Header Card */}
      <div className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 sm:p-8 relative overflow-hidden notebook-margin">
        <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />
        
        <div className="pl-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="flex flex-col">
            <span className="font-hand font-bold text-lg text-indigo-700 dark:text-indigo-400">
              Exam Sheet: {currentQuestion.difficulty} LEVEL
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-sketch text-slate-800 dark:text-zinc-50 tracking-tight">
              Programming languages evaluation
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 sketch-border-sm p-3 rounded-xl sketch-shadow-sm font-mono text-xs">
            <span className="text-neutral-400">SCORE:</span>
            <span className="font-black text-indigo-700 dark:text-indigo-400">{score * 100} PTS</span>
          </div>
        </div>

        {/* Global Progress Line Tracker */}
        <div className="pl-8 mt-5 flex flex-col gap-1.5">
          <div className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progressPercent)}% Written</span>
          </div>
        </div>
      </div>

      {/* Main Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Hand: Question Sheet (2 Columns wide) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 sm:p-10 relative notebook-margin">
            {/* Margin lines */}
            <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />

            <div className="pl-8">
              {/* Category indicator sketched */}
              <div className="flex items-center gap-1.5 mb-5 font-mono text-xs text-neutral-400">
                <FileText className="w-3.5 h-3.5 text-indigo-700 dark:text-indigo-400 shrink-0" />
                <span>[Module: {currentQuestion.category}]</span>
              </div>

              {/* Question text with handwriting elements */}
              <h2 className="text-lg sm:text-2xl font-extrabold leading-relaxed text-slate-900 dark:text-white mb-8 font-sans">
                {currentQuestion.questionText}
              </h2>

              {/* Choices List */}
              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.choices.map((choice, index) => {
                  const isSelected = selectedOption === choice;
                  const isCorrectAnswer = choice === currentQuestion.correctAnswer;

                  // Hand-drawn sketch styled choice options
                  let buttonStyle = 'border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 hover:bg-amber-50/10 dark:hover:bg-zinc-800 hover:border-indigo-600 text-slate-700 dark:text-zinc-300 sketch-shadow-sm';
                  let letterStyle = 'border-slate-300 dark:border-zinc-700 text-slate-400';
                  let inkCheckIcon = null;

                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      // Correct option with green highlighter feel
                      buttonStyle = 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/15 translate-x-[1px]';
                      letterStyle = 'bg-emerald-600 text-white border-transparent';
                      inkCheckIcon = (
                        <span className="font-hand font-extrabold text-emerald-700 dark:text-emerald-400 text-lg flex items-center gap-1">
                          ✓ Correct
                        </span>
                      );
                    } else if (isSelected) {
                      // Incorrect option with red ink cross feel
                      buttonStyle = 'border-red-500 bg-red-50/40 dark:bg-red-950/20 text-red-900 dark:text-red-300 font-semibold ring-2 ring-red-500/15 correction-line';
                      letterStyle = 'bg-red-600 text-white border-transparent';
                      inkCheckIcon = (
                        <span className="font-hand font-extrabold text-red-600 dark:text-red-400 text-lg">
                          ✗ Incorrect
                        </span>
                      );
                    } else {
                      buttonStyle = 'opacity-40 border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-900 text-slate-400 dark:text-zinc-600';
                      letterStyle = 'bg-slate-100 dark:bg-zinc-800 border-transparent text-slate-300';
                    }
                  }

                  // Determine hand-drawn border curve irregularities per choice index
                  const customRadius = index % 2 === 0 
                    ? '120px 10px 110px 10px/10px 110px 10px 120px'
                    : '10px 110px 10px 120px/120px 10px 110px 10px';

                  return (
                    <button
                      key={index}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(choice)}
                      className={`flex items-center justify-between w-full p-4.5 rounded-2xl border-2 transition-all cursor-pointer focus:outline-none text-left ${buttonStyle}`}
                      style={{ borderRadius: customRadius }}
                    >
                      <span className="flex items-center gap-4">
                        <span className={`w-9 h-9 rounded-full border flex items-center justify-center font-mono font-bold text-sm shrink-0 ${letterStyle}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-sm sm:text-base font-semibold">{choice}</span>
                      </span>
                      {inkCheckIcon}
                    </button>
                  );
                })}
              </div>

              {/* Explanation written below in solid soft-amber container for maximum readability */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 pt-6 border-t-2 border-dashed border-slate-300 dark:border-zinc-800 overflow-hidden"
                  >
                    <div className="bg-[#fffbeb] dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-900 rounded-2xl p-5 shadow-sm">
                      <div className="flex gap-3 text-neutral-800 dark:text-amber-100 text-sm">
                        <PenTool className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          <span className="font-sans font-bold text-amber-900 dark:text-amber-400 text-base">
                            {isTimedOut ? "Grader's Time Out Annotation:" : "Grader's Explanation Note:"}
                          </span>
                          <p className="leading-relaxed font-sans text-base text-neutral-800 dark:text-neutral-200 font-medium">
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Hand Sidebar: Countdown & Rules (1 Column wide) */}
        <div className="flex flex-col gap-6">
          
          {/* Sketchy Pencil timer circular widget */}
          <div className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 flex flex-col items-center gap-4 relative notebook-margin">
            <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />
            
            <div className="pl-8 w-full flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 font-mono text-center">
                // Countdown Clock
              </span>
              
              <div className="relative flex items-center justify-center my-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    className="text-slate-200 dark:text-zinc-800"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    className={timerStyle.stroke}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: 'linear' }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black tracking-tight font-sketch ${timerStyle.text}`}>
                    {timeLeft.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-zinc-500 tracking-wider font-mono">
                    Seconds
                  </span>
                </div>
              </div>

              <span className={`text-xs font-mono text-center block ${timerStyle.statusColor}`}>
                {timerStyle.note}
              </span>
            </div>
          </div>

          {/* Grading Scale sheet */}
          <div className="bg-slate-800 dark:bg-zinc-950 border-2 border-slate-700/30 rounded-3xl p-6 text-white flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Grading Scale</span>
            </div>
            
            <ul className="text-xs text-slate-300 font-mono space-y-2">
              <li className="flex justify-between border-b border-slate-700/50 pb-1">
                <span>10 Correct:</span>
                <span className="text-emerald-400 font-bold">A+ (Titan)</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-1">
                <span>7-9 Correct:</span>
                <span className="text-indigo-400 font-bold">B (Scholar)</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-1">
                <span>4-6 Correct:</span>
                <span className="text-amber-400 font-bold">C (Challenger)</span>
              </li>
              <li className="flex justify-between">
                <span>0-3 Correct:</span>
                <span className="text-red-400 font-bold">F (Explorer)</span>
              </li>
            </ul>
          </div>

          {/* Quick loading banner for next page */}
          {isAnswered && (
            <div className="w-full py-3.5 bg-indigo-50 dark:bg-indigo-950/20 border-2 border-dashed border-indigo-200 dark:border-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-2xl text-center text-xs font-mono animate-pulse">
              // Turning page to next question...
            </div>
          )}

        </div>

      </div>

      {/* Feedback Popup Modal Overlay */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-md bg-[#faf9f5] dark:bg-zinc-900 border-4 border-slate-950 dark:border-zinc-100 p-6 rounded-3xl sketch-shadow relative overflow-hidden flex flex-col items-center text-center gap-4"
            >
              {/* Top binder rings motif to match paper look */}
              <div className="flex gap-2 justify-center mb-1">
                <div className="w-3 h-6 bg-slate-400 rounded-full border border-slate-600" />
                <div className="w-3 h-6 bg-slate-400 rounded-full border border-slate-600" />
                <div className="w-3 h-6 bg-slate-400 rounded-full border border-slate-600" />
              </div>

              {/* Status Indicator Icon */}
              <div className="flex justify-center items-center">
                {isTimedOut ? (
                  <div className="p-4 bg-red-100 dark:bg-red-950/40 rounded-full border-2 border-red-500 text-red-500">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                ) : selectedOption === currentQuestion.correctAnswer ? (
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-950/40 rounded-full border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400">
                    <Check className="w-10 h-10" />
                  </div>
                ) : (
                  <div className="p-4 bg-red-100 dark:bg-red-950/40 rounded-full border-2 border-red-500 text-red-500">
                    <X className="w-10 h-10" />
                  </div>
                )}
              </div>

              {/* Main Status Text */}
              <h3 className={`text-2xl font-sans font-extrabold tracking-tight ${
                isTimedOut ? "text-red-500" : selectedOption === currentQuestion.correctAnswer ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}>
                {isTimedOut ? "Time Expired! ⏰" : selectedOption === currentQuestion.correctAnswer ? "Grading: CORRECT! ✓" : "Grading: INCORRECT! ✗"}
              </h3>

              {/* Encouraging text */}
              <p className="text-slate-800 dark:text-zinc-100 font-sans font-semibold text-lg leading-snug px-2">
                {getFeedbackMessage(selectedOption === currentQuestion.correctAnswer, isTimedOut, currentQuestion.id)}
              </p>

              {/* Informative correct answer summary */}
              <div className="w-full bg-slate-100 dark:bg-zinc-800 p-4 rounded-xl border border-slate-300 dark:border-zinc-700 mt-2 flex flex-col gap-1.5 text-left font-sans">
                <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider font-bold">// Target Solution</span>
                <span className="text-slate-900 dark:text-white font-mono text-sm font-black break-words">
                  {currentQuestion.correctAnswer}
                </span>
              </div>

              {/* Skip Timer & Proceed Button */}
              <button
                onClick={() => {
                  if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
                  onAnswerSelected({
                    questionId: currentQuestion.id,
                    selectedAnswer: selectedOption,
                    isCorrect: selectedOption === currentQuestion.correctAnswer,
                    timeTaken: isTimedOut ? timeLimit : (timeLimit - timeLeft),
                  });
                }}
                className="w-full mt-3 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-slate-900 font-mono font-black py-3 px-5 rounded-xl border-2 border-slate-950 dark:border-zinc-50 flex items-center justify-center gap-2 cursor-pointer transition-transform duration-100 active:scale-98"
              >
                <span>PROCEED TO NEXT SHEET</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Auto-Advance Option Toggle */}
              <div className="w-full mt-1 pt-3 border-t border-dashed border-slate-200 dark:border-zinc-800 flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 select-none">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(e) => handleToggleAutoAdvance(e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-slate-950 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                  />
                  <span>Auto-advance next sheet (4.5s)</span>
                </label>
                <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-wider">
                  {autoAdvance ? "[ON]" : "[OFF]"}
                </span>
              </div>

              {/* Auto progress status text */}
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
                {autoAdvance ? "Auto-submitting in a moment..." : "Manual reading mode active"}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
