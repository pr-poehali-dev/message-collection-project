import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import AuthDialog from '@/components/AuthDialog';

const blogPosts = [
  {
    id: 1,
    title: 'Творчество без границ',
    excerpt: 'Как я нашла свой уникальный стиль и почему это изменило всё',
    image: 'https://cdn.poehali.dev/projects/093f2fe6-0192-4cbf-adea-86ecfa7d6d47/files/86f78082-34e2-4a20-a6a3-808c93d213f0.jpg',
    date: '15 ноября 2024',
    category: 'Творчество',
  },
  {
    id: 2,
    title: 'Рабочее пространство мечты',
    excerpt: 'Обустройство места для работы, которое вдохновляет каждый день',
    image: 'https://cdn.poehali.dev/projects/093f2fe6-0192-4cbf-adea-86ecfa7d6d47/files/0e966c67-61c1-414c-8624-9ca960b10434.jpg',
    date: '10 ноября 2024',
    category: 'Продуктивность',
  },
  {
    id: 3,
    title: 'Источники вдохновения',
    excerpt: 'Где я черпаю идеи для своих проектов и как находить новые смыслы',
    image: 'https://cdn.poehali.dev/projects/093f2fe6-0192-4cbf-adea-86ecfa7d6d47/files/e5c7d92d-6fbe-44d6-9573-66df4aeb5b71.jpg',
    date: '5 ноября 2024',
    category: 'Вдохновение',
  },
];

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Геймплеи', 'Обзоры', 'Летсплеи', 'Гайды', 'Реакции'];

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const checkAuth = (action: () => void) => {
    if (isLoggedIn) {
      action();
    } else {
      setPendingAction(() => action);
      setIsAuthOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast.success('Вы вышли из аккаунта');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xanyqjvb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Новое сообщение от ${formData.name}`,
        }),
      });

      if (response.ok) {
        toast.success('Сообщение отправлено! Скоро свяжусь с вами 💜');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Что-то пошло не так. Попробуйте ещё раз');
      }
    } catch (error) {
      toast.error('Ошибка отправки. Проверьте подключение');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AuthDialog 
        open={isAuthOpen} 
        onOpenChange={setIsAuthOpen} 
        onSuccess={handleAuthSuccess}
      />
      
      <div className="fixed top-4 right-4 z-50">
        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        ) : (
          <Button
            onClick={() => setIsAuthOpen(true)}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            <Icon name="LogIn" size={18} className="mr-2" />
            Войти
          </Button>
        )}
      </div>
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift bg-[length:200%_200%]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center rounded-sm px-0.5 bg-transparent">
            <div className="inline-block mb-6 animate-float">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform rotate-12">
                <Icon name="Sparkles" size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-7xl font-black mb-6 text-white animate-fade-in leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-medium text-lg">
                ПЕРЕЗАЛИВЫ
              </span>
            </h1>
            <p className="text-2xl text-white/90 mb-8 animate-fade-in font-medium max-w-2xl mx-auto">
              Площадка для твоих идей и проектов
            </p>
            <div className="flex gap-4 justify-center animate-slide-up flex-wrap">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 rounded-2xl shadow-2xl transition-all hover:scale-105"
                onClick={() => checkAuth(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }))}
              >
                Связаться с нами
              </Button>
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold text-lg px-8 rounded-2xl shadow-2xl transition-all hover:scale-105 border-2 border-white/30"
                onClick={() => checkAuth(() => window.open('https://vk.com/perezelivsyoutube', '_blank'))}
              >
                <Icon name="Play" size={20} />
                Смотреть видео
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </header>

      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 transform -rotate-6">
              <Icon name="Video" size={32} className="text-white" />
            </div>
            <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Наши видео
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Смотрите наши последние видео с канала VK Видео
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
              <Card className="border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
                    <Icon name="Users" size={28} className="text-white" />
                  </div>
                  <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-2">
                    157
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">Подписчиков</p>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mb-4">
                    <Icon name="Eye" size={28} className="text-white" />
                  </div>
                  <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400 mb-2">
                    8.5K
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">Просмотров</p>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 mb-4">
                    <Icon name="Heart" size={28} className="text-white" />
                  </div>
                  <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-400 mb-2">
                    342
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">Лайков</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 space-y-6">
                <div className="relative max-w-2xl mx-auto">
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск видео..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-2 text-lg"
                  />
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full font-semibold transition-all hover:scale-105"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-3xl border-2 shadow-2xl overflow-hidden">
                <iframe
                  src="https://vk.com/video_ext.php?oid=-227491169&section=page"
                  width="100%"
                  height="600"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>

              {searchQuery && (
                <div className="mt-6 p-4 bg-primary/10 rounded-2xl text-center">
                  <p className="text-sm text-muted-foreground">
                    Поиск: <span className="font-semibold text-foreground">{searchQuery}</span>
                    {selectedCategory !== 'Все' && <> в категории <span className="font-semibold text-foreground">{selectedCategory}</span></>}
                  </p>
                </div>
              )}

              <div className="text-center mt-8">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl font-semibold"
                  asChild
                >
                  <a href="https://vk.com/perezelivsyoutube" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Icon name="ExternalLink" size={20} />
                    Смотреть все видео на VK
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 rounded-3xl shadow-2xl bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 animate-pulse">
                    <Icon name="Lock" size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Войдите, чтобы смотреть видео</h3>
                  <p className="text-muted-foreground mb-6">
                    Зарегистрируйтесь или войдите в аккаунт, чтобы получить доступ ко всем нашим видео
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm mx-auto">
                    {['Геймплеи', 'Обзоры', 'Летсплеи', 'Гайды'].map((cat) => (
                      <div key={cat} className="p-3 bg-muted/50 rounded-xl text-sm font-medium text-muted-foreground">
                        <Icon name="Play" size={16} className="inline mr-2" />
                        {cat}
                      </div>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    onClick={() => setIsAuthOpen(true)}
                    className="rounded-2xl font-semibold px-8"
                  >
                    <Icon name="LogIn" size={20} className="mr-2" />
                    Войти
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>



      <section id="contact" className="py-24 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 transform rotate-6">
              <Icon name="Mail" size={32} className="text-white" />
            </div>
            <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Напиши своего блогера
            </h2>
            <p className="text-base text-muted-foreground">
              И мы его добавим на канал ВК видео
            </p>
          </div>

          <Card className="border-2 rounded-3xl shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                    <Icon name="User" size={16} />
                    Ваше имя
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
                    placeholder="Как вас зовут?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                    <Icon name="Mail" size={16} />
                    Ваша почта
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold flex items-center gap-2">
                    <Icon name="MessageSquare" size={16} />
                    Ваше сообщение
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="rounded-xl border-2 focus:border-primary transition-colors resize-none"
                    placeholder="Расскажите о своей идее..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      Отправить сообщение
                      <Icon name="Send" size={20} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-8 text-muted-foreground">
            <p>Письма принимаются на: misupova717@gmail.ru</p>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 mb-6">
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              onClick={() => checkAuth(() => window.open('https://t.me/+XvtmRDGb_OFmOThi', '_blank'))}
            >
              <Icon name="Send" size={24} />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              onClick={() => checkAuth(() => toast.info('Подключите Instagram в настройках'))}
            >
              <Icon name="Instagram" size={24} />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              onClick={() => checkAuth(() => toast.info('Подключите YouTube в настройках'))}
            >
              <Icon name="Youtube" size={24} />
            </Button>
          </div>
          <p className="text-muted-foreground">
            © 2024 ПЕРЕЗАЛИВЫ. Созданo с вдохновением ✨
          </p>
        </div>
      </footer>
    </div>
  );
}