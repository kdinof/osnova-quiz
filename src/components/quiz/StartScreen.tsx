interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background max-w-[760px] mx-auto">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">O</span>
          </div>
          <span className="font-semibold text-foreground">OSNOVA</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-small font-medium mb-6 animate-fade-up">
            <span>🎯</span>
            <span>2 минуты</span>
          </div>

          {/* Title */}
          <h1 className="text-hero text-foreground mb-4 animate-fade-up stagger-1">
            Найди свой
            <br />
            <span className="text-gradient">AI-путь</span>
          </h1>

          {/* Description */}
          <p className="text-body text-muted-foreground mb-8 animate-fade-up stagger-2">
            Ответь на 5 вопросов и узнай, какое направление обучения 
            подходит именно тебе — с персональной программой и конкретным результатом.
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {[
              { emoji: "🎬", text: "AI Visual Creator — визуальный контент" },
              { emoji: "🏗️", text: "AI Digital Builder — сайты и лендинги" },
              { emoji: "🧠", text: "AI Productivity Master — автоматизация" },
            ].map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 opacity-0 animate-fade-up stagger-${index + 3}`}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-small text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-8 pt-4">
        <button
          onClick={onStart}
          className="btn-primary w-full text-lg animate-fade-up"
        >
          Начать тест
        </button>
        <p className="text-center text-small text-muted-foreground mt-4">
          Бесплатно • Без регистрации
        </p>
      </div>
    </div>
  );
}
