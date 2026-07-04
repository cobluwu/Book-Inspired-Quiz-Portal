import React from 'react';
import { motion } from 'motion/react';
import { Question, UserAnswer } from '../types';
import { ArrowLeft, BookOpen, Check, X, AlertCircle, Lightbulb, RefreshCw, PenTool, Flame } from 'lucide-react';

interface WrongAnswersReviewScreenProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onBackToResults: () => void;
  onRestart: () => void;
}

export default function WrongAnswersReviewScreen({
  questions,
  userAnswers,
  onBackToResults,
  onRestart,
}: WrongAnswersReviewScreenProps) {
  // Filter for incorrect or unanswered questions
  const wrongQuestions = questions.filter((q) => {
    const answer = userAnswers.find((a) => a.questionId === q.id);
    return !answer || !answer.isCorrect;
  });

  const hasWrongAnswers = wrongQuestions.length > 0;

  return (
    <div
      className="w-full max-w-3xl flex flex-col gap-8 text-neutral-800 dark:text-zinc-100"
      id="wrong-review-container"
    >
      {/* Notebook Sheet Header */}
      <div className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 sm:p-10 relative overflow-hidden notebook-margin">
        {/* Binder rings motif to keep school aesthetic */}
        <div className="absolute top-2 left-0 right-0 flex justify-around px-8 pointer-events-none opacity-80">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-3.5 h-6 bg-slate-300 dark:bg-zinc-700 rounded-full border-2 border-slate-400 dark:border-zinc-800 shadow-sm" />
              <div className="w-2 h-2 rounded-full bg-slate-400/30" />
            </div>
          ))}
        </div>

        {/* Loose-leaf paper red margin line */}
        <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />

        <div className="pl-8 pt-8 text-left">
          <button
            onClick={onBackToResults}
            className="group flex items-center gap-2 text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors uppercase tracking-wider mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Scorecard</span>
          </button>

          <span className="text-xs font-bold tracking-widest text-red-500 uppercase font-mono block">
            // CORRECTION_SHEET_LEGR_0xAC
          </span>
          <h1 className="text-3xl font-extrabold font-sketch text-slate-900 dark:text-zinc-50 tracking-tight mt-1 flex items-center gap-2">
            Incorrect Answer Revision
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-lg mt-2 leading-relaxed">
            Every failure is a runtime exception waiting to be caught. Review the detailed grader annotations below to understand the rules.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="bg-red-100 dark:bg-red-950/40 border-2 border-red-300 text-red-800 dark:text-red-400 font-mono font-extrabold text-xs px-4 py-1.5 rounded-full">
              {wrongQuestions.length} {wrongQuestions.length === 1 ? 'Error' : 'Errors'} Found
            </span>
            <span className="text-xs text-neutral-400 font-mono font-medium uppercase">
              // Requires Classroom Sign-Off
            </span>
          </div>
        </div>
      </div>

      {/* Main Review List */}
      <div className="flex flex-col gap-6">
        {!hasWrongAnswers ? (
          <div className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-8 text-center relative notebook-margin">
            <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />
            <div className="pl-8 flex flex-col items-center gap-4 py-8">
              <div className="p-4 bg-amber-100 dark:bg-amber-950/40 rounded-full border-2 border-amber-400 text-amber-600">
                <Flame className="w-12 h-12 fill-amber-500" />
              </div>
              <h3 className="text-2xl font-black font-sketch text-slate-900 dark:text-zinc-50">
                Perfect Sheet Certification!
              </h3>
              <p className="font-hand font-semibold text-xl text-slate-700 dark:text-zinc-300 max-w-md">
                "You scored 100%! The compiler ran all tests perfectly green. There are no bugs to squash on this sheet!"
              </p>
              <button
                onClick={onRestart}
                className="mt-4 bg-slate-900 dark:bg-zinc-100 dark:text-slate-900 text-white font-mono font-bold text-xs py-3 px-6 rounded-xl border border-slate-950 flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Start Another Sheet</span>
              </button>
            </div>
          </div>
        ) : (
          wrongQuestions.map((q, idx) => {
            const answer = userAnswers.find((a) => a.questionId === q.id);
            const isTimeOut = !answer || answer.selectedAnswer === null;

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 sm:p-8 relative notebook-margin flex flex-col gap-4"
                style={{
                  borderRadius: idx % 2 === 0 ? '16px 12px 14px 18px' : '12px 18px 15px 12px',
                }}
              >
                <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />

                <div className="pl-8 flex flex-col gap-3">
                  {/* Category and Index Indicator */}
                  <div className="flex justify-between items-start gap-4 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">Correction #{idx + 1}</span>
                      <span className="bg-slate-200 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {q.category}
                      </span>
                      <span className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/30 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {q.difficulty}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded border border-red-200">
                      {isTimeOut ? <AlertCircle className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>{isTimeOut ? 'TIMED OUT' : 'WRONG CHOICE'}</span>
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-zinc-50 leading-snug font-sans">
                    {q.questionText}
                  </h4>

                  {/* Options List to see choices with annotations */}
                  <div className="flex flex-col gap-2 mt-2">
                    {q.choices.map((choice) => {
                      const isChosen = answer?.selectedAnswer === choice;
                      const isCorrect = q.correctAnswer === choice;

                      let itemStyle = 'border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/25';
                      let iconElement = null;

                      if (isCorrect) {
                        itemStyle = 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/10 text-emerald-900 dark:text-emerald-300 font-semibold';
                        iconElement = <Check className="w-4 h-4 text-emerald-600 shrink-0" />;
                      } else if (isChosen) {
                        itemStyle = 'border-red-500 bg-red-50/40 dark:bg-red-950/10 text-red-900 dark:text-red-300';
                        iconElement = <X className="w-4 h-4 text-red-500 shrink-0" />;
                      }

                      return (
                        <div
                          key={choice}
                          className={`border-2 p-3.5 rounded-xl text-sm flex items-center justify-between gap-3 ${itemStyle}`}
                        >
                          <span className="font-mono break-words text-left">{choice}</span>
                          {iconElement}
                        </div>
                      );
                    })}
                  </div>

                  {/* Comparison Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 font-mono text-xs">
                    <div className="border border-red-200 dark:border-red-900/30 bg-red-50/10 p-3 rounded-xl flex flex-col gap-0.5 text-left">
                      <span className="text-red-400 font-bold uppercase tracking-wider text-[8px]">// Your Selection</span>
                      <span className="font-semibold text-red-600 dark:text-red-400 break-words">
                        {isTimeOut ? 'No choice registered (Timeout)' : answer?.selectedAnswer}
                      </span>
                    </div>

                    <div className="border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/10 p-3 rounded-xl flex flex-col gap-0.5 text-left">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider text-[8px]">// Target Solution</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 break-words">
                        {q.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Annotated Explanation note */}
                  <div className="mt-3 text-xs leading-relaxed text-slate-800 dark:text-zinc-200 bg-[#fffbeb] dark:bg-amber-950/20 p-5 rounded-2xl border-2 border-amber-300 dark:border-amber-900/60 shadow-xs flex flex-col gap-1.5 text-left">
                    <span className="font-bold text-amber-900 dark:text-amber-400 flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-mono">
                      <PenTool className="w-3.5 h-3.5" /> Grader's Diagnostic Annotation:
                    </span>
                    <p className="font-sans font-medium text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Control Actions */}
      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <button
          onClick={onBackToResults}
          className="flex-1 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-mono font-bold py-4 px-6 rounded-2xl border-2 border-slate-900 dark:border-zinc-700 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
          style={{
            borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO SCORECARD</span>
        </button>

        <button
          onClick={onRestart}
          className="flex-1 bg-slate-900 dark:bg-zinc-100 dark:text-slate-900 text-white font-mono font-bold py-4 px-6 rounded-2xl border-2 border-slate-900 dark:border-zinc-50 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98 shadow-md"
          style={{
            borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
          }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>RESTART GRADING SESSION</span>
        </button>
      </div>
    </div>
  );
}
