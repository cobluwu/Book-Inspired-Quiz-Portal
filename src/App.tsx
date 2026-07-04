import { safeGetItem, safeSetItem, safeRemoveItem } from "./lib/storage";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppState, UserAnswer, Difficulty, QuizAttempt, Question } from './types';
import { TRIVIA_QUESTIONS } from './data';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import EndScreen from './components/EndScreen';
import UserProfileArea from './components/UserProfileArea';
import WrongAnswersReviewScreen from './components/WrongAnswersReviewScreen';
import PageFlipWrapper from './components/PageFlipWrapper';
import { checkStreakValidity, recordQuizCompletion } from './lib/streak';
import { GraduationCap, BookOpen, User, AlertTriangle, Trash2, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'profile'>('quiz');
  const [appState, setAppState] = useState<AppState>('START');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('MEDIUM');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript & TypeScript');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState<number>(0);

  // Custom confirm modal states
  const [showAbortWarning, setShowAbortWarning] = useState<boolean>(false);
  const [pendingTab, setPendingTab] = useState<'quiz' | 'profile' | null>(null);
  const [showClearHistoryWarning, setShowClearHistoryWarning] = useState<boolean>(false);

  // Load initial attempts from localStorage
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => {
    const saved = safeGetItem('pl_quiz_attempts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Failed to load quiz attempts", e);
      }
    }
    return [];
  });

  // Validate streak on mount
  useEffect(() => {
    checkStreakValidity();
  }, []);

  // Dynamic time limit per difficulty
  const getTimeLimit = (difficulty: Difficulty): number => {
    return 45; // 45 seconds for every section as requested
  };

  const activeTimeLimit = getTimeLimit(selectedDifficulty);

  // Active questions for the current quiz session
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  // Start the game with randomized dynamic pool matching selected language and difficulty
  const handleStartQuiz = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    
    // Filter questions by selected language
    const filtered = TRIVIA_QUESTIONS.filter((q) => q.category === selectedLanguage);
    
    // Group questions by difficulty pool
    const easyPool = filtered.filter(q => q.difficulty === 'EASY');
    const mediumPool = filtered.filter(q => q.difficulty === 'MEDIUM');
    const hardPool = filtered.filter(q => q.difficulty === 'HARD');
    
    // Fisher-Yates shuffle algorithm
    const shuffle = <T,>(arr: T[]): T[] => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };
    
    const shuffledEasy = shuffle(easyPool);
    const shuffledMedium = shuffle(mediumPool);
    const shuffledHard = shuffle(hardPool);
    
    // Count distribution based on selected difficulty mode
    let easyCount = 4;
    let mediumCount = 3;
    let hardCount = 3;
    
    if (difficulty === 'EASY') {
      easyCount = 5;
      mediumCount = 3;
      hardCount = 2;
    } else if (difficulty === 'HARD') {
      easyCount = 2;
      mediumCount = 3;
      hardCount = 5;
    }
    
    // Extract questions up to specified limits
    const selectedEasy = shuffledEasy.slice(0, easyCount);
    const selectedMedium = shuffledMedium.slice(0, mediumCount);
    const selectedHard = shuffledHard.slice(0, hardCount);
    
    let combined = [...selectedEasy, ...selectedMedium, ...selectedHard];
    
    // Fallback if combined pool is smaller than 10, fill from remaining
    if (combined.length < 10) {
      const remainingPool = shuffle(filtered.filter(q => !combined.some(c => c.id === q.id)));
      combined = [...combined, ...remainingPool].slice(0, 10);
    }
    
    // Sort selected questions to maintain correct difficulty progression curves
    combined.sort((a, b) => {
      const diffOrder: Record<Difficulty, number> = { EASY: 0, MEDIUM: 1, HARD: 2 };
      const valA = diffOrder[a.difficulty] ?? 1;
      const valB = diffOrder[b.difficulty] ?? 1;
      
      if (difficulty === 'HARD') {
        return valB - valA; // Hard -> Medium -> Easy
      } else {
        return valA - valB; // Easy -> Medium -> Hard
      }
    });
    
    setActiveQuestions(combined);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setAppState('QUIZ');
  };

  // Save attempt to state & localStorage
  const saveQuizAttempt = (finalScore: number, totalQuestionsCount: number) => {
    const newAttempt: QuizAttempt = {
      id: Math.random().toString(36).substring(2, 9),
      score: finalScore,
      total: totalQuestionsCount,
      language: selectedLanguage,
      difficulty: selectedDifficulty,
      timestamp: new Date().toISOString(),
    };
    
    const updatedAttempts = [...attempts, newAttempt];
    setAttempts(updatedAttempts);
    safeSetItem('pl_quiz_attempts', JSON.stringify(updatedAttempts));

    // Record streak update since user completed a quiz
    recordQuizCompletion();
  };

  // Handle Answer selection (including timeout triggers)
  const handleAnswerSelected = (answer: UserAnswer) => {
    const updatedAnswers = [...userAnswers, answer];
    setUserAnswers(updatedAnswers);
    
    const isCorrect = answer.isCorrect;
    const currentScore = score + (isCorrect ? 1 : 0);
    if (isCorrect) {
      setScore(currentScore);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < activeQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setAppState('END');
      // Save exam results with actual correct score
      saveQuizAttempt(currentScore, activeQuestions.length);
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    setAppState('START');
    setActiveTab('quiz');
  };

  // Handle Tab changes
  const handleTabChange = (tab: 'quiz' | 'profile') => {
    if (tab === activeTab) return;

    // Show warning if user attempts to switch tab during an active test sheet
    if (activeTab === 'quiz' && appState === 'QUIZ') {
      setPendingTab(tab);
      setShowAbortWarning(true);
    } else {
      setActiveTab(tab);
    }
  };

  // Abort exam confirmation
  const handleConfirmAbort = () => {
    setAppState('START');
    setActiveTab(pendingTab || 'profile');
    setShowAbortWarning(false);
    setPendingTab(null);
  };

  const handleCancelAbort = () => {
    setShowAbortWarning(false);
    setPendingTab(null);
  };

  // Clear history dialog handlers
  const handleTriggerClearHistory = () => {
    setShowClearHistoryWarning(true);
  };

  const handleConfirmClearHistory = () => {
    setAttempts([]);
    safeRemoveItem('pl_quiz_attempts');
    setShowClearHistoryWarning(false);
  };

  return (
    <div 
      className="min-h-screen bg-[#f5f4ee] dark:bg-zinc-950 text-neutral-800 dark:text-zinc-200 flex flex-col items-center justify-between p-4 sm:p-6 select-none relative overflow-hidden animate-fade-in"
      style={{
        backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
        backgroundOpacity: 0.05
      }}
      id="app-root-container"
    >
      {/* Blueprint grid accent background overlay */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none opacity-[0.03] dark:opacity-[0.01]" />

      {/* Classroom header in paper binder style */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 border-b-2 border-dashed border-slate-300 dark:border-zinc-800 z-10">
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900 text-white dark:bg-zinc-100 dark:text-slate-900 p-2 rounded-xl border border-slate-700 shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-sketch font-bold tracking-tight text-neutral-950 dark:text-zinc-50 leading-none">
              PL_EXAM_ENGINE
            </span>
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
              Classroom Grader v1.4
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            SYSTEM_STANDBY_OK
          </span>
        </div>
      </header>

      {/* Navigation tab bar in loose-leaf binder style */}
      <div className="w-full max-w-5xl flex gap-1.5 mt-6 px-2 sm:px-0 relative z-20">
        <button
          onClick={() => handleTabChange('quiz')}
          className={`px-5 py-3 font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer relative ${
            activeTab === 'quiz'
              ? 'bg-[#faf9f5] dark:bg-zinc-900 text-indigo-700 dark:text-indigo-400 border-t-2 border-x-2 border-slate-900 dark:border-zinc-700 rounded-t-xl -mb-[2.5px] z-30 shadow-sm'
              : 'bg-slate-200/50 dark:bg-zinc-800/40 text-slate-500 hover:text-slate-700 dark:hover:text-zinc-300 border-b border-slate-300 dark:border-zinc-800 rounded-t-xl'
          }`}
          style={{
            borderRadius: '12px 12px 0 0',
          }}
          id="nav-tab-quiz-area"
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>📝 Exam Sheets</span>
          {appState === 'QUIZ' && (
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping absolute top-2 right-2" />
          )}
        </button>
        <button
          onClick={() => handleTabChange('profile')}
          className={`px-5 py-3 font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer relative ${
            activeTab === 'profile'
              ? 'bg-[#faf9f5] dark:bg-zinc-900 text-indigo-700 dark:text-indigo-400 border-t-2 border-x-2 border-slate-900 dark:border-zinc-700 rounded-t-xl -mb-[2.5px] z-30 shadow-sm'
              : 'bg-slate-200/50 dark:bg-zinc-800/40 text-slate-500 hover:text-slate-700 dark:hover:text-zinc-300 border-b border-slate-300 dark:border-zinc-800 rounded-t-xl'
          }`}
          style={{
            borderRadius: '12px 12px 0 0',
          }}
          id="nav-tab-user-profile"
        >
          <User className="w-4 h-4 shrink-0" />
          <span>👤 Student Card</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex items-center justify-center py-6 z-10 border-t border-slate-300 dark:border-zinc-800/80 bg-[#faf9f5] dark:bg-zinc-900 w-full max-w-5xl rounded-b-2xl p-4 sm:p-8 sketch-border-thick sketch-shadow-sm min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' ? (
            <PageFlipWrapper pageKey="profile-tab">
              <UserProfileArea 
                attempts={attempts} 
                onClearHistory={handleTriggerClearHistory}
              />
            </PageFlipWrapper>
          ) : appState === 'START' ? (
            <PageFlipWrapper pageKey="exam-start">
              <StartScreen
                onStart={handleStartQuiz}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
              />
            </PageFlipWrapper>
          ) : appState === 'QUIZ' ? (
            <PageFlipWrapper pageKey={`exam-quiz-${currentQuestionIndex}`}>
              <QuizScreen
                questions={activeQuestions}
                currentQuestionIndex={currentQuestionIndex}
                timeLimit={activeTimeLimit}
                onAnswerSelected={handleAnswerSelected}
                score={score}
              />
            </PageFlipWrapper>
          ) : appState === 'END' ? (
            <PageFlipWrapper pageKey="exam-end">
              <EndScreen
                questions={activeQuestions}
                userAnswers={userAnswers}
                onRestart={handleRestart}
                onReviewWrongAnswers={() => setAppState('REVIEW_WRONG')}
                score={score}
              />
            </PageFlipWrapper>
          ) : appState === 'REVIEW_WRONG' ? (
            <PageFlipWrapper pageKey="exam-review">
              <WrongAnswersReviewScreen
                questions={activeQuestions}
                userAnswers={userAnswers}
                onBackToResults={() => setAppState('END')}
                onRestart={handleRestart}
              />
            </PageFlipWrapper>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Classroom Footer */}
      <footer className="w-full max-w-5xl text-center py-4 text-[10px] text-slate-400 dark:text-zinc-500 border-t-2 border-dashed border-slate-300 dark:border-zinc-800 z-10 font-mono mt-8">
        <p>© 2026 PL_EXAM_ENGINE. Drawn & Compiled in Paper-Pen Style Sheets.</p>
      </footer>

      {/* CUSTOM DIALOG 1: Abort Exam Warning Modal */}
      <AnimatePresence>
        {showAbortWarning && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden"
              style={{ borderRadius: '15px 12px 140px 15px/120px 10px 110px 10px' }}
            >
              {/* Red warning border */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-red-500" />
              <div className="flex justify-center mb-4">
                <div className="bg-red-50 dark:bg-red-950/20 text-red-600 p-3 rounded-full border-2 border-dashed border-red-300">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              </div>

              <h3 className="text-xl font-black font-sketch text-slate-900 dark:text-zinc-50 uppercase tracking-tight">
                Abnormal Exam Termination!
              </h3>
              <p className="font-sans text-sm text-slate-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
                Leaving this tab will shred and invalidate your current active quiz sheet. Your points earned in this session will be permanently thrown away.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-6 font-mono">
                <button
                  onClick={handleConfirmAbort}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer text-xs uppercase tracking-wider transition-colors border border-red-700"
                >
                  Yes, Shred Sheet
                </button>
                <button
                  onClick={handleCancelAbort}
                  className="flex-1 bg-white dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 font-bold py-2.5 px-4 rounded-xl cursor-pointer text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors"
                >
                  No, Resume Test
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOM DIALOG 2: Clear History Confirmation Modal */}
      <AnimatePresence>
        {showClearHistoryWarning && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden"
              style={{ borderRadius: '12px 180px 15px 120px/10px 120px 10px 110px' }}
            >
              {/* Slate warning border */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-700" />
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 p-3 rounded-full border-2 border-dashed border-indigo-300">
                  <Trash2 className="w-8 h-8" />
                </div>
              </div>

              <h3 className="text-xl font-black font-sketch text-slate-900 dark:text-zinc-50 uppercase tracking-tight">
                Shred Academic Records?
              </h3>
              <p className="font-sans text-sm text-slate-500 dark:text-zinc-400 mt-2.5 leading-relaxed">
                This will completely wipe out your semester ledger and clear all previous quiz records from local memory. You cannot undo this compilation sweep.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-6 font-mono">
                <button
                  onClick={handleConfirmClearHistory}
                  className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2.5 px-4 rounded-xl cursor-pointer text-xs uppercase tracking-wider transition-colors border border-indigo-800"
                >
                  Yes, Shred Ledger
                </button>
                <button
                  onClick={() => setShowClearHistoryWarning(false)}
                  className="flex-1 bg-white dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 font-bold py-2.5 px-4 rounded-xl cursor-pointer text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors"
                >
                  Keep My Records
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
