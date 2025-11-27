import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AuthDialog({ open, onOpenChange, onSuccess }: AuthDialogProps) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email: loginData.email }));
      toast.success('Вход выполнен успешно!');
      setIsLoading(false);
      onOpenChange(false);
      onSuccess();
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ name: registerData.name, email: registerData.email }));
      toast.success('Регистрация успешна! Добро пожаловать!');
      setIsLoading(false);
      onOpenChange(false);
      onSuccess();
    }, 1000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast.success('Ссылка для восстановления отправлена на ' + resetEmail);
      setIsLoading(false);
      setShowReset(false);
      setResetEmail('');
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email: `user@${provider}.com`, provider }));
      toast.success(`Вход через ${provider} выполнен!`);
      setIsLoading(false);
      onOpenChange(false);
      onSuccess();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Добро пожаловать!</DialogTitle>
          <DialogDescription className="text-center">
            Войдите или зарегистрируйтесь, чтобы продолжить
          </DialogDescription>
        </DialogHeader>

        {showReset ? (
          <div className="space-y-4 pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReset(false)}
              className="mb-2"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email для восстановления
                </label>
                <Input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? 'Отправка...' : 'Отправить ссылку'}
              </Button>
            </form>
          </div>
        ) : (
          <>
            <div className="space-y-3 py-4">
              <Button
                variant="outline"
                className="w-full h-11 flex items-center justify-center gap-2 hover:bg-blue-50"
                onClick={() => handleSocialLogin('VK')}
                disabled={isLoading}
              >
                <Icon name="ExternalLink" size={18} />
                Войти через VK
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 flex items-center justify-center gap-2 hover:bg-red-50"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
              >
                <Icon name="Globe" size={18} />
                Войти через Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 flex items-center justify-center gap-2 hover:bg-blue-50"
                onClick={() => handleSocialLogin('Telegram')}
                disabled={isLoading}
              >
                <Icon name="Send" size={18} />
                Войти через Telegram
              </Button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">или</span>
              </div>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email
                </label>
                <Input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Lock" size={16} />
                  Пароль
                </label>
                <Input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="h-11"
                />
              </div>

              <div className="text-right mb-4">
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Забыли пароль?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="User" size={16} />
                  Имя
                </label>
                <Input
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  placeholder="Ваше имя"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email
                </label>
                <Input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Lock" size={16} />
                  Пароль
                </label>
                <Input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}