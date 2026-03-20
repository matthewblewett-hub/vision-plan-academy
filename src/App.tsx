import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Target, Sparkles, Compass, Mail, User } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import { translations, Language } from './translations';

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

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [goalOrder, setGoalOrder] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  const t = translations[language];

  const SECTIONS: Section[] = useMemo(() => [
    {
      id: 'welcome',
      title: t.welcome.title,
      isIntro: true,
      questions: [
        { id: 'first_name', type: 'text', label: t.welcome.firstNameLabel, placeholder: t.welcome.firstNamePlaceholder },
        { id: 'last_name', type: 'text', label: t.welcome.lastNameLabel, placeholder: t.welcome.lastNamePlaceholder },
        { id: 'email', type: 'email', label: t.welcome.emailLabel, placeholder: t.welcome.emailPlaceholder }
      ]
    },
    {
      id: 'chapter1_1',
      chapter: t.chapters.chapter1.name,
      title: t.chapters.chapter1.s1_1.title,
      questions: [
        {
          id: 'improve_one',
          type: 'textarea',
          label: t.chapters.chapter1.s1_1.question,
          description: t.chapters.chapter1.s1_1.desc,
          placeholder: t.chapters.chapter1.s1_1.placeholder
        }
      ]
    },
    {
      id: 'chapter1_2',
      chapter: t.chapters.chapter1.name,
      title: t.chapters.chapter1.s1_2.title,
      questions: [
        {
          id: 'learn_desc',
          type: 'textarea',
          label: t.chapters.chapter1.s1_2.question,
          description: t.chapters.chapter1.s1_2.desc,
          placeholder: t.chapters.chapter1.s1_2.placeholder
        }
      ]
    },
    {
      id: 'chapter1_3',
      chapter: t.chapters.chapter1.name,
      title: t.chapters.chapter1.s1_3.title,
      questions: [
        {
          id: 'habits_to_change',
          type: 'textarea',
          label: t.chapters.chapter1.s1_3.question,
          description: t.chapters.chapter1.s1_3.desc,
          placeholder: t.chapters.chapter1.s1_3.placeholder
        }
      ]
    },
    {
      id: 'chapter2_4',
      chapter: t.chapters.chapter2.name,
      title: t.chapters.chapter2.s2_4.title,
      questions: [
        {
          id: 'social_life',
          type: 'textarea',
          label: t.chapters.chapter2.s2_4.question,
          description: t.chapters.chapter2.s2_4.desc,
          placeholder: t.chapters.chapter2.s2_4.placeholder
        }
      ]
    },
    {
      id: 'chapter2_5',
      chapter: t.chapters.chapter2.name,
      title: t.chapters.chapter2.s2_5.title,
      questions: [
        {
          id: 'leisure_time',
          type: 'textarea',
          label: t.chapters.chapter2.s2_5.question,
          description: t.chapters.chapter2.s2_5.desc,
          placeholder: t.chapters.chapter2.s2_5.placeholder
        }
      ]
    },
    {
      id: 'chapter2_6',
      chapter: t.chapters.chapter2.name,
      title: t.chapters.chapter2.s2_6.title,
      questions: [
        {
          id: 'family_life',
          type: 'textarea',
          label: t.chapters.chapter2.s2_6.question,
          description: t.chapters.chapter2.s2_6.desc,
          placeholder: t.chapters.chapter2.s2_6.placeholder
        }
      ]
    },
    {
      id: 'chapter2_7',
      chapter: t.chapters.chapter2.name,
      title: t.chapters.chapter2.s2_7.title,
      questions: [
        {
          id: 'career_desc',
          type: 'textarea',
          label: t.chapters.chapter2.s2_7.question,
          description: t.chapters.chapter2.s2_7.desc,
          placeholder: t.chapters.chapter2.s2_7.placeholder
        }
      ]
    },
    {
      id: 'chapter3_8',
      chapter: t.chapters.chapter3.name,
      title: t.chapters.chapter3.s3_8.title,
      questions: [
        {
          id: 'mentors_admire',
          type: 'textarea',
          label: t.chapters.chapter3.s3_8.question,
          description: t.chapters.chapter3.s3_8.desc,
          placeholder: t.chapters.chapter3.s3_8.placeholder
        }
      ]
    },
    {
      id: 'chapter4_9',
      chapter: t.chapters.chapter4.name,
      title: t.chapters.chapter4.s4_9.title,
      questions: [
        {
          id: 'big_goal_title',
          type: 'text',
          label: t.chapters.chapter4.s4_9.goalTitle,
          description: t.chapters.chapter4.s4_9.goalTitleDesc,
          placeholder: t.chapters.chapter4.s4_9.placeholderTitle
        },
        {
          id: 'big_goal_desc',
          type: 'textarea',
          label: t.chapters.chapter4.s4_9.goalDesc,
          description: t.chapters.chapter4.s4_9.goalDescDesc,
          placeholder: t.chapters.chapter4.s4_9.placeholderDesc
        }
      ]
    },
    {
      id: 'chapter4_10',
      chapter: t.chapters.chapter4.name,
      title: t.chapters.chapter4.s4_10.title,
      questions: [
        { 
          id: 'goal_instructions_header', 
          type: 'textarea', 
          label: t.chapters.chapter4.s4_10.question,
          description: t.chapters.chapter4.s4_10.desc,
          placeholder: t.chapters.chapter4.s4_10.placeholder
        },
        { id: 'goal1_title', type: 'text', label: t.chapters.chapter4.s4_10.goalTitleLabel.replace('{n}', '1'), placeholder: t.chapters.chapter4.s4_10.goalTitlePlaceholder },
        { id: 'goal1_desc', type: 'text', label: t.chapters.chapter4.s4_10.goalDescLabel.replace('{n}', '1'), placeholder: t.chapters.chapter4.s4_10.goalDescPlaceholder },
        { id: 'goal2_title', type: 'text', label: t.chapters.chapter4.s4_10.goalTitleLabel.replace('{n}', '2'), placeholder: t.chapters.chapter4.s4_10.goalTitlePlaceholder },
        { id: 'goal2_desc', type: 'text', label: t.chapters.chapter4.s4_10.goalDescLabel.replace('{n}', '2'), placeholder: t.chapters.chapter4.s4_10.goalDescPlaceholder },
        { id: 'goal3_title', type: 'text', label: t.chapters.chapter4.s4_10.goalTitleLabel.replace('{n}', '3'), placeholder: t.chapters.chapter4.s4_10.goalTitlePlaceholder },
        { id: 'goal3_desc', type: 'text', label: t.chapters.chapter4.s4_10.goalDescLabel.replace('{n}', '3'), placeholder: t.chapters.chapter4.s4_10.goalDescPlaceholder },
        { id: 'goal4_title', type: 'text', label: t.chapters.chapter4.s4_10.goalTitleLabel.replace('{n}', '4'), placeholder: t.chapters.chapter4.s4_10.goalTitlePlaceholder },
        { id: 'goal4_desc', type: 'text', label: t.chapters.chapter4.s4_10.goalDescLabel.replace('{n}', '4'), placeholder: t.chapters.chapter4.s4_10.goalDescPlaceholder },
        { id: 'goal5_title', type: 'text', label: t.chapters.chapter4.s4_10.goalTitleLabel.replace('{n}', '5'), placeholder: t.chapters.chapter4.s4_10.goalTitlePlaceholder },
        { id: 'goal5_desc', type: 'text', label: t.chapters.chapter4.s4_10.goalDescLabel.replace('{n}', '5'), placeholder: t.chapters.chapter4.s4_10.goalDescPlaceholder },
        { id: 'goal6_title', type: 'text', label: t.chapters.chapter4.s4_10.goalTitleLabel.replace('{n}', '6'), placeholder: t.chapters.chapter4.s4_10.goalTitlePlaceholder },
        { id: 'goal6_desc', type: 'text', label: t.chapters.chapter4.s4_10.goalDescLabel.replace('{n}', '6'), placeholder: t.chapters.chapter4.s4_10.goalDescPlaceholder }
      ]
    },
    {
      id: 'chapter4_priority',
      chapter: t.chapters.chapter4.name,
      title: t.chapters.chapter4.s4_priority.title,
      questions: [
        {
          id: 'goal_priority_order',
          type: 'text',
          label: t.chapters.chapter4.s4_priority.question,
          description: t.chapters.chapter4.s4_priority.desc,
          placeholder: t.chapters.chapter4.s4_priority.placeholder
        }
      ]
    }
  ], [t]);

  const FINAL_SECTION: Section = useMemo(() => ({
    id: 'final_future_steps',
    chapter: t.final.chapter,
    title: t.final.title,
    isFinal: true,
    questions: [
      {
        id: 'final_message',
        type: 'textarea',
        label: t.final.message,
        description: t.final.desc,
        placeholder: ""
      }
    ]
  }), [t]);

  // Dynamic Deep-Dive Sections for each goal
  const deepDiveSections: Section[] = goalOrder.map((goalNum, index) => {
    const goalTitle = answers[`goal${goalNum}_title`] || `Goal ${goalNum}`;
    return {
      id: `chapter4_goal_${goalNum}`,
      chapter: t.chapters.chapter4.name,
      title: `Goal ${index + 1} of 6: ${goalTitle}`,
      questions: [
        {
          id: `goal${goalNum}_why`,
          type: 'textarea',
          label: t.chapters.chapter4.deepDive.whyLabel.replace('{goalTitle}', goalTitle),
          description: t.chapters.chapter4.deepDive.whyDesc,
          placeholder: t.chapters.chapter4.deepDive.whyPlaceholder
        },
        {
          id: `goal${goalNum}_steps`,
          type: 'textarea',
          label: t.chapters.chapter4.deepDive.stepsLabel,
          description: t.chapters.chapter4.deepDive.stepsDesc,
          placeholder: t.chapters.chapter4.deepDive.stepsPlaceholder
        },
        {
          id: `goal${goalNum}_obstacles`,
          type: 'textarea',
          label: t.chapters.chapter4.deepDive.obstaclesLabel,
          description: t.chapters.chapter4.deepDive.obstaclesDesc,
          placeholder: t.chapters.chapter4.deepDive.obstaclesPlaceholder
        },
        {
          id: `goal${goalNum}_tracking`,
          type: 'textarea',
          label: t.chapters.chapter4.deepDive.trackingLabel,
          description: t.chapters.chapter4.deepDive.trackingDesc,
          placeholder: t.chapters.chapter4.deepDive.trackingPlaceholder
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
    return <SummaryView answers={answers} goalOrder={goalOrder} language={language} onBack={() => setShowSummary(false)} />;
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
          <div className="space-y-4">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-vision-gold">
                <span className="uppercase tracking-[0.3em] text-[10px] font-bold">{language === 'en' ? 'Your Future Plan' : 'Jou Toekomsplan'}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif">
                {section.chapter || (language === 'en' ? 'Introduction' : 'Inleiding')}
              </h1>
            </div>
          </div>
          {currentSection > 0 && (
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{language === 'en' ? 'Progress' : 'Vordering'}</span>
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
                    "{t.welcome.description1}"
                  </p>
                  <p className="mt-4 text-base font-light opacity-70 leading-relaxed">
                    {t.welcome.description2}
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
                          <div className="font-bold text-lg">{answers[`goal${goalNum}_title`] || (language === 'en' ? `Goal ${goalNum}` : `Doelwit ${goalNum}`)}</div>
                          <div className="text-sm opacity-50 italic">{answers[`goal${goalNum}_desc`] || (language === 'en' ? 'No description provided' : 'Geen beskrywing verskaf nie')}</div>
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
                        <h2 className="text-3xl font-serif">{t.final.title}</h2>
                      </div>
                      
                      <div className="space-y-6 text-[#1a2b4b]/90 leading-relaxed font-light">
                        <p className="text-xl italic font-normal">
                          {t.final.mainText.congrats}
                        </p>
                        <p>
                          {t.final.mainText.advantage}
                        </p>
                        
                        <div className="bg-[#c5a059]/5 p-8 rounded-lg border-l-4 border-[#c5a059] space-y-4">
                          <p>
                            {t.final.mainText.worrySection.text1}
                          </p>
                          <p className="font-medium text-[#c5a059]">
                            {t.final.mainText.worrySection.quote}
                          </p>
                          <p>
                            {t.final.mainText.worrySection.text2}
                          </p>
                          <p className="italic underline underline-offset-4 decoration-[#c5a059]/30">
                            {t.final.mainText.worrySection.importance}
                          </p>
                        </div>
 
                        <p>
                          {t.final.mainText.learning}
                        </p>
 
                        <div className="bg-vision-navy/5 p-6 rounded-lg border border-vision-navy/10 text-vision-navy/70">
                          <p className="flex items-center gap-2 font-bold mb-2">
                            <Compass size={18} />
                            {t.final.mainText.reviewTip.title}
                          </p>
                          <p>
                            {t.final.mainText.reviewTip.text}
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
                            placeholder={language === 'en' ? "Your answer here..." : "Jou antwoord hier..."}
                            value={answers[q.id] || ''}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                          />
                        ) : (
                          <input 
                            type="text"
                            className="w-full bg-transparent border-b border-black/10 focus:border-vision-gold transition-colors outline-none py-4 text-lg font-light placeholder:opacity-20"
                            placeholder={language === 'en' ? "Your answer here..." : "Jou antwoord hier..."}
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
            {currentSection === 0 ? t.welcome.beginButton : 
             (currentSection < ALL_SECTIONS.length - 1 && section.chapter !== ALL_SECTIONS[currentSection + 1]?.chapter) ? t.navigation.finish.replace('{chapter}', section.chapter || '') : 
             (currentSection === ALL_SECTIONS.length - 1 ? t.final.buttons.create : t.navigation.next)}
          </span>
          <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}

// --- Summary View Component ---
const SummaryView = ({ answers, goalOrder, language, onBack }: { answers: Record<string, string>, goalOrder: number[], language: Language, onBack: () => void }) => {
  const print = () => window.print();
  const t = translations[language].final.summary;
  const b = translations[language].final.buttons;

  return (
    <div className="min-h-screen bg-white text-[#1a2b4b] p-8 md:p-16 max-w-4xl mx-auto font-sans">
      <div className="flex justify-between items-start mb-16 print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-opacity">
          <ChevronLeft size={16} /> {b.edit}
        </button>
        <button onClick={print} className="bg-vision-gold text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-vision-navy transition-all shadow-lg">
          <Sparkles size={16} /> {b.save}
        </button>
      </div>

      <header className="text-center mb-20 border-b-2 border-vision-gold/20 pb-12">
        <img src="/academy_logo.jpg" alt="Logo" className="h-24 mx-auto mb-8" />
        <h1 className="text-5xl font-serif mb-4">{t.title}</h1>
        <p className="text-xl uppercase tracking-[0.3em] text-vision-gold font-bold">
          {answers.first_name || t.subtitle} {answers.last_name || ''}
        </p>
      </header>

      <div className="space-y-16">
        {/* Section 1: The Mirror & Horizon */}
        <section>
          <h2 className="text-2xl font-serif text-vision-gold border-b border-black/5 pb-2 mb-8 uppercase tracking-widest">{t.part1}</h2>
          <div className="space-y-10">
            <SummaryItem label={t.labels.improvement} value={answers.improve_one} language={language} />
            <SummaryItem label={t.labels.horizon} value={answers.learn_desc} language={language} />
            <SummaryItem label={t.labels.habit} value={answers.habits_to_change} language={language} />
            <SummaryItem label={t.labels.social} value={answers.social_life} language={language} />
            <SummaryItem label={t.labels.leisure} value={answers.leisure_time} language={language} />
            <SummaryItem label={t.labels.family} value={answers.family_life} language={language} />
            <SummaryItem label={t.labels.career} value={answers.career_desc} language={language} />
            <SummaryItem label={t.labels.admired} value={answers.mentors_admire} language={language} />
          </div>
        </section>

        {/* Section 2: Future Vision */}
        <section className="page-break-before">
          <h2 className="text-2xl font-serif text-vision-gold border-b border-black/5 pb-2 mb-8 uppercase tracking-widest">{t.part2}</h2>
          <div className="bg-vision-gold/5 p-8 rounded-xl mb-12 border border-vision-gold/10">
            <h3 className="text-xl font-bold mb-4">{t.labels.bigPicture} {answers.big_goal_title}</h3>
            <p className="leading-relaxed opacity-80 italic">"{answers.big_goal_desc}"</p>
          </div>

          <div className="space-y-12">
            {goalOrder.map((num, i) => {
              const title = answers[`goal${num}_title`] || (language === 'en' ? `Goal ${num}` : `Doelwit ${num}`);
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
                      <h4 className="font-bold text-vision-gold uppercase text-[10px] tracking-widest mb-2">{t.labels.why}</h4>
                      <p className="opacity-80">{answers[`goal${num}_why`]}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-vision-gold uppercase text-[10px] tracking-widest mb-2">{t.labels.steps}</h4>
                      <p className="opacity-80 whitespace-pre-wrap">{answers[`goal${num}_steps`]}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-vision-gold uppercase text-[10px] tracking-widest mb-2">{t.labels.obstacles}</h4>
                      <p className="opacity-80 whitespace-pre-wrap">{answers[`goal${num}_obstacles`]}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-vision-gold uppercase text-[10px] tracking-widest mb-2">{t.labels.tracking}</h4>
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
        {t.footer.replace('{year}', new Date().getFullYear().toString())}
      </footer>
    </div>
  );
};

const SummaryItem = ({ label, value, language }: { label: string, value: string, language: Language }) => (
  <div className="space-y-2">
    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">{label}</h3>
    <p className="text-lg leading-relaxed font-light whitespace-pre-wrap">{value || translations[language].final.summary.notProvided}</p>
  </div>
);

export default App;
