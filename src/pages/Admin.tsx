import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import func2url from '../../backend/func2url.json';

const Admin = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('qonaq_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetch(func2url.auth, { headers: { 'X-Auth-Token': token } })
      .then((r) => r.json())
      .then((d) => {
        if (!d.valid) {
          localStorage.removeItem('qonaq_admin_token');
          navigate('/admin/login');
        } else {
          setChecking(false);
        }
      })
      .catch(() => navigate('/admin/login'));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('qonaq_admin_token');
    navigate('/admin/login');
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <Icon name="Loader2" size={28} className="animate-spin text-gold" />
      </div>
    );
  }

  const stats = [
    { icon: 'Mail', label: 'Приглашений', value: '0' },
    { icon: 'Eye', label: 'Просмотров', value: '0' },
    { icon: 'UserCheck', label: 'Подтверждений', value: '0' },
    { icon: 'QrCode', label: 'QR-кодов', value: '0' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-gold/15 blur-3xl" />
      </div>

      <header className="container relative z-10 pt-6">
        <div className="glass flex items-center justify-between rounded-2xl px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="gold-gradient flex h-9 w-9 items-center justify-center rounded-xl">
              <Icon name="LayoutDashboard" size={18} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold">Панель управления</span>
          </div>
          <Button onClick={logout} variant="outline" className="glass rounded-full border-border/60">
            <Icon name="LogOut" size={16} className="mr-1" /> Выйти
          </Button>
        </div>
      </header>

      <main className="container relative z-10 py-10">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">Добро пожаловать 👋</h1>
        <p className="mt-2 text-muted-foreground">Управляйте всеми приглашениями из одного места</p>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Icon name={s.icon} size={20} />
              </div>
              <p className="font-display text-3xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="glass mt-8 flex flex-col items-center justify-center rounded-3xl p-14 text-center">
          <div className="gold-gradient mb-4 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg">
            <Icon name="Plus" size={26} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold">Пока нет приглашений</h2>
          <p className="mt-2 max-w-md text-muted-foreground">Создайте первое цифровое приглашение — оно появится здесь с уникальной ссылкой и QR-кодом.</p>
          <Button className="gold-gradient mt-6 rounded-full px-7 text-white shadow-lg shadow-gold/30 transition hover:scale-105">
            <Icon name="Wand2" size={16} className="mr-1" /> Создать приглашение
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Admin;
