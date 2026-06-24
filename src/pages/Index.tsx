import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const COVERS = {
  wedding: 'https://cdn.poehali.dev/projects/2b7f07b4-7bb6-4e16-8d57-607fcbde6b57/files/34c69b4f-636d-469f-baac-efaaa310a708.jpg',
  nauryz: 'https://cdn.poehali.dev/projects/2b7f07b4-7bb6-4e16-8d57-607fcbde6b57/files/7c831d71-ab1d-43be-b26f-b3320662bdde.jpg',
  jubilee: 'https://cdn.poehali.dev/projects/2b7f07b4-7bb6-4e16-8d57-607fcbde6b57/files/b6d511cf-a5fa-499c-aca4-61e616490013.jpg',
};

type Lang = 'ru' | 'kz';

const T = {
  ru: {
    nav: ['Мероприятия', 'Шаблоны', 'Возможности', 'Контакты'],
    badge: 'Цифровые пригласительные нового поколения',
    title1: 'Создавайте приглашения,',
    title2: 'которыми хочется делиться',
    sub: 'Премиальные онлайн-пригласительные на тои, свадьбы, юбилеи и любые события. Ссылка, QR-код, музыка и AI-дизайнер — всё в одном месте.',
    cta1: 'Создать приглашение',
    cta2: 'Смотреть примеры',
    eventsTitle: 'Для любого события',
    eventsSub: 'У каждого типа мероприятия — свой уникальный стиль, шрифты и анимации',
    featTitle: 'Всё для идеального приглашения',
    demoTitle: 'Готовые премиум-шаблоны',
    demoSub: 'Более 100 дизайнов: Luxury Gold, Kazakh National, Minimal и другие',
    personalTitle: 'Персональная ссылка для каждого гостя',
    personalSub: 'Отправьте гостю ссылку — и его имя автоматически появится в приглашении. Внимание, которое запоминается.',
    ctaFinal: 'Готовы создать своё приглашение?',
    ctaFinalSub: 'Один владелец, безграничные возможности. Премиум-дизайн уровня 2026.',
    start: 'Начать бесплатно',
  },
  kz: {
    nav: ['Іс-шаралар', 'Үлгілер', 'Мүмкіндіктер', 'Байланыс'],
    badge: 'Жаңа буын цифрлық шақыру',
    title1: 'Бөліскің келетін',
    title2: 'шақырулар жасаңыз',
    sub: 'Той, үйлену, мерейтой және кез келген іс-шараға арналған премиум онлайн шақырулар. Сілтеме, QR-код, музыка және AI-дизайнер — бәрі бір жерде.',
    cta1: 'Шақыру жасау',
    cta2: 'Мысалдарды көру',
    eventsTitle: 'Кез келген іс-шараға',
    eventsSub: 'Әр іс-шараның өзіндік стилі, қаріптері мен анимациясы бар',
    featTitle: 'Мінсіз шақыруға арналған бәрі',
    demoTitle: 'Дайын премиум үлгілер',
    demoSub: '100-ден астам дизайн: Luxury Gold, Kazakh National, Minimal және басқалары',
    personalTitle: 'Әр қонаққа жеке сілтеме',
    personalSub: 'Қонаққа сілтеме жіберіңіз — оның есімі шақыруда автоматты түрде көрінеді.',
    ctaFinal: 'Шақыруыңызды жасауға дайынсыз ба?',
    ctaFinalSub: 'Бір иеленуші, шексіз мүмкіндіктер. 2026 деңгейіндегі премиум дизайн.',
    start: 'Тегін бастау',
  },
};

const EVENTS: { ru: string; kz: string; icon: string; tint: string }[] = [
  { ru: 'Свадьба', kz: 'Тойға шақыру', icon: 'Heart', tint: 'from-rose-200/40 to-amber-100/40' },
  { ru: 'Қыз ұзату', kz: 'Қыз ұзату', icon: 'Sparkles', tint: 'from-amber-200/40 to-orange-100/40' },
  { ru: 'Сырға салу', kz: 'Сырға салу', icon: 'Flower2', tint: 'from-pink-200/40 to-rose-100/40' },
  { ru: 'Тұсаукесер', kz: 'Тұсаукесер', icon: 'Footprints', tint: 'from-emerald-200/40 to-teal-100/40' },
  { ru: 'Бесік той', kz: 'Бесік той', icon: 'Baby', tint: 'from-sky-200/40 to-blue-100/40' },
  { ru: 'Юбилей', kz: 'Мерейтой', icon: 'Crown', tint: 'from-yellow-300/40 to-amber-200/40' },
  { ru: 'День рождения', kz: 'Туған күн', icon: 'Cake', tint: 'from-fuchsia-200/40 to-pink-100/40' },
  { ru: 'Наурыз', kz: 'Наурыз', icon: 'Sun', tint: 'from-orange-200/40 to-yellow-100/40' },
  { ru: 'Открытый урок', kz: 'Ашық сабақ', icon: 'GraduationCap', tint: 'from-indigo-200/40 to-violet-100/40' },
  { ru: 'Выпускной', kz: 'Бітіру кеші', icon: 'PartyPopper', tint: 'from-purple-200/40 to-fuchsia-100/40' },
  { ru: 'Последний звонок', kz: 'Соңғы қоңырау', icon: 'Bell', tint: 'from-cyan-200/40 to-sky-100/40' },
  { ru: 'Конференция', kz: 'Конференция', icon: 'Presentation', tint: 'from-slate-200/40 to-zinc-100/40' },
];

const FEATURES = {
  ru: [
    { icon: 'Link', t: 'Уникальная ссылка', d: 'Каждое приглашение получает короткий персональный адрес и живёт вечно' },
    { icon: 'QrCode', t: 'QR-код', d: 'Печатайте на пригласительных или делитесь в один тап' },
    { icon: 'Music', t: 'Музыка', d: 'Готовые подборки под событие или загрузка своей MP3' },
    { icon: 'Sparkles', t: 'AI-дизайнер', d: 'Подберёт шрифты, палитру, музыку и стиль под ваше событие' },
    { icon: 'CalendarClock', t: 'Таймер обратного отсчёта', d: 'Красивый счётчик до начала торжества' },
    { icon: 'Users', t: 'RSVP и список гостей', d: 'Подтверждения участия и автоматическая нумерация гостей' },
    { icon: 'Image', t: 'Фото и видео', d: 'Видеообложки, галереи и анимированные фоны' },
    { icon: 'BarChart3', t: 'Статистика', d: 'Кто открыл, когда и с какого устройства' },
  ],
  kz: [
    { icon: 'Link', t: 'Бірегей сілтеме', d: 'Әр шақыру қысқа жеке мекенжай алады және мәңгі сақталады' },
    { icon: 'QrCode', t: 'QR-код', d: 'Басып шығарыңыз немесе бір рет басып бөлісіңіз' },
    { icon: 'Music', t: 'Музыка', d: 'Іс-шараға арналған дайын жинақтар немесе өз MP3' },
    { icon: 'Sparkles', t: 'AI-дизайнер', d: 'Қаріп, түс, музыка мен стильді өзі таңдайды' },
    { icon: 'CalendarClock', t: 'Кері санақ', d: 'Той басталғанға дейінгі әдемі санауыш' },
    { icon: 'Users', t: 'RSVP және қонақтар', d: 'Қатысуды растау және қонақтарды нөмірлеу' },
    { icon: 'Image', t: 'Фото және видео', d: 'Видео мұқабалар, галереялар мен анимация' },
    { icon: 'BarChart3', t: 'Статистика', d: 'Кім, қашан және қай құрылғыдан ашты' },
  ],
};

const DEMOS = [
  { img: COVERS.wedding, tag: 'Luxury Gold', name: 'Айбек & Аружан' },
  { img: COVERS.nauryz, tag: 'Kazakh National', name: 'Наурыз 2026' },
  { img: COVERS.jubilee, tag: 'Premium Black', name: 'Мерейтой 60 жыл' },
];

const Index = () => {
  const [lang, setLang] = useState<Lang>('ru');
  const [dark, setDark] = useState(false);
  const t = T[lang];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-gold/20 blur-3xl" />
        <div className="animate-blob absolute top-1/3 -right-24 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-3xl" style={{ animationDelay: '4s' }} />
        <div className="animate-blob absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-accent/40 blur-3xl" style={{ animationDelay: '8s' }} />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50">
        <div className="container">
          <nav className="glass mt-4 flex items-center justify-between rounded-2xl px-4 py-3 shadow-sm sm:px-6">
            <a href="#" className="flex items-center gap-2">
              <div className="gold-gradient flex h-9 w-9 items-center justify-center rounded-xl shadow-md">
                <Icon name="Mail" size={18} className="text-white" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">Qonaq<span className="text-gold"> Invite</span></span>
            </a>
            <div className="hidden items-center gap-7 md:flex">
              {t.nav.map((n, i) => (
                <a key={i} href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{n}</a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="glass flex items-center rounded-full p-0.5 text-xs font-semibold">
                <button onClick={() => setLang('ru')} className={`rounded-full px-3 py-1.5 transition ${lang === 'ru' ? 'gold-gradient text-white shadow' : 'text-muted-foreground'}`}>RU</button>
                <button onClick={() => setLang('kz')} className={`rounded-full px-3 py-1.5 transition ${lang === 'kz' ? 'gold-gradient text-white shadow' : 'text-muted-foreground'}`}>KZ</button>
              </div>
              <button onClick={() => setDark(!dark)} className="glass flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-105">
                <Icon name={dark ? 'Sun' : 'Moon'} size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container relative z-10 pt-16 pb-24 text-center sm:pt-24">
        <div className="reveal glass mx-auto mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide" style={{ animationDelay: '0.05s' }}>
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
          {t.badge}
        </div>
        <h1 className="reveal font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl" style={{ animationDelay: '0.15s' }}>
          {t.title1}<br />
          <span className="gold-text italic">{t.title2}</span>
        </h1>
        <p className="reveal mx-auto mt-7 max-w-2xl text-base text-muted-foreground sm:text-lg" style={{ animationDelay: '0.3s' }}>
          {t.sub}
        </p>
        <div className="reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '0.45s' }}>
          <Button size="lg" className="gold-gradient h-13 rounded-full px-8 text-base font-semibold text-white shadow-lg shadow-gold/30 transition hover:scale-105 hover:shadow-xl">
            <Icon name="Wand2" size={18} className="mr-1" /> {t.cta1}
          </Button>
          <Button size="lg" variant="outline" className="glass h-13 rounded-full border-border/60 px-8 text-base font-semibold transition hover:scale-105">
            <Icon name="Play" size={16} className="mr-1" /> {t.cta2}
          </Button>
        </div>

        {/* Floating demo cards */}
        <div className="reveal mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3" style={{ animationDelay: '0.6s' }}>
          {DEMOS.map((d, i) => (
            <div key={i} className={`hover-lift group relative overflow-hidden rounded-3xl shadow-xl ${i === 1 ? 'sm:-translate-y-8' : ''}`}>
              <img src={d.img} alt={d.name} className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left text-white">
                <span className="glass rounded-full px-3 py-1 text-[11px] font-semibold text-white">{d.tag}</span>
                <p className="font-display mt-3 text-2xl font-semibold">{d.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="container relative z-10 py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">{t.eventsTitle}</h2>
          <p className="mt-4 text-muted-foreground">{t.eventsSub}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {EVENTS.map((e, i) => (
            <button key={i} className={`hover-lift group glass relative overflow-hidden rounded-2xl p-6 text-left`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${e.tint} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative">
                <div className="gold-gradient mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-md">
                  <Icon name={e.icon} size={22} className="text-white" />
                </div>
                <p className="font-display text-xl font-semibold leading-tight">{lang === 'ru' ? e.ru : e.kz}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground opacity-0 transition group-hover:opacity-100">
                  {lang === 'ru' ? 'Создать' : 'Жасау'} <Icon name="ArrowRight" size={12} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container relative z-10 py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">{t.featTitle}</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES[lang].map((f, i) => (
            <div key={i} className="hover-lift glass rounded-2xl p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Icon name={f.icon} size={20} />
              </div>
              <p className="font-display text-xl font-semibold">{f.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personal links */}
      <section className="container relative z-10 py-20">
        <div className="glass grid items-center gap-10 overflow-hidden rounded-[2rem] p-8 sm:p-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold">
              <Icon name="UserCheck" size={14} /> {lang === 'ru' ? 'Премиум-функция' : 'Премиум мүмкіндік'}
            </span>
            <h2 className="font-display mt-5 text-4xl font-bold leading-tight sm:text-5xl">{t.personalTitle}</h2>
            <p className="mt-5 text-muted-foreground">{t.personalSub}</p>
            <div className="mt-8 space-y-3">
              {['?guest=Aru', '?guest=Ali', '?guest=Madina'].map((g, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-3 font-mono text-sm">
                  <Icon name="Link2" size={15} className="text-gold" />
                  <span className="truncate text-muted-foreground">qonaq.kz/invite/7F4K9A<span className="text-foreground">{g}</span></span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="hover-lift overflow-hidden rounded-3xl shadow-2xl">
              <img src={COVERS.wedding} alt="invite" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-6 text-center text-white">
                <p className="font-display text-sm uppercase tracking-[0.3em] opacity-80">{lang === 'ru' ? 'Дорогой гость' : 'Құрметті қонақ'}</p>
                <p className="font-display mt-2 text-5xl font-bold">Aruzhan</p>
                <p className="mt-2 text-sm opacity-90">{lang === 'ru' ? 'приглашаем вас на той' : 'тойға шақырамыз'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container relative z-10 py-20">
        <div className="gold-gradient relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center shadow-2xl sm:py-24">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold text-white sm:text-6xl">{t.ctaFinal}</h2>
            <p className="mx-auto mt-5 max-w-xl text-white/90">{t.ctaFinalSub}</p>
            <Button size="lg" className="mt-9 h-14 rounded-full bg-white px-10 text-base font-bold text-foreground shadow-xl transition hover:scale-105">
              {t.start} <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container relative z-10 border-t border-border/60 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="gold-gradient flex h-8 w-8 items-center justify-center rounded-lg">
              <Icon name="Mail" size={15} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold">Qonaq Invite</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Qonaq Invite — {lang === 'ru' ? 'премиум-пригласительные' : 'премиум шақырулар'}</p>
          <div className="flex gap-3">
            {['Send', 'Instagram', 'Phone'].map((s, i) => (
              <a key={i} href="#" className="glass flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-110 hover:text-gold">
                <Icon name={s} size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
