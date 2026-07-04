import { safeGetItem, safeSetItem, safeRemoveItem } from "../lib/storage";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Difficulty } from '../types';
import { 
  Play, 
  Terminal, 
  Code, 
  Compass, 
  Layers, 
  Cpu, 
  Book, 
  Award, 
  GraduationCap, 
  Feather, 
  Bookmark, 
  Sparkles, 
  CornerDownRight, 
  ArrowLeft 
} from 'lucide-react';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

export default function StartScreen({
  onStart,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedLanguage,
  setSelectedLanguage,
}: StartScreenProps) {
  const [isCoverOpened, setIsCoverOpened] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("GUEST SPECIMEN");

  // Load the student's name on mount to print on the book owner's label
  useEffect(() => {
    const saved = safeGetItem('pl_quiz_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          setStudentName(parsed.name.toUpperCase());
        }
      } catch (e) {
        console.error("Failed to parse user profile on start cover", e);
      }
    }
  }, []);

  const difficultyRules = {
    EASY: {
      time: "45 Seconds",
      desc: "Standard generous time limit. Questions are sorted to test baseline syntax and fundamental language features first.",
      tag: "Gentle Prep",
    },
    MEDIUM: {
      time: "45 Seconds",
      desc: "Standard generous time limit. Concepts are balanced with progressive complexity throughout the exam.",
      tag: "Competent Coder",
    },
    HARD: {
      time: "45 Seconds",
      desc: "Standard generous time limit. Advanced runtime mechanics and edge-case questions are pushed to the front.",
      tag: "Compiled Wizard",
    },
  };

  const programmingLanguages = [
    {
      id: "JavaScript & TypeScript",
      label: "JS & TypeScript",
      icon: Code,
      note: "Web & Engines",
      color: "border-amber-400 dark:border-amber-500",
    },
    {
      id: "Python",
      label: "Python",
      icon: Compass,
      note: "Lists & Scopes",
      color: "border-blue-400 dark:border-blue-500",
    },
    {
      id: "C / C++ / Systems",
      label: "C / C++ / Systems",
      icon: Cpu,
      note: "RAM & Pointers",
      color: "border-red-400 dark:border-red-500",
    },
    {
      id: "Mixed Languages & CS",
      label: "Mixed / General",
      icon: Layers,
      note: "SQL, Java & Git",
      color: "border-emerald-400 dark:border-emerald-500",
    },
  ];

  return (
    <div 
      className="w-full max-w-3xl perspective-1500 preserve-3d relative min-h-[640px] flex items-stretch select-none"
      id="book-system-root"
    >
      {/* 1. PHYSICAL 3D BOOK COVER (Swings open to the left) */}
      <motion.div
        animate={{ 
          rotateY: isCoverOpened ? -145 : 0,
          z: isCoverOpened ? 50 : 0,
          pointerEvents: isCoverOpened ? 'none' : 'auto'
        }}
        transition={{ 
          duration: 1.0, 
          ease: [0.25, 1, 0.5, 1] 
        }}
        className="absolute inset-0 z-40 flip-origin-left preserve-3d backface-hidden book-cover p-6 sm:p-10 text-center flex flex-col justify-between select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Left Book Spine representation inside the front cover card */}
        <div className="absolute top-0 left-0 bottom-0 w-7 rounded-l-md book-spine-left border-r border-black/20 z-10 flex flex-col justify-around py-12 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-1.5 w-full bg-[#cfb53b]/50 shadow-xs" />
          ))}
        </div>

        {/* Golden Foil Ornate Corner Protectors */}
        <div className="absolute top-0 left-7 w-10 h-10 border-t-3 border-l-3 border-[#cfb53b] rounded-tl-sm pointer-events-none opacity-90" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-3 border-r-3 border-[#cfb53b] rounded-tr-md pointer-events-none opacity-90" />
        <div className="absolute bottom-0 left-7 w-10 h-10 border-b-3 border-l-3 border-[#cfb53b] rounded-bl-sm pointer-events-none opacity-90" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-3 border-r-3 border-[#cfb53b] rounded-br-md pointer-events-none opacity-90" />

        {/* Inner Gold Embossed Frame */}
        <div className="absolute inset-x-12 inset-y-6 border-2 border-double border-[#cfb53b]/60 rounded-lg pointer-events-none" />

        {/* Cover Content (Centered inside gold frame) */}
        <div className="relative pl-6 py-6 flex-1 flex flex-col justify-between items-center z-20">
          
          {/* Header Volume / Series Label */}
          <div className="flex flex-col items-center gap-1">
          </div>

          {/* Core Title Area */}
          <div className="my-auto flex flex-col items-center gap-4 max-w-lg">
            {/* Hand-drawn style crest emblem */}
            <div className="w-24 h-24 rounded-full border-4 border-double border-[#cfb53b] flex items-center justify-center bg-black/25 relative shadow-md">
              <GraduationCap className="w-10 h-10 text-[#cfb53b] drop-shadow-md" />
              <div className="absolute -bottom-1 bg-black px-2 py-0.5 rounded border border-[#cfb53b] text-[8px] font-mono text-[#cfb53b] font-bold tracking-widest uppercase">
                EST. 2026
              </div>
              {/* Stars decoration */}
              <Sparkles className="w-4 h-4 text-[#cfb53b]/40 absolute top-1 right-1" />
            </div>

            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight gold-gradient-text uppercase font-sketch">
                COGNITIVE COMPILER <br />
                <span className="text-2xl sm:text-3xl tracking-wide">& ENGINE SYNTAX</span>
              </h1>
              <div className="h-[2px] w-32 bg-[#cfb53b]/40 mx-auto my-3" />
              <p className="text-[#fbe7c6]/70 text-xs font-sans max-w-sm mx-auto leading-relaxed italic">
                A definitive manual testing syntax execution, compiler paradigms, runtime limits, and computer systems.
              </p>
            </div>
          </div>

          {/* Owner Desk Label & Action */}
          <div className="w-full flex flex-col items-center gap-5 mt-auto">
            
            {/* Realistic Owner Label taped/glued onto the cover */}
            <div className="bg-[#fefcf6] text-slate-800 p-3.5 rounded-md border-2 border-dashed border-amber-950/40 font-hand font-extrabold text-base rotate-[-1.5deg] shadow-md max-w-xs w-full text-center">
              <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                // STUDENT EXAM SPECIMEN
              </span>
              <span className="text-indigo-800 tracking-wider">
                {studentName}
              </span>
            </div>

            {/* Glowing Golden Action Trigger */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCoverOpened(true)}
              className="px-8 py-4 bg-gradient-to-r from-[#e3c75f] to-[#b19227] hover:from-[#f4db7a] hover:to-[#cfb03e] text-slate-950 font-mono font-black rounded-xl border-2 border-slate-900 shadow-lg cursor-pointer flex items-center gap-3 select-none text-xs uppercase tracking-widest"
              style={{
                borderRadius: '12px 12px 12px 12px',
                boxShadow: '0 6px 0px 0px #634f0c, 0 8px 15px rgba(0,0,0,0.4)'
              }}
            >
              <Book className="w-4.5 h-4.5 fill-current" />
              <span>OPEN TEXTBOOK TO START</span>
            </motion.button>
          </div>

        </div>

        {/* Publisher Credit at Bottom */}
        <div className="text-[9px] font-mono text-[#cfb53b]/50 uppercase tracking-wider pl-6 mt-2">
          ACADEMIC COGNITIVE PRESS • REPRODUCTIONS STRICTLY REGULATED
        </div>
      </motion.div>

      {/* 2. PHYSICAL INSIDE BOOK PAGES (Ruled Notebook Theme, visible once cover opens) */}
      <div 
        className="w-full bg-[#faf9f5] dark:bg-zinc-900 rounded-r-2xl border-2 border-slate-950 dark:border-zinc-700 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 notebook-margin"
        id="book-interior-page"
        style={{
          borderRadius: '6px 16px 16px 6px',
        }}
      >
        {/* Binder vertical red page division line */}
        <div className="absolute top-0 left-12 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />

        {/* Loose Binder Rings Motif at the top of the sheets */}
        <div className="absolute top-2 left-0 right-0 flex justify-around px-8 pointer-events-none opacity-80 z-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-3.5 h-6 bg-slate-300 dark:bg-zinc-700 rounded-full border-2 border-slate-400 dark:border-zinc-800 shadow-sm" />
              <div className="w-2 h-2 rounded-full bg-slate-400/30" />
            </div>
          ))}
        </div>

        {/* Back-to-Cover silk ribbon bookmark hanging from top-right */}
        {isCoverOpened && (
          <motion.button
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={() => setIsCoverOpened(false)}
            className="absolute top-0 right-8 bg-red-600 hover:bg-red-700 text-white text-[9px] font-mono font-black py-4 px-2.5 rounded-b-md shadow-md cursor-pointer border-x border-b border-red-800 z-30 transition-transform hover:translate-y-1 flex flex-col items-center gap-1 select-none"
            title="Close Book"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="writing-mode-vertical tracking-widest uppercase">COVER</span>
          </motion.button>
        )}

        {/* Main Form Area */}
        <div className="mt-8 pl-8 text-left flex-1 flex flex-col justify-between">
          <div>
            {/* Mini path indicator */}
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-5 h-5 text-indigo-700 dark:text-indigo-400 shrink-0" />
              <span className="font-hand font-bold text-2xl text-indigo-700 dark:text-indigo-400 tracking-wider">
                Classroom_Quiz_01.cpp
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-zinc-50 tracking-tight font-sketch mb-5 leading-tight">
              Programming Language <br />
              <span className="marker-underline text-indigo-700 dark:text-indigo-400 font-black">
                Class Quiz #3
              </span>
            </h2>

            <p className="text-slate-600 dark:text-zinc-400 text-sm font-sans mb-6 leading-relaxed max-w-lg">
              This interactive test challenges your comprehension of language paradigms, compiler rules, and evaluation engines. Set up your language module and timer below.
            </p>

            {/* STEP 1: Language Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-zinc-400 mb-3 font-mono">
                // Step 1: Choose Language Module
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {programmingLanguages.map((lang, index) => {
                  const isActive = selectedLanguage === lang.id;
                  const IconComp = lang.icon;
                  
                  // Custom sketch border geometry based on grid position
                  const radiusStyles = index % 2 === 0
                    ? "180px 15px 160px 12px/12px 140px 15px 180px"
                    : "15px 160px 12px 180px/180px 12px 140px 15px";

                  return (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left focus:outline-none ${
                        isActive
                          ? 'bg-indigo-50/75 dark:bg-indigo-950/40 border-indigo-700 text-indigo-900 dark:text-indigo-300 ring-2 ring-indigo-500/15 translate-y-[1px]'
                          : 'bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-neutral-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-700/50'
                      }`}
                      style={{
                        borderRadius: radiusStyles,
                        boxShadow: isActive ? '2px 2px 0px 0px #4338ca' : '3px 3px 0px 0px #1e293b'
                      }}
                    >
                      <div className={`p-2 rounded-xl border ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700' : 'bg-slate-50 dark:bg-zinc-700 text-neutral-400'}`}>
                        <IconComp className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${isActive ? 'text-indigo-900 dark:text-indigo-200' : ''}`}>
                          {lang.label}
                        </h4>
                        <span className="text-[9px] font-mono text-slate-400 font-semibold block uppercase">
                          {lang.note}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Difficulty Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-zinc-400 mb-3 font-mono">
                // Step 2: Choose Exam Timer Constraint
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((level) => {
                  const isActive = selectedDifficulty === level;

                  return (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(level)}
                      className={`py-2.5 px-3 rounded-xl border-2 font-mono text-xs font-bold tracking-wider transition-all cursor-pointer text-center focus:outline-none ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 ring-2 ring-indigo-500/20 translate-y-[1px]'
                          : 'bg-white dark:bg-zinc-800 text-neutral-500 hover:bg-slate-50 dark:hover:bg-zinc-700/50'
                      }`}
                      style={{
                        borderRadius: level === 'EASY' ? '120px 10px 110px 10px/10px 110px 10px 120px' :
                                      level === 'MEDIUM' ? '10px 110px 10px 120px/120px 10px 110px 10px' :
                                      '110px 10px 120px 10px/10px 120px 10px 110px',
                        boxShadow: isActive ? '1px 1px 0px 0px #4338ca' : '2px 2px 0px 0px #1e293b'
                      }}
                    >
                      <span className={`block text-[9px] ${isActive ? 'font-black' : 'font-medium'} opacity-60 mb-0.5`}>
                        {level === 'EASY' ? '●' : level === 'MEDIUM' ? '▲' : '◆'}
                      </span>
                      <span className={isActive ? 'font-black' : ''}>{level}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Difficulty Rules Sheet */}
            <div className="bg-amber-50/40 dark:bg-amber-950/10 border-2 border-amber-200/50 dark:border-amber-950/40 rounded-2xl p-4 mb-6 text-xs relative overflow-hidden">
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-200/20 dark:bg-amber-950/20 rounded-full" />
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[9px] uppercase font-bold text-amber-800 dark:text-amber-400">
                  Grading Spec Notation
                </span>
                <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-950 dark:text-amber-300 font-bold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">
                  {difficultyRules[selectedDifficulty].tag}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-neutral-700 dark:text-zinc-300 leading-relaxed">
                <p className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">Timer Limit:</span>
                  <span className="font-mono bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-amber-200 dark:border-zinc-700 font-semibold text-indigo-700 dark:text-indigo-400">
                    {difficultyRules[selectedDifficulty].time} per question
                  </span>
                </p>
                <p className="mt-1 text-xs">
                  {difficultyRules[selectedDifficulty].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onStart(selectedDifficulty)}
            className="w-full mt-4 bg-slate-900 dark:bg-zinc-100 dark:text-slate-900 text-white font-mono font-bold py-4 px-6 rounded-2xl border-2 border-slate-900 dark:border-zinc-50 flex items-center justify-center gap-3 cursor-pointer transition-colors shadow-lg"
            style={{
              borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px'
            }}
            id="start-quiz-button"
          >
            <Play className="w-5 h-5 fill-current animate-pulse text-indigo-400 dark:text-indigo-600" />
            <span className="tracking-widest uppercase text-xs">Compile & Start Exam Sheet</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
