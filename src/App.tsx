import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Target, Sparkles, Compass, Mail, User } from 'lucide-react';

// --- Data Types ---
interface Question {
  id: string;
  type: 'text' | 'textarea' | 'email';
  label: string;
  description?: string;
  placeholder?: string;
}

interface Section {
  id: string;
  title: string;
  chapter?: string;
  questions: Question[];
  isIntro?: boolean;
  isFinal?: boolean;
}

// --- App Content ---
const SECTIONS: Section[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    isIntro: true,
    questions: [
      { id: 'first_name', type: 'text', label: 'First Name', placeholder: 'Enter your first name' },
      { id: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Enter your last name' },
      { id: 'email', type: 'email', label: 'Email Address', placeholder: 'Where should we send your plan?' }
    ]
  },
  {
    id: 'chapter1_1',
    chapter: 'Chapter 1: The Mirror',
    title: '1.1 What’s One Thing You’d Like to Improve?',
    questions: [
      {
        id: 'improve_one',
        type: 'textarea',
        label: "If you could get better at just one thing this year, what would it be? It could be a school subject, a personal skill, a habit, or even how you handle challenges.",
        description: "📝 Write a few sentences explaining what it is and why it matters to you.",
        placeholder: "Your answer here..."
      }
    ]
  },
  {
    id: 'chapter1_2',
    chapter: 'Chapter 1: The Mirror',
    title: '1.2. Things to Learn About',
    questions: [
      {
        id: 'learn_desc',
        type: 'textarea',
        label: "What’s something you’re curious about or would like to get better at — in the next 6 months, 2 years, and 5 years? Think about school, life skills, passions, or future careers.",
        description: "📝 Write 1–2 sentences for each time frame: short-term (6 months), medium-term (2 years), and long-term (5 years).",
        placeholder: "6 months: \n2 years: \n5 years: "
      }
    ]
  },
  {
    id: 'chapter1_3',
    chapter: 'Chapter 1: The Mirror',
    title: '1.3 Improve Your Habits',
    questions: [
      {
        id: 'habits_to_change',
        type: 'textarea',
        label: "What Habits Could You Improve? Are there any habits you’d like to get better at — or stop — in these areas:\n• 📘 School (e.g. procrastination, focus, studying)\n• 👥 Friends & family (e.g. communication, respect, time together)\n• 🧠 Health & well-being (e.g. sleep, exercise, eating)\n• 🚫 Temptations (e.g. phone use, smoking, alcohol, substances)",
        description: "📝 Write down a few habits you want to build or change — and why.",
        placeholder: "Your answer here..."
      }
    ]
  },
  {
    id: 'chapter2_4',
    chapter: 'Chapter 2: The Horizon',
    title: '1.4. Your Social Life in the Future',
    questions: [
      {
        id: 'social_life',
        type: 'textarea',
        label: "What Kind of Friends and Social Life Do You Want? Think about the kind of people you want to spend time with — friends, mentors, teammates, classmates. What kind of friendships or social life would help you grow and feel supported?",
        description: "📝 Write a few sentences describing your ideal group of friends and social environment. Think about the kind of people who bring out your best.",
        placeholder: "Your answer here..."
      }
    ]
  },
  {
    id: 'chapter2_5',
    chapter: 'Chapter 2: The Horizon',
    title: '1.5. Your Leisure Activity in the Future',
    questions: [
      {
        id: 'leisure_time',
        type: 'textarea',
        label: "What Will You Do With Your Free Time? Outside of school and responsibilities, how do you want to spend your free time in a way that’s fun and meaningful? Instead of wasting time, what hobbies, creative projects, or positive habits would like to build into your life?",
        description: "📝 Write a few sentences about how you’d like to use your free time — to grow, relax, or do something you enjoy and feel proud of.",
        placeholder: "Your answer here..."
      }
    ]
  },
  {
    id: 'chapter2_6',
    chapter: 'Chapter 2: The Horizon',
    title: '1.6. Your Family Life in the Future',
    questions: [
      {
        id: 'family_life',
        type: 'textarea',
        label: "What Kind of Family Life Do You Want? Think about your family now — and the kind of family or home you want in the future. What kind of relationships would make you feel supported and connected? How could you improve things with your parents or siblings? What kind of partner would be good for you one day?",
        description: "📝 Write a few sentences about your ideal family life — both now and in the future.",
        placeholder: "Your answer here..."
      }
    ]
  },
  {
    id: 'chapter2_7',
    chapter: 'Chapter 2: The Horizon',
    title: '1.7. Your Career in the Future',
    questions: [
      {
        id: 'career_desc',
        type: 'textarea',
        label: "What Career or Future Work Would You Enjoy? Think about your school and future career path. Where would you like to be in the next:\n• 🗓️ 6 months (e.g. school progress, internships, part-time work)\n• 🗓️ 2 years (e.g. what you’re studying or learning)\n• 🗓️ 5 years (e.g. what kind job or work you’d like to do)",
        description: "📝 Write 1–2 sentences for each time frame. What are you aiming for — and why does it matter to you?",
        placeholder: "Your answer here..."
      }
    ]
  },
  {
    id: 'chapter3_8',
    chapter: 'Chapter 3: The Mentors',
    title: '1.8. Qualities You Admire',
    questions: [
      {
        id: 'mentors_admire',
        type: 'textarea',
        label: "Who are the people you admire and why? Think of people you know personally, or famous people, or even fictional characters. What qualities do they have that you would like to develop in yourself?",
        description: "📝 Write a few sentences describing the people you look up to and the specific qualities they have that you admire.",
        placeholder: "Who do you admire and why?"
      }
    ]
  },
  {
    id: 'chapter4_9',
    chapter: 'Chapter 4: Future Vision',
    title: '2.1 The Big Picture',
    questions: [
      {
        id: 'big_goal_title',
        type: 'text',
        label: "Big Goal Title",
        description: "Give your overall future vision a clear, inspiring title.",
        placeholder: "e.g. My Path to Becoming an Engineer"
      },
      {
        id: 'big_goal_desc',
        type: 'textarea',
        label: "Big Goal Description",
        description: "Describe your overall vision for your life in 3–5 years. What is the main outcome you are working towards?",
        placeholder: "Describe your big picture vision..."
      }
    ]
  },
  {
    id: 'chapter4_10',
    chapter: 'Chapter 4: Future Vision',
    title: '2.2 Break Into 6 Goals',
    questions: [
      { 
        id: 'goal_instructions_header', 
        type: 'textarea', 
        label: "Try to think of 6 important goals you want to work toward. These can be about:\n\n• 📘 School (e.g. “Get accepted into university”)\n• 💼 Career (e.g. “Start my own business one day”)\n• 💪 Health (e.g. “Eat better and get fit”)\n• 👥 Friends or family (e.g. “Improve my relationship with my parents”)\n• 🎨 Personal growth (e.g. “Read more books” or “Build confidence”)\n\nYou can also look back at your answers from the earlier questions to help.",
        description: "📝 Give the Goal a Title and then Write 1 short sentence for each goal. Keep it simple and focused.",
        placeholder: "Self-reflection area (optional)..."
      },
      { id: 'goal1_title', type: 'text', label: "Goal 1: Title", placeholder: "Goal Title" },
      { id: 'goal1_desc', type: 'text', label: "Goal 1: Description (1 short sentence)", placeholder: "Short description..." },
      { id: 'goal2_title', type: 'text', label: "Goal 2: Title", placeholder: "Goal Title" },
      { id: 'goal2_desc', type: 'text', label: "Goal 2: Description (1 short sentence)", placeholder: "Short description..." },
      { id: 'goal3_title', type: 'text', label: "Goal 3: Title", placeholder: "Goal Title" },
      { id: 'goal3_desc', type: 'text', label: "Goal 3: Description (1 short sentence)", placeholder: "Short description..." },
      { id: 'goal4_title', type: 'text', label: "Goal 4: Title", placeholder: "Goal Title" },
      { id: 'goal4_desc', type: 'text', label: "Goal 4: Description (1 short sentence)", placeholder: "Short description..." },
      { id: 'goal5_title', type: 'text', label: "Goal 5: Title", placeholder: "Goal Title" },
      { id: 'goal5_desc', type: 'text', label: "Goal 5: Description (1 short sentence)", placeholder: "Short description..." },
      { id: 'goal6_title', type: 'text', label: "Goal 6: Title", placeholder: "Goal Title" },
      { id: 'goal6_desc', type: 'text', label: "Goal 6: Description (1 short sentence)", placeholder: "Short description..." }
    ]
  },
  {
    id: 'chapter4_priority',
    chapter: 'Chapter 4: Future Vision',
    title: '2.3 Prioritize Your Goals',
    questions: [
      {
        id: 'goal_priority_order',
        type: 'text',
        label: "Now, put your goals in order of importance.",
        description: "📝 Drag or click to arrange your 6 goals from most important (1) to least important (6). This helps you focus on what matters most first.",
        placeholder: "Ordering..."
      }
    ]
  }
];

const FINAL_SECTION: Section = {
  id: 'final_future_steps',
  chapter: 'Final Step: Future Steps',
  title: 'Congratulations!',
  isFinal: true,
  questions: [
    {
      id: 'final_message',
      type: 'textarea',
      label: "You have completed your Personal Vision Plan.",
      description: "The mere act of capturing this important information about your future already puts you at an advantage to achieve these things.",
      placeholder: ""
    }
  ]
};

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [goalOrder, setGoalOrder] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  // Dynamic Deep-Dive Sections for each goal
  const deepDiveSections: Section[] = goalOrder.map((goalNum, index) => {
    const goalTitle = answers[`goal${goalNum}_title`] || `Goal ${goalNum}`;
    return {
      id: `chapter4_goal_${goalNum}`,
      chapter: 'Chapter 4: Future Vision',
      title: `Goal ${index + 1} of 6: ${goalTitle}`,
      questions: [
        {
          id: `goal${goalNum}_why`,
          type: 'textarea',
          label: `2.4.1 Why Do You Want This Goal: "${goalTitle}"?\nTake a moment to think about why this goal matters to you. Ask yourself:\n• Do I really care about this goal?\n• Am I doing it for myself, or to please others?\n• Would I feel disappointed if I gave up on it?\n• Does this goal excite or inspire me?\n• Is it part of a bigger dream for my life?`,
          description: "📝 Write a few sentences explaining why this goal is important to you.",
          placeholder: "Why it matters..."
        },
        {
          id: `goal${goalNum}_steps`,
          type: 'textarea',
          label: `2.4.2 What Are the Steps to Reach This Goal?\nThink about the small actions and habits that will help you reach your goal. What can you do every day or every week that moves you forward? Ask yourself:\n• What exactly do I need to do?\n• How often will I do it? (daily, weekly, etc.)\n• When and where will I do it?\n• How can I make it a regular part of my life?`,
          description: "📝 Write 3–5 clear, practical steps you’ll take to move toward this goal. Be as specific as possible.",
          placeholder: "Your steps..."
        },
        {
          id: `goal${goalNum}_obstacles`,
          type: 'textarea',
          label: `2.4.3 What Might Get in the Way — and How Will You Handle It?\nEvery goal has challenges. The key is to think ahead and plan how you’ll deal with them. Ask yourself:\n• What might stop me from reaching this goal? (e.g. distractions, lack of time, fear)\n• Could I be my own biggest obstacle?\n• Will my friends or family support me — or might some make it harder?\n• What could go wrong — and what’s my backup plan?`,
          description: "📝 Write down the most likely obstacles — and next to each one, a solution or strategy to deal with it.",
          placeholder: "Obstacles and solutions..."
        },
        {
          id: `goal${goalNum}_tracking`,
          type: 'textarea',
          label: `2.4.4 How Will You Track Your Progress?\nYou need to know if you’re moving forward — so let’s make a plan to check in. Ask yourself:\n• 📅 When do I want to achieve this goal? (Set a clear deadline)\n• 🪜 What signs will show me I’m on track? (e.g. “I’m practicing three times a week” or “My grades have improved”)\n• 🔁 How often will I check my progress? (e.g. weekly, monthly)\n• 🔄 What changes will I see in my life if I’m improving?\n• ⚖️ How will I keep a balance — pushing myself, but not burning out?`,
          description: "📝 Write a few sentences or bullet points about how and when you’ll check your progress, and what success will look like along the way.",
          placeholder: "Tracking plan..."
        }
      ]
    };
  });

  // Final list of sections: static, then deep dive, then final congrats
  const ALL_SECTIONS = [...SECTIONS, ...deepDiveSections, FINAL_SECTION];

  const section = ALL_SECTIONS[currentSection];
  const progress = ((currentSection) / (ALL_SECTIONS.length - 1)) * 100;

  const handleInputChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const moveGoal = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...goalOrder];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < 6) {
      [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
      setGoalOrder(newOrder);
    }
  };

  const next = () => {
    if (currentSection < ALL_SECTIONS.length - 1) setCurrentSection(prev => prev + 1);
  };

  const prev = () => {
    if (currentSection > 0) setCurrentSection(prev => prev - 1);
  };

  const [showSummary, setShowSummary] = useState(false);

  if (showSummary) {
    return <SummaryView answers={answers} goalOrder={goalOrder} onBack={() => setShowSummary(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f4f0] text-[#1a2b4b] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#c5a059]/5 rounded-full blur-3xl p-4" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1a2b4b]/5 rounded-full blur-3xl p-4" />

      {/* Header / Logo */}
      <div className="w-full max-w-2xl mb-12 flex flex-col items-center">
        <img 
          src="/academy_logo.jpg" 
          alt="Vineyard Youth Academy" 
          className="h-24 md:h-32 mb-8 object-contain"
        />
        <div className="w-full flex justify-between items-end border-t border-black/5 pt-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-vision-gold">
              <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Your Future Plan</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif">
              {section.chapter || 'Introduction'}
            </h1>
          </div>
          {currentSection > 0 && (
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Progress</span>
              <div className="text-lg font-serif">{Math.round(progress)}%</div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar (Only show after intro) */}
      {currentSection > 0 && (
        <div className="w-full max-w-2xl h-[2px] bg-black/5 rounded-full mb-12 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#c5a059]"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="w-full max-w-2xl relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-8"
          >
            {section.isIntro ? (
              <div className="space-y-8">
                <div className="bg-white/40 p-8 rounded-lg border border-white/60 backdrop-blur-sm">
                  <p className="text-lg md:text-xl font-light leading-relaxed text-[#1a2b4b]/80 italic">
                    "This session is not about getting the 'right answers.' It’s about thinking honestly about your life."
                  </p>
                  <p className="mt-4 text-base font-light opacity-70 leading-relaxed">
                    Take your time. Be real. This is for you — not for anyone else. If you could shape your future intentionally, what would it look like? The more value you put into your answers, the more valuable your final plan will be. We will send you a PDF of your final plan on completion.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {section.questions.map(q => (
                    <div key={q.id} className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold opacity-40">{q.label}</label>
                      <input 
                        type={q.type}
                        className="w-full bg-white/50 border border-black/5 rounded-md px-4 py-3 focus:border-vision-gold outline-none transition-all placeholder:opacity-30"
                        placeholder={q.placeholder}
                        value={answers[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                <h3 className="text-xl md:text-2xl font-serif text-[#c5a059] italic border-b border-black/5 pb-4">
                  {section.title}
                </h3>

                {section.id === 'chapter4_priority' ? (
                  <div className="space-y-6">
                    <div className="bg-black/5 p-4 rounded-md border-l-2 border-vision-gold mb-8">
                      <p className="text-sm opacity-60 leading-relaxed">
                        {section.questions[0].description}
                      </p>
                    </div>
                    {goalOrder.map((goalNum, index) => (
                      <motion.div 
                        layout
                        key={goalNum}
                        className="bg-white/50 p-6 rounded-lg border border-black/5 flex items-center gap-6 group hover:border-vision-gold transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-vision-navy text-white flex items-center justify-center font-serif text-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">{answers[`goal${goalNum}_title`] || `Goal ${goalNum}`}</div>
                          <div className="text-sm opacity-50 italic">{answers[`goal${goalNum}_desc`] || 'No description provided'}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => moveGoal(index, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:text-vision-gold disabled:opacity-10 transition-all"
                          >
                            <ChevronLeft size={20} className="rotate-90" />
                          </button>
                          <button 
                            onClick={() => moveGoal(index, 'down')}
                            disabled={index === 5}
                            className="p-1 hover:text-vision-gold disabled:opacity-10 transition-all"
                          >
                            <ChevronLeft size={20} className="-rotate-90" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : section.isFinal ? (
                  <div className="space-y-8">
                    <div className="bg-white/60 p-10 rounded-xl border border-[#c5a059]/30 shadow-2xl shadow-[#c5a059]/5 backdrop-blur-md">
                      <div className="flex items-center gap-4 mb-6 text-[#c5a059]">
                        <Sparkles size={32} />
                        <h2 className="text-3xl font-serif">Plan Complete</h2>
                      </div>
                      
                      <div className="space-y-6 text-[#1a2b4b]/90 leading-relaxed font-light">
                        <p className="text-xl italic font-normal">
                          Congratulations for completing the full task!
                        </p>
                        <p>
                          The mere act of capturing this important information about your future already puts you at a significant advantage to achieve these things.
                        </p>
                        
                        <div className="bg-[#c5a059]/5 p-8 rounded-lg border-l-4 border-[#c5a059] space-y-4">
                          <p>
                            People often worry themselves unproductively by constantly revisiting their goals, instead of concentrating on their attainment. It is easy to undermine yourself by always questioning your aims and intentions.
                          </p>
                          <p className="font-medium text-[#c5a059]">
                            "Am I doing the right thing? Have I chosen the correct goals?"
                          </p>
                          <p>
                            This leads to chronic worry, unproductive behavior, and lack of opportunity to learn. Now that you have set goals, it is best to concentrate on a daily or weekly basis on implementing the strategies you have devised.
                          </p>
                          <p className="italic underline underline-offset-4 decoration-[#c5a059]/30">
                            It is just as important to stick to a plan as it is to make a plan.
                          </p>
                        </div>

                        <p>
                          If you implement your goals, even if they are not perfect, you will learn enough during the implementation phase to make better goals next time. As you continue to repeat the process, you will get wiser and wiser.
                        </p>

                        <div className="bg-vision-navy/5 p-6 rounded-lg border border-vision-navy/10 text-vision-navy/70">
                          <p className="flex items-center gap-2 font-bold mb-2">
                            <Compass size={18} />
                            Weekly Review Tip
                          </p>
                          <p>
                            Set aside some time every week or two — no more than ten or twenty minutes — to mentally review your performance. You will gather all sorts of useful information that you can use to reconsider your plans, down the road.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {section.questions.map((q) => (
                      <div key={q.id} className="space-y-4">
                        <label className="block text-xl font-light leading-relaxed">
                          {q.label}
                        </label>
                        {q.description && (
                          <p className="text-sm opacity-60 leading-relaxed max-w-lg bg-black/5 p-4 rounded-md border-l-2 border-vision-gold">
                            {q.description}
                          </p>
                        )}
                        
                        {q.type === 'textarea' ? (
                          <textarea 
                            className="w-full bg-transparent border-b border-black/10 focus:border-vision-gold transition-colors outline-none py-4 text-lg font-light resize-none min-h-[140px] placeholder:opacity-20"
                            placeholder="Your answer here..."
                            value={answers[q.id] || ''}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                          />
                        ) : (
                          <input 
                            type="text"
                            className="w-full bg-transparent border-b border-black/10 focus:border-vision-gold transition-colors outline-none py-4 text-lg font-light placeholder:opacity-20"
                            placeholder="Your answer here..."
                            value={answers[q.id] || ''}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <footer className="w-full max-w-2xl mt-16 flex justify-between items-center">
        <button 
          onClick={prev}
          disabled={currentSection === 0}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 disabled:opacity-0 transition-opacity"
        >
          <ChevronLeft size={14} /> Back
        </button>

        <button 
          onClick={() => {
            if (currentSection === ALL_SECTIONS.length - 1) {
              setShowSummary(true);
            } else {
              next();
            }
          }}
          className="bg-vision-navy text-white px-10 py-4 rounded-full flex items-center gap-3 hover:bg-vision-gold transition-all group overflow-hidden relative shadow-xl shadow-vision-navy/20"
        >
          <span className="relative z-10 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">
            {currentSection === 0 ? "Let's Begin" : 
             (currentSection < ALL_SECTIONS.length - 1 && section.chapter !== ALL_SECTIONS[currentSection + 1]?.chapter) ? `Finish ${section.chapter}` : 
             (currentSection === ALL_SECTIONS.length - 1 ? 'Create my Future Authoring Plan' : 'Next Step')}
          </span>
          <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}

// --- Summary View Component ---
const SummaryView = ({ answers, goalOrder, onBack }: { answers: Record<string, string>, goalOrder: number[], onBack: () => void }) => {
  const print = () => window.print();

  return (
    <div className="min-h-screen bg-white text-[#1a2b4b] p-8 md:p-16 max-w-4xl mx-auto font-sans">
      <div className="flex justify-between items-start mb-16 print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-opacity">
          <ChevronLeft size={16} /> Back to Edit
        </button>
        <button onClick={print} className="bg-vision-gold text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-vision-navy transition-all shadow-lg">
          <Sparkles size={16} /> Save as PDF / Print
        </button>
      </div>

      <header className="text-center mb-20 border-b-2 border-vision-gold/20 pb-12">
        <img src="/academy_logo.jpg" alt="Logo" className="h-24 mx-auto mb-8" />
        <h1 className="text-5xl font-serif mb-4">Personal Vision Plan</h1>
        <p className="text-xl uppercase tracking-[0.3em] text-vision-gold font-bold">
          {answers.first_name || 'Student'} {answers.last_name || 'Name'}
        </p>
      </header>

      <div className="space-y-16">
        {/* Section 1: The Mirror & Horizon */}
        <section>
          <h2 className="text-2xl font-serif text-vision-gold border-b border-black/5 pb-2 mb-8 uppercase tracking-widest">Part 1: Self-Reflection</h2>
          <div className="space-y-10">
            <SummaryItem label="Primary Improvement Area" value={answers.improve_one} />
            <SummaryItem label="Development Horizon (6m, 2y, 5y)" value={answers.learn_desc} />
            <SummaryItem label="Habit Transformation" value={answers.habits_to_change} />
            <SummaryItem label="Social Environment Vision" value={answers.social_life} />
            <SummaryItem label="Leisure & Creativity" value={answers.leisure_time} />
            <SummaryItem label="Family & Core Relationships" value={answers.family_life} />
            <SummaryItem label="Career & Professional Path" value={answers.career_desc} />
            <SummaryItem label="Admired Qualities & Mentors" value={answers.mentors_admire} />
          </div>
        </section>

        {/* Section 2: Future Vision */}
        <section className="page-break-before">
          <h2 className="text-2xl font-serif text-vision-gold border-b border-black/5 pb-2 mb-8 uppercase tracking-widest">Part 2: Future Vision</h2>
          <div className="bg-vision-gold/5 p-8 rounded-xl mb-12 border border-vision-gold/10">
            <h3 className="text-xl font-bold mb-4">Big Picture Vision: {answers.big_goal_title}</h3>
            <p className="leading-relaxed opacity-80 italic">"{answers.big_goal_desc}"</p>
          </div>

          <div className="space-y-12">
            {goalOrder.map((num, i) => {
              const title = answers[`goal${num}_title`] || `Goal ${num}`;
              const desc = answers[`goal${num}_desc`];
              return (
                <div key={num} className="border-l-4 border-vision-gold pl-8 py-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-serif opacity-20">0{i+1}</span>
                    <h3 className="text-2xl font-serif">{title}</h3>
                  </div>
                  <p className="mb-8 font-medium italic opacity-70">"{desc}"</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div>
                      <h4 className="font-bold text-vision-gold uppercase text-[10px] tracking-widest mb-2">Why this matters:</h4>
                      <p className="opacity-80">{answers[`goal${num}_why`]}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-vision-gold uppercase text-[10px] tracking-widest mb-2">Strategic Steps:</h4>
                      <p className="opacity-80 whitespace-pre-wrap">{answers[`goal${num}_steps`]}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-vision-gold uppercase text-[10px] tracking-widest mb-2">Obstacles & Solutions:</h4>
                      <p className="opacity-80 whitespace-pre-wrap">{answers[`goal${num}_obstacles`]}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-vision-gold uppercase text-[10px] tracking-widest mb-2">Tracking Progress:</h4>
                      <p className="opacity-80">{answers[`goal${num}_tracking`]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="mt-24 pt-12 border-t border-black/5 text-center opacity-40 text-[10px] uppercase tracking-[0.4em]">
        Vineyard Youth Academy • {new Date().getFullYear()} • Future Authoring Plan
      </footer>
    </div>
  );
};

const SummaryItem = ({ label, value }: { label: string, value: string }) => (
  <div className="space-y-2">
    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">{label}</h3>
    <p className="text-lg leading-relaxed font-light whitespace-pre-wrap">{value || 'Not provided.'}</p>
  </div>
);

export default App;
