import React from 'react';
import { motion } from 'motion/react';
import { Question, UserAnswer } from '../types';
import { Trophy, RefreshCw, Check, X, AlertCircle, Clock, Award, Lightbulb, BookOpen } from 'lucide-react';

interface EndScreenProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onRestart: () => void;
  onReviewWrongAnswers: () => void;
  score: number;
}

export default function EndScreen({ questions, userAnswers, onRestart, onReviewWrongAnswers, score }: EndScreenProps) {
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine feedback badge and color scheme in pen format
  const getFeedback = () => {
    if (score === totalQuestions) {
      return {
        title: "Perfection Certified!",
        message: "A perfect 10/10 scorecard. You've conquered every compiler rule and low-level detail!",
        color: "text-amber-600 dark:text-amber-400",
        badgeColor: "bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300",
        badge: "Grade: A+ (Trivia Titan)",
      };
    } else if (score >= totalQuestions * 0.7) {
      return {
        title: "Magnificent Scorecard!",
        message: "Superb language concepts grasp. Almost all compiled tests succeeded flawlessly.",
        color: "text-indigo-700 dark:text-indigo-400",
        badgeColor: "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 border-indigo-300",
        badge: "Grade: B (Smart Scholar)",
      };
    } else if (score >= totalQuestions * 0.4) {
      return {
        title: "Passed the Compilation!",
        message: "You have a solid base, but there are still edge cases to learn from our review.",
        color: "text-blue-700 dark:text-blue-400",
        badgeColor: "bg-blue-100 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 border-blue-300",
        badge: "Grade: C (Curious Challenger)",
      };
    } else {
      return {
        title: "Retry Compiling!",
        message: "Don't stress. Look over the annotated explanations below to expand your logic.",
        color: "text-rose-600 dark:text-rose-400",
        badgeColor: "bg-rose-100 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 border-rose-300",
        badge: "Grade: F (Aspirant Explorer)",
      };
    }
  };

  const feedback = getFeedback();

  // Calculate statistics
  const totalSeconds = userAnswers.reduce((acc, curr) => acc + curr.timeTaken, 0);
  const avgSpeed = userAnswers.length > 0 ? (totalSeconds / userAnswers.length).toFixed(1) : 0;

  return (
    <div
      className="w-full max-w-3xl flex flex-col gap-8 text-neutral-800 dark:text-zinc-100"
      id="end-screen-container"
    >
      {/* Notebook Sheet - Score Card */}
      <div className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 sm:p-10 text-center relative overflow-hidden notebook-margin">
        <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />
        
        {/* Top spiral bindings */}
        <div className="absolute top-2 left-0 right-0 flex justify-around px-8 pointer-events-none opacity-80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-3.5 h-6 bg-slate-300 dark:bg-zinc-700 rounded-full border-2 border-slate-400 dark:border-zinc-800 shadow-sm" />
              <div className="w-2 h-2 rounded-full bg-slate-400/30" />
            </div>
          ))}
        </div>

        {/* Ink Trophy decoration */}
        <div className="flex justify-center mt-8 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-xl scale-125 animate-pulse" />
            <div className="relative bg-slate-900 text-white p-5 rounded-full border-2 border-slate-700 shadow-md">
              <Trophy className="w-10 h-10 text-amber-300" id="trophy-victory-icon" />
            </div>
          </div>
        </div>

        <div className="pl-8 text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-700 dark:text-indigo-400 uppercase font-mono">// Final Examination Scorecard</span>
          <h1 className="text-3xl font-extrabold font-sketch text-slate-900 dark:text-zinc-50 tracking-tight mt-1">
            Exam Complete!
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
            Your results have been processed and annotated below by the classroom grader.
          </p>

          {/* Large Pen-Drawn Circular Grade Ring */}
          <div className="my-8 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  className="stroke-slate-200 dark:stroke-zinc-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <motion.circle
                  cx="72"
                  cy="72"
                  r="64"
                  className="stroke-indigo-600 dark:stroke-indigo-400"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={402}
                  initial={{ strokeDashoffset: 402 }}
                  animate={{ strokeDashoffset: 402 - (402 * percentage) / 100 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black font-sketch text-slate-800 dark:text-zinc-50">
                  {score * 100}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 font-mono">
                  Final Score
                </span>
              </div>
            </div>

            <div className="mt-5">
              <span className={`text-xs font-bold px-5 py-2.5 rounded-full border-2 uppercase tracking-wider font-mono ${feedback.badgeColor}`}>
                {feedback.badge}
              </span>
            </div>
          </div>

          {/* Feedback title & message */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
              {feedback.title}
            </h3>
            <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1 max-w-md mx-auto leading-relaxed">
              {feedback.message}
            </p>
          </div>

          {/* Quick Stats list */}
          <div className="grid grid-cols-3 gap-3 border-t-2 border-dashed border-slate-200 dark:border-zinc-800 pt-6 mt-4 font-mono">
            <div className="flex flex-col items-center">
              <Award className="w-5 h-5 text-indigo-700 dark:text-indigo-400 mb-1" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</span>
              <span className="text-base font-bold text-slate-800 dark:text-zinc-200 mt-1">{percentage}%</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200 dark:border-zinc-800 px-2">
              <Clock className="w-5 h-5 text-rose-500 mb-1" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Avg Speed</span>
              <span className="text-base font-bold text-slate-800 dark:text-zinc-200 mt-1">{avgSpeed}s / q</span>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="w-5 h-5 text-emerald-500 mb-1" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Passed</span>
              <span className="text-base font-bold text-slate-800 dark:text-zinc-200 mt-1">{score} / {totalQuestions}</span>
            </div>
          </div>

          {/* Dedicated Revision CTA */}
          {totalQuestions - score > 0 ? (
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-xs">
              <div className="flex gap-3 items-center">
                <div className="bg-red-100 dark:bg-red-900/50 p-2.5 rounded-xl text-red-600 border border-red-200 shrink-0">
                  <AlertCircle className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-red-900 dark:text-red-400 uppercase font-mono tracking-wider">Revision Required</h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5 font-sans leading-snug">
                    You missed {totalQuestions - score} {totalQuestions - score === 1 ? 'question' : 'questions'}. Open the dedicated correction sheet to revise.
                  </p>
                </div>
              </div>
              <button
                onClick={onReviewWrongAnswers}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-mono font-black text-xs py-2.5 px-4.5 rounded-xl border-2 border-red-800 cursor-pointer shadow-sm transition-transform active:scale-98 flex items-center justify-center gap-2 shrink-0"
              >
                <span>Review Wrong Answers</span>
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-900 rounded-2xl flex items-center gap-3 text-left shadow-xs">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2.5 rounded-xl text-emerald-600 border border-emerald-200 shrink-0">
                <Award className="w-5 h-5 fill-emerald-500 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-400 uppercase font-mono tracking-wider">Perfect Score Verified</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5 font-sans leading-snug">
                  Full compilation success! No errors to fix on this exam.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 sm:p-8 flex flex-col gap-6 relative notebook-margin">
        <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />
        
        <div className="pl-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-bold font-sketch text-slate-800 dark:text-zinc-100">
              Annotated Exam Sheets Review
            </h2>
            <span className="bg-slate-200 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              Grader Logs
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {questions.map((q, index) => {
              const answer = userAnswers.find((a) => a.questionId === q.id);
              const isCorrect = answer?.isCorrect || false;
              const isTimeOut = answer?.selectedAnswer === null;

              return (
                <div
                  key={q.id}
                  className="border-2 border-slate-300 dark:border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-3 bg-white dark:bg-zinc-950/10 relative overflow-hidden sketch-shadow-sm"
                  style={{
                    borderRadius: index % 2 === 0 ? '12px 18px 12px 14px' : '18px 12px 15px 12px'
                  }}
                >
                  {/* Status header */}
                  <div className="flex justify-between items-start gap-4 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-bold">Sheet #{index + 1}</span>
                      <span className="bg-slate-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {q.category}
                      </span>
                    </div>

                    {/* Marking pill */}
                    {isTimeOut ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/10 px-2 py-0.5 rounded border border-red-200">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>TIMED OUT</span>
                      </span>
                    ) : isCorrect ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/10 px-2 py-0.5 rounded border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>CORRECT [✓]</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/10 px-2 py-0.5 rounded border border-red-200">
                        <X className="w-3.5 h-3.5" />
                        <span>INCORRECT [✗]</span>
                      </span>
                    )}
                  </div>

                  {/* Question */}
                  <h4 className="text-base font-bold text-slate-800 dark:text-zinc-200 leading-snug">
                    {q.questionText}
                  </h4>

                  {/* Comparison cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    <div className="text-xs border border-slate-200 dark:border-zinc-800 p-3 rounded-xl flex flex-col gap-0.5 bg-slate-50/50">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px] font-mono">// Your Answer</span>
                      <span className={`font-semibold ${
                        isTimeOut ? 'text-red-500 italic' : isCorrect ? 'text-emerald-700' : 'text-red-600 correction-line'
                      }`}>
                        {isTimeOut ? "Left unanswered" : answer?.selectedAnswer}
                      </span>
                    </div>

                    <div className="text-xs border border-slate-200 dark:border-zinc-800 p-3 rounded-xl flex flex-col gap-0.5 bg-emerald-50/10">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px] font-mono">// Correct Answer</span>
                      <span className="font-semibold text-emerald-700">
                        {q.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Annotated Explanation in handwritten Caveat style */}
                  <div className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400 bg-yellow-100/25 dark:bg-yellow-950/10 p-4 rounded-xl border-l-3 border-indigo-500 flex flex-col gap-1 pencil-highlight-yellow">
                    <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono">
                      <Lightbulb className="w-3.5 h-3.5" /> Grader's Annotation Note:
                    </span>
                    <p className="font-hand font-semibold text-[17px] leading-relaxed text-neutral-800 dark:text-zinc-100">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Restart Button with wavy sketch look */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onRestart}
        className="w-full bg-slate-900 dark:bg-zinc-100 dark:text-slate-900 text-white font-mono font-bold py-4.5 px-6 rounded-2xl border-2 border-slate-900 dark:border-zinc-50 flex items-center justify-center gap-2.5 cursor-pointer transition-colors shadow-lg"
        style={{
          borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px'
        }}
        id="restart-quiz-button"
      >
        <RefreshCw className="w-5 h-5" />
        <span className="tracking-widest uppercase text-sm">Restart Grading Session</span>
      </motion.button>
    </div>
  );
}
