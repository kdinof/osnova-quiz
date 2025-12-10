export interface Answer {
  id: string;
  emoji: string;
  text: string;
  scores: {
    visual: number;
    builder: number;
    productivity: number;
  };
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface MotivationalScreen {
  title: string;
  text: string;
  quote?: string;
  quoteAuthor?: string;
  subtext?: string;
  cta: string;
}

export interface TrackResult {
  id: 'visual' | 'builder' | 'productivity';
  emoji: string;
  headline: string;
  description: string;
  modules: string[];
  artifact: string;
  color: string;
  urlSlug: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Какой результат для вас важнее всего?",
    answers: [
      { id: "1a", emoji: "🎨", text: "Создавать картинки и видео для соцсетей/рекламы", scores: { visual: 3, builder: 0, productivity: 0 } },
      { id: "1b", emoji: "🌐", text: "Собрать свой сайт или лендинг", scores: { visual: 0, builder: 3, productivity: 0 } },
      { id: "1c", emoji: "⚡", text: "Ускорить рутинные рабочие задачи с помощью AI", scores: { visual: 0, builder: 0, productivity: 3 } },
      { id: "1d", emoji: "🤷", text: "Пока не знаю, хочу попробовать разное", scores: { visual: 1, builder: 1, productivity: 2 } },
    ],
  },
  {
    id: 2,
    text: "Где планируете применять AI-навыки?",
    answers: [
      { id: "2a", emoji: "💰", text: "Фриланс — зарабатывать на заказах", scores: { visual: 3, builder: 3, productivity: 0 } },
      { id: "2b", emoji: "💼", text: "Текущая работа — делать её быстрее", scores: { visual: 0, builder: 1, productivity: 3 } },
      { id: "2c", emoji: "🚀", text: "Свой проект или бизнес", scores: { visual: 2, builder: 3, productivity: 1 } },
      { id: "2d", emoji: "🎯", text: "Хочу сменить профессию", scores: { visual: 2, builder: 2, productivity: 0 } },
    ],
  },
  {
    id: 3,
    text: "Какая деятельность тебе ближе?",
    answers: [
      { id: "3a", emoji: "🎬", text: "Работать с визуалом — картинки, видео, дизайн", scores: { visual: 3, builder: 1, productivity: 0 } },
      { id: "3b", emoji: "🔧", text: "Собирать сайты или приложения из готовых блоков", scores: { visual: 0, builder: 3, productivity: 1 } },
      { id: "3c", emoji: "✍️", text: "Работать с текстом и информацией", scores: { visual: 1, builder: 1, productivity: 3 } },
      { id: "3d", emoji: "📋", text: "Организовывать, систематизировать, оптимизировать", scores: { visual: 0, builder: 2, productivity: 3 } },
    ],
  },
  {
    id: 4,
    text: "Сколько времени готов уделять обучению в неделю?",
    answers: [
      { id: "4a", emoji: "⏰", text: "1-3 часа", scores: { visual: 0, builder: 0, productivity: 3 } },
      { id: "4b", emoji: "📅", text: "4-7 часов", scores: { visual: 2, builder: 3, productivity: 2 } },
      { id: "4c", emoji: "🔥", text: "8+ часов", scores: { visual: 3, builder: 3, productivity: 1 } },
    ],
  },
  {
    id: 5,
    text: "Какой у тебя опыт с AI-инструментами?",
    answers: [
      { id: "5a", emoji: "🆕", text: "Ещё не пробовал", scores: { visual: 1, builder: 1, productivity: 2 } },
      { id: "5b", emoji: "💬", text: "Использую ChatGPT для текстов", scores: { visual: 1, builder: 2, productivity: 2 } },
      { id: "5c", emoji: "🖼️", text: "Генерировал картинки (Midjourney, DALL-E и т.д.)", scores: { visual: 3, builder: 1, productivity: 0 } },
      { id: "5d", emoji: "🛠️", text: "Активно использую AI в работе", scores: { visual: 2, builder: 2, productivity: 1 } },
    ],
  },
];

export const motivationalScreens: Record<number, MotivationalScreen> = {
  2: {
    title: "Ты на правильном пути",
    text: "2,847 человек в Узбекистане уже изучают AI-навыки с OSNOVA",
    quote: "Через месяц я смог получить свой первый заказ на создание персонажа с использованием AI",
    quoteAuthor: "Акбар, Ташкент",
    subtext: "Осталось 3 вопроса, чтобы сформировать персональный путь обучения",
    cta: "Продолжить",
  },
  4: {
    title: "Не переживай насчёт выбора",
    text: "Все направления доступны сразу — мы просто покажем, с чего начать. А темп обучения подстроится под тебя.",
    cta: "Звучит отлично",
  },
};

export const postQuizQuestion = {
  text: "Что раньше мешало начать изучать AI?",
  answers: [
    { id: "post1", emoji: "🤔", text: "Не знал, с чего начать" },
    { id: "post2", emoji: "😰", text: "Казалось сложным" },
    { id: "post3", emoji: "⏳", text: "Не было времени" },
    { id: "post4", emoji: "💸", text: "Дорого" },
    { id: "post5", emoji: "✅", text: "Ничего не мешало" },
  ],
};

export const trackResults: TrackResult[] = [
  {
    id: "visual",
    emoji: "🎬",
    headline: "Твой путь — AI Visual Creator",
    description: "Создавай профессиональный визуальный контент. Научись генерировать изображения и видео, которые можно продавать на фрилансе или использовать в проектах.",
    modules: ["Midjourney", "AI Video (Kling/Runway)", "Canva"],
    artifact: "Портфолио из 5+ AI-визуалов + короткий видеоролик",
    color: "track-visual",
    urlSlug: "visual_creator",
  },
  {
    id: "builder",
    emoji: "🏗️",
    headline: "Твой путь — AI Digital Builder",
    description: "Собери свой первый сайт за 3 недели без кода. Научишься создавать лендинги для себя или клиентов.",
    modules: ["GPT (тексты)", "Figma (прототипы)", "Tilda (сборка)"],
    artifact: "Готовый лендинг или сайт-портфолио на своём домене",
    color: "track-builder",
    urlSlug: "digital_builder",
  },
  {
    id: "productivity",
    emoji: "🧠",
    headline: "Твой путь — AI Productivity Master",
    description: "Экономь 5+ часов в неделю на рутинных задачах. Научишься писать промпты, которые решают твои рабочие задачи быстрее, чем ты сам.",
    modules: ["Введение в AI", "Промптинг", "GPT (автоматизация)"],
    artifact: "Библиотека из 10+ мастер-промптов для рабочих задач",
    color: "track-productivity",
    urlSlug: "productivity_master",
  },
];
