import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import func2url from '../../backend/func2url.json';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(func2url.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', login, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Ошибка входа');
        return;
      }
      localStorage.setItem('qonaq_admin_token', data.token);
      navigate('/admin');
    } catch {
      setError('Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-gold/20 blur-3xl" />
        <div className="animate-blob absolute -bottom-32 -right-24 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-3xl" style={{ animationDelay: '5s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in" style={{ animationDuration: '0.6s' }}>
        <a href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="gold-gradient flex h-10 w-10 items-center justify-center rounded-xl shadow-md">
            <Icon name="Mail" size={20} className="text-white" />
          </div>
          <span className="font-display text-3xl font-bold tracking-tight">Qonaq<span className="text-gold"> Invite</span></span>
        </a>

        <div className="glass rounded-3xl p-8 shadow-2xl sm:p-10">
          <div className="mb-7 text-center">
            <div className="gold-gradient mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg">
              <Icon name="ShieldCheck" size={26} className="text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold">Вход для администратора</h1>
            <p className="mt-2 text-sm text-muted-foreground">Доступ к панели управления приглашениями</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Логин</label>
              <div className="relative">
                <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  className="h-12 rounded-xl pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Пароль</label>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-12 rounded-xl px-9"
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground">
                  <Icon name={show ? 'EyeOff' : 'Eye'} size={16} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <Icon name="CircleAlert" size={16} />
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="gold-gradient h-12 w-full rounded-xl text-base font-semibold text-white shadow-lg shadow-gold/30 transition hover:scale-[1.02]">
              {loading ? <Icon name="Loader2" size={18} className="animate-spin" /> : <><Icon name="LogIn" size={18} className="mr-1" /> Войти</>}
            </Button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Lock" size={12} /> Регистрация закрыта. Доступ только для владельца.
          </p>
        </div>

        <a href="/" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
          <Icon name="ArrowLeft" size={14} /> На главную
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;