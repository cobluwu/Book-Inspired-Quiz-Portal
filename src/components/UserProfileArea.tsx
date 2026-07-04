import { safeGetItem, safeSetItem, safeRemoveItem } from "../lib/storage";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, QuizAttempt, Difficulty } from '../types';
import { getStreakData } from '../lib/streak';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  User, 
  Edit3, 
  Save, 
  Users, 
  Award, 
  History, 
  TrendingUp, 
  Trash2, 
  Check, 
  Heart,
  Calendar,
  Zap,
  BookOpen
} from 'lucide-react';

interface UserProfileAreaProps {
  attempts: QuizAttempt[];
  onClearHistory: () => void;
}

const AVATARS = [
  { char: "🦊", label: "Clever Fox" },
  { char: "🧙‍♂️", label: "Code Wizard" },
  { char: "🚀", label: "Compiler Jet" },
  { char: "💻", label: "Keyboard Master" },
  { char: "🦉", label: "Debugging Owl" },
  { char: "🦕", label: "Legacy Dino" }
];

const DEFAULT_PROFILE: UserProfile = {
  username: "Student_404",
  bio: "Compiling code, drinking coffee, and ignoring warning messages since line 1.",
  avatar: "🦊",
  followersCount: 128,
  friends: ["Ada Lovelace", "Alan Turing", "Grace Hopper", "Linus Torvalds"]
};

export default function UserProfileArea({ attempts, onClearHistory }: UserProfileAreaProps) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const [streak, setStreak] = useState(() => getStreakData());

  // Load profile & streak on mount
  useEffect(() => {
    const saved = safeGetItem('pl_quiz_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setProfile(parsed);
        }
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }
    setStreak(getStreakData());
  }, [attempts]);

  // Sync state with edit fields when editing starts
  const startEditing = () => {
    setEditUsername(profile.username);
    setEditBio(profile.bio);
    setEditAvatar(profile.avatar);
    setIsEditing(true);
  };

  const saveProfile = () => {
    const updated: UserProfile = {
      ...profile,
      username: editUsername.trim() || "Anonymous Student",
      bio: editBio.trim() || "No bio annotated yet.",
      avatar: editAvatar,
    };
    setProfile(updated);
    safeSetItem('pl_quiz_user_profile', JSON.stringify(updated));
    setIsEditing(false);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  // Calculate stats
  const totalQuizzes = attempts.length;
  const highestScore = attempts.reduce((max, attempt) => Math.max(max, attempt.score), 0);
  
  const totalCorrect = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const totalQuestions = attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Get performance trend data for the last 5 attempts
  const getPerformanceTrendData = () => {
    // Sort chronological: oldest to newest
    const sortedAttempts = [...attempts].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    // Take the last 5
    const lastFive = sortedAttempts.slice(-5);
    
    return lastFive.map((attempt, index) => {
      const accuracy = Math.round((attempt.score / attempt.total) * 100);
      return {
        game: `Exm #${index + 1}`,
        accuracy,
        scoreText: `${attempt.score}/${attempt.total}`,
        language: attempt.language,
        difficulty: attempt.difficulty,
      };
    });
  };

  const trendData = getPerformanceTrendData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#faf9f5] dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-800 p-2.5 rounded-xl shadow-xs font-mono text-[10px] text-left">
          <p className="font-extrabold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">{data.language}</p>
          <p className="text-[9px] text-slate-400 capitalize mb-1">Difficulty: {data.difficulty.toLowerCase()}</p>
          <p className="text-slate-800 dark:text-zinc-200 font-bold border-t border-slate-200 dark:border-zinc-800 pt-1 mt-1">
            Accuracy: <span className="font-black text-emerald-600 dark:text-emerald-400">{data.accuracy}%</span>
          </p>
          <p className="text-slate-500 font-medium">Score: {data.scoreText}</p>
        </div>
      );
    }
    return null;
  };

  // Determine Level and Milestone
  // "Level 1: Beginner (0-3 quizzes)", "Level 2: Trivia Master (4+ quizzes)", etc.
  let currentLevel = "Level 1: Novice Cadet";
  let nextLevelGoal = "Solve 4 quizzes to advance";
  let levelProgress = (totalQuizzes / 4) * 100;
  let levelColor = "bg-blue-400";

  if (totalQuizzes >= 10) {
    currentLevel = "Level 4: Compiler Overlord";
    nextLevelGoal = "Max Level Achieved! Truly legendary.";
    levelProgress = 100;
    levelColor = "bg-amber-500";
  } else if (totalQuizzes >= 7) {
    currentLevel = "Level 3: Byte Sorcerer";
    nextLevelGoal = "Solve 10 quizzes for Max Rank";
    levelProgress = ((totalQuizzes - 7) / 3) * 100;
    levelColor = "bg-indigo-600";
  } else if (totalQuizzes >= 4) {
    currentLevel = "Level 2: Syntax Overlord";
    nextLevelGoal = "Solve 7 quizzes to rank up";
    levelProgress = ((totalQuizzes - 4) / 3) * 100;
    levelColor = "bg-emerald-500";
  }

  // Dynamic Classmates (Friends) statuses to keep the school vibe
  const classmates = [
    { name: "Ada Lovelace", desc: "Debugging first loop", status: "Online", icon: "👩‍💻" },
    { name: "Alan Turing", desc: "Running decryption trial...", status: "In Exam", icon: "👨‍💻" },
    { name: "Grace Hopper", desc: "Extracting moth from compiler", status: "Offline", icon: "👩‍✈️" },
    { name: "Linus Torvalds", desc: "No comments on my code, please.", status: "Online", icon: "🐧" },
  ];

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative" id="user-profile-layout">
      
      {/* LEFT COLUMN: Student Card Detail (4 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div 
          className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 relative overflow-hidden notebook-margin"
          style={{ borderRadius: '15px 160px 12px 180px/180px 12px 140px 15px' }}
        >
          {/* Red notebook margin lines */}
          <div className="absolute top-0 left-10 bottom-0 w-[1.5px] bg-red-400/30 pointer-events-none" />
          
          <div className="pl-6 relative">
            <span className="font-mono text-[9px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest block mb-4">
              // STUDENT_RECORD_0x3B
            </span>

            {/* Profile Avatar & Info View */}
            <div className="flex flex-col items-center text-center mt-2">
              <div className="relative">
                {/* Handdrawn circle accent */}
                <div className="absolute inset-0 border-2 border-dashed border-slate-400 dark:border-zinc-700 rounded-full scale-110 pointer-events-none animate-spin-slow" />
                <span className="text-7xl block select-none bg-white dark:bg-zinc-800 p-4 rounded-full border-2 border-slate-900 dark:border-zinc-700 shadow-md">
                  {profile.avatar}
                </span>
              </div>

              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-black font-sketch text-neutral-900 dark:text-zinc-50 mt-4 flex items-center gap-1.5">
                    {profile.username}
                  </h2>
                  <p className="font-hand font-semibold text-[17px] text-slate-600 dark:text-zinc-300 mt-2 max-w-xs leading-relaxed italic">
                    "{profile.bio}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-5 py-2 px-4 bg-slate-100 dark:bg-zinc-800/40 rounded-xl border border-dashed border-slate-300 dark:border-zinc-800">
                    <div className="text-left">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Academic Score</span>
                      <span className="text-sm font-extrabold font-mono text-indigo-600 dark:text-indigo-400">{attempts.length > 0 ? `${highestScore * 100} pts` : "N/A"}</span>
                    </div>
                    <div className="w-[1px] h-6 bg-slate-300 dark:bg-zinc-700" />
                    <div className="text-left">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono">Followers</span>
                      <span className="text-sm font-extrabold font-mono text-neutral-800 dark:text-zinc-200">
                        {profile.followersCount + attempts.length * 3}
                      </span>
                    </div>
                  </div>

                  {/* Daily Study Streak highlight card */}
                  <div className="mt-4 w-full bg-[#fef3c7]/60 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-900 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs text-left">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-amber-100 dark:bg-amber-900/45 p-2 rounded-xl text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                        <Zap className="w-5 h-5 fill-amber-500 text-amber-600 dark:text-amber-400 shrink-0" />
                      </div>
                      <div className="text-left">
                        <span className="block text-[9px] uppercase font-bold font-mono text-amber-800 dark:text-amber-400 tracking-wider">DAILY STUDY STREAK</span>
                        <span className="text-base font-black font-sketch text-amber-950 dark:text-amber-200 leading-tight">
                          {streak.currentStreak} {streak.currentStreak === 1 ? 'Day' : 'Days'} Active
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-[8px] uppercase font-bold font-mono text-amber-700/60 dark:text-amber-500/60">BEST RUN</span>
                      <span className="text-xs font-black font-mono text-amber-900 dark:text-amber-400">
                        {streak.highestStreak}d
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={startEditing}
                    className="mt-6 flex items-center gap-2 text-xs font-mono font-bold bg-white dark:bg-zinc-800 hover:bg-slate-50 border-2 border-slate-900 dark:border-zinc-700 py-2 px-4 rounded-xl cursor-pointer shadow-sm transition-all"
                    style={{ borderRadius: '80px 10px 90px 8px/10px 75px 8px 80px' }}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Student Card</span>
                  </button>
                </>
              ) : (
                <div className="w-full text-left mt-5 flex flex-col gap-4">
                  {/* Edit Username */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">
                      Student Handle:
                    </label>
                    <input
                      type="text"
                      maxLength={18}
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-950 px-3 py-2 rounded-xl border-2 border-slate-900 dark:border-zinc-700 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Edit Bio */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-1">
                      Personal Annotation (Bio):
                    </label>
                    <textarea
                      maxLength={120}
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-950 px-3 py-2 rounded-xl border-2 border-slate-900 dark:border-zinc-700 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>

                  {/* Predefined Avatar Selector */}
                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-slate-400 mb-2">
                      Choose Desk Charm (Avatar):
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {AVATARS.map((av) => (
                        <button
                          key={av.char}
                          type="button"
                          onClick={() => setEditAvatar(av.char)}
                          title={av.label}
                          className={`text-2xl p-2 rounded-xl border-2 transition-all cursor-pointer text-center ${
                            editAvatar === av.char 
                              ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-700' 
                              : 'bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 hover:bg-slate-50'
                          }`}
                        >
                          {av.char}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Edit action buttons */}
                  <div className="flex gap-2.5 mt-2">
                    <button
                      onClick={saveProfile}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 dark:bg-zinc-100 dark:text-slate-900 text-white font-mono font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all border border-slate-900 shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Sheet</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 font-mono font-bold text-xs py-2.5 rounded-xl border-2 border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-neutral-500 dark:text-zinc-400 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Saved success banner */}
              <AnimatePresence>
                {showSavedFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs flex items-center justify-center gap-2 w-full font-mono font-semibold"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Student Profile Compiled!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Social - Study Buddies (Friends) list card */}
        <div 
          className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-5 relative overflow-hidden notebook-margin"
          style={{ borderRadius: '15px 12px 140px 15px/120px 10px 110px 10px' }}
        >
          <div className="absolute top-0 left-10 bottom-0 w-[1.5px] bg-red-400/30 pointer-events-none" />
          
          <div className="pl-6 relative">
            <h3 className="text-base font-extrabold font-sketch text-slate-800 dark:text-zinc-100 flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-slate-600" />
              <span>Study Group Buddies</span>
            </h3>

            <div className="flex flex-col gap-3.5">
              {classmates.map((buddy) => (
                <div key={buddy.name} className="flex items-center justify-between text-xs border-b border-dashed border-slate-200 dark:border-zinc-800/80 pb-2 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{buddy.icon}</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-slate-800 dark:text-zinc-200">{buddy.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium italic">{buddy.desc}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase ${
                    buddy.status === "Online" 
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700" 
                      : buddy.status === "In Exam" 
                        ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 animate-pulse" 
                        : "bg-slate-100 dark:bg-zinc-800 text-slate-400"
                  }`}>
                    {buddy.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Statistics & Log Sheets (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* LIFETIME METRICS SHEET */}
        <div 
          className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 relative overflow-hidden notebook-margin"
          style={{ borderRadius: '180px 15px 160px 12px/12px 140px 15px 180px' }}
        >
          <div className="absolute top-0 left-10 bottom-0 w-[1.5px] bg-red-400/30 pointer-events-none" />
          
          <div className="pl-6 relative">
            <h3 className="text-base font-extrabold font-sketch text-slate-800 dark:text-zinc-100 flex items-center gap-2 mb-5">
              <Award className="w-4.5 h-4.5 text-indigo-700 dark:text-indigo-400" />
              <span>Lifetime Academy Analytics</span>
            </h3>

            {/* Grid of basic stats */}
            <div className="grid grid-cols-3 gap-3 text-center mb-6">
              <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-slate-200 dark:border-zinc-800 shadow-sm">
                <span className="block text-[9px] uppercase font-mono text-slate-400 font-bold mb-1">Total Exams</span>
                <span className="text-2xl font-black font-sketch text-indigo-700 dark:text-indigo-400">{totalQuizzes}</span>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-slate-200 dark:border-zinc-800 shadow-sm">
                <span className="block text-[9px] uppercase font-mono text-slate-400 font-bold mb-1">Mean Accuracy</span>
                <span className="text-2xl font-black font-sketch text-emerald-600 dark:text-emerald-400">{overallAccuracy}%</span>
              </div>
              <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl border-2 border-slate-200 dark:border-zinc-800 shadow-sm">
                <span className="block text-[9px] uppercase font-mono text-slate-400 font-bold mb-1">Peak Score</span>
                <span className="text-2xl font-black font-sketch text-rose-500">{highestScore > 0 ? highestScore * 100 : "0"}</span>
              </div>
            </div>

            {/* MILESTONE / PROGRESS METER */}
            <div className="border-t-2 border-dashed border-slate-200 dark:border-zinc-800 pt-5 text-left">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Current Rank Rank:
                </span>
                <span className="text-xs font-black text-indigo-800 dark:text-indigo-400 font-sketch">
                  {currentLevel}
                </span>
              </div>

              {/* Progress bar drawn like a classroom chalk / highlighter segment */}
              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-4.5 rounded-full overflow-hidden p-1 border border-slate-300 dark:border-zinc-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(levelProgress, 8)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${levelColor} shadow-inner`}
                />
              </div>
              <div className="flex justify-between items-center mt-1.5 text-[9px] font-mono text-slate-400 font-semibold uppercase">
                <span>Novice Cadet</span>
                <span className="text-indigo-700 dark:text-indigo-400 lowercase italic">{nextLevelGoal}</span>
                <span>Max Scholar</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACADEMIC PERFORMANCE TRENDS GRAPH */}
        <div 
          className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 relative overflow-hidden notebook-margin"
          style={{ borderRadius: '12px 140px 15px 180px/180px 15px 160px 12px' }}
        >
          <div className="absolute top-0 left-10 bottom-0 w-[1.5px] bg-red-400/30 pointer-events-none" />
          
          <div className="pl-6 relative">
            <h3 className="text-base font-extrabold font-sketch text-slate-800 dark:text-zinc-100 flex items-center gap-2 mb-2">
              <TrendingUp className="w-4.5 h-4.5 text-indigo-700 dark:text-indigo-400" />
              <span>Academic Performance Curve</span>
            </h3>
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
              // scoring_accuracy_trends_last_5_exams
            </p>

            {attempts.length < 2 ? (
              <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center bg-white/50 dark:bg-zinc-950/20 py-10">
                <p className="font-hand font-semibold text-base text-slate-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  "Compile and submit at least 2 completed exam sheets to map out your academic progress curve!"
                </p>
                <div className="mt-3 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                  Current Exams: {attempts.length} / 2 required
                </div>
              </div>
            ) : (
              <div className="w-full bg-white dark:bg-zinc-950/20 rounded-2xl border-2 border-slate-200 dark:border-zinc-800/80 p-3 pt-5">
                <div className="w-full h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                      <XAxis 
                        dataKey="game" 
                        stroke="#94a3b8" 
                        fontSize={9}
                        fontFamily="monospace"
                        tickLine={false} 
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={9}
                        fontFamily="monospace"
                        domain={[0, 100]}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#4f46e5" 
                        strokeWidth={2.5}
                        fillOpacity={1} 
                        fill="url(#colorAccuracy)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-dashed border-slate-200 dark:border-zinc-800/60 font-mono text-[9px] text-slate-400 px-1 uppercase">
                  <span>← Oldest Submissions</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">Accuracy Target: 80%+</span>
                  <span>Latest submission →</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COMPREHENSIVE EXAM LOGS AND HISTORY */}
        <div 
          className="bg-[#faf9f5] dark:bg-zinc-900 sketch-border-thick sketch-shadow p-6 relative overflow-hidden notebook-margin flex-1"
          style={{ borderRadius: '15px 160px 12px 180px/180px 12px 140px 15px' }}
        >
          <div className="absolute top-0 left-10 bottom-0 w-[1.5px] bg-red-400/30 pointer-events-none" />
          
          <div className="pl-6 relative h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-base font-extrabold font-sketch text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                  <History className="w-4.5 h-4.5 text-indigo-700 dark:text-indigo-400" />
                  <span>Recent Exam Ledger</span>
                </h3>

                {attempts.length > 0 && (
                  <button
                    onClick={onClearHistory}
                    className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-500 hover:text-red-700 hover:underline bg-red-50 dark:bg-red-950/20 px-2.5 py-1.5 border border-red-200 dark:border-red-900/30 rounded-xl cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Sheets</span>
                  </button>
                )}
              </div>

              {attempts.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950/5 p-6 flex flex-col items-center gap-2">
                  <BookOpen className="w-8 h-8 text-slate-300 dark:text-zinc-700" />
                  <p className="font-hand font-semibold text-lg text-slate-500">
                    "No exam logs found in this semester."
                  </p>
                  <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    Start an Exam Sheet to compile grades
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5 max-h-[340px] overflow-y-auto pr-1">
                  {attempts.slice().reverse().map((at) => {
                    const accuracy = Math.round((at.score / at.total) * 100);
                    const formattedDate = new Date(at.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <div 
                        key={at.id}
                        className="bg-white dark:bg-zinc-950/35 border-2 border-slate-300 dark:border-zinc-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="flex flex-col text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-800 dark:text-zinc-100">
                              {at.language}
                            </span>
                            <span className="bg-slate-100 dark:bg-zinc-800 text-slate-500 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                              {at.difficulty}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold font-mono mt-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formattedDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4.5 justify-between sm:justify-end">
                          <div className="flex flex-col items-end">
                            <span className="font-sketch font-bold text-xl text-indigo-700 dark:text-indigo-400 leading-none">
                              {at.score}/{at.total} Correct
                            </span>
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                              {accuracy}% Score
                            </span>
                          </div>

                          <div className="bg-slate-50 dark:bg-zinc-800 p-2 rounded-xl border border-slate-200 dark:border-zinc-700 font-mono text-xs font-bold text-indigo-700 dark:text-indigo-400 min-w-[50px] text-center">
                            +{at.score * 100}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Geeks note decoration */}
            <div className="mt-6 border-t border-dashed border-slate-200 dark:border-zinc-800 pt-3 text-right">
              <span className="text-[9px] font-mono text-slate-400 font-bold flex items-center gap-1 justify-end">
                <Zap className="w-3 h-3 text-amber-500" /> Grades stored persistently in browser memory.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
