import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift bg-[length:200%_200%]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 animate-float">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform rotate-12">
                <Icon name="Sparkles" size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-7xl font-black mb-6 text-white animate-fade-in leading-tight">
              Креативный
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Блог
              </span>
            </h1>
            <p className="text-2xl text-white/90 mb-8 animate-fade-in font-medium max-w-2xl mx-auto">
              Делюсь идеями, вдохновением и творческими находками
            </p>
            <div className="flex gap-4 justify-center animate-slide-up">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 rounded-2xl shadow-2xl transition-all hover:scale-105"
                onClick={() => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Читать блог
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 rounded-2xl transition-all hover:scale-105"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Связаться
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </header>

      <section id="posts" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Последние записи
            </h2>
            <p className="text-xl text-muted-foreground">
              Мои мысли, идеи и творческие эксперименты
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-2 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 rounded-3xl animate-fade-in cursor-pointer hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Icon name="Calendar" size={16} />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                    Читать далее
                    <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-6 transform rotate-6">
              <Icon name="Mail" size={32} className="text-white" />
            </div>
            <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Свяжитесь со мной
            </h2>
            <p className="text-xl text-muted-foreground">
              Есть идея для сотрудничества? Напишите мне!
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
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110">
              <Icon name="Instagram" size={24} />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110">
              <Icon name="Youtube" size={24} />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110">
              <Icon name="Twitter" size={24} />
            </Button>
          </div>
          <p className="text-muted-foreground">
            © 2024 Креативный Блог. Созданo с вдохновением ✨
          </p>
        </div>
      </footer>
    </div>
  );
}
