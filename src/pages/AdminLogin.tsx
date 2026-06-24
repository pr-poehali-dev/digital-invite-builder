import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        setError(data.error || 'Неверный логин или пароль');
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fdf8f0 0%, #fef9ee 50%, #fdf5e8 100%)',
      padding: '1rem',
      fontFamily: "'Golos Text', sans-serif",
    }}>
      {/* Decorative blobs — non-interactive */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-8rem', left: '-6rem', width: '28rem', height: '28rem', borderRadius: '9999px', background: 'rgba(200,160,80,0.18)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-8rem', right: '-6rem', width: '32rem', height: '32rem', borderRadius: '9999px', background: 'rgba(180,130,60,0.12)', filter: 'blur(80px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '2rem', textDecoration: 'none' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #c8922a, #e8b84b, #a8761e)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(200,146,42,0.4)' }}>
            <span style={{ fontSize: '20px' }}>✉️</span>
          </div>
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: '28px', fontWeight: 700, color: '#1a1208' }}>
            Qonaq<span style={{ color: '#c8922a' }}> Invite</span>
          </span>
        </a>

        {/* Card */}
        <div style={{
          background: 'rgba(255,252,245,0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '28px',
          padding: '2.5rem',
          boxShadow: '0 8px 48px rgba(160,110,30,0.12), 0 1px 0 rgba(255,255,255,0.9) inset',
          border: '1px solid rgba(200,160,80,0.2)',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'linear-gradient(135deg, #c8922a, #e8b84b)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 6px 20px rgba(200,146,42,0.35)', fontSize: '26px' }}>
              🛡️
            </div>
            <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: '28px', fontWeight: 700, color: '#1a1208', margin: 0 }}>Вход для администратора</h1>
            <p style={{ color: '#8a7a60', fontSize: '14px', marginTop: '6px' }}>Доступ только для владельца</p>
          </div>

          <form onSubmit={submit}>
            {/* Login field */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#3a2e1e', marginBottom: '6px' }}>Логин</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите логин"
                autoComplete="username"
                required
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(200,160,80,0.35)',
                  background: 'rgba(255,250,240,0.9)',
                  padding: '0 16px',
                  fontSize: '15px',
                  color: '#1a1208',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#c8922a'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(200,160,80,0.35)'}
              />
            </div>

            {/* Password field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#3a2e1e', marginBottom: '6px' }}>Пароль</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                  required
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '14px',
                    border: '1.5px solid rgba(200,160,80,0.35)',
                    background: 'rgba(255,250,240,0.9)',
                    padding: '0 48px 0 16px',
                    fontSize: '15px',
                    color: '#1a1208',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#c8922a'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(200,160,80,0.35)'}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: 0, lineHeight: 1 }}
                >
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: 'rgba(220,60,60,0.08)', border: '1px solid rgba(220,60,60,0.2)', borderRadius: '12px', padding: '10px 14px', marginBottom: '1rem', color: '#c03030', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '52px',
                borderRadius: '16px',
                border: 'none',
                background: loading ? '#d4a94a' : 'linear-gradient(135deg, #c8922a, #e8b84b, #a8761e)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 24px rgba(200,146,42,0.4)',
                transition: 'transform 0.15s, box-shadow 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: "'Golos Text', sans-serif",
              }}
              onMouseEnter={(e) => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.02)'; } }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
            >
              {loading ? '⏳ Входим...' : '🔐 Войти в панель'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#a09080', marginTop: '1.5rem' }}>
            🔒 Регистрация закрыта. Только для владельца.
          </p>
        </div>

        <a href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '1.5rem', color: '#a09080', fontSize: '14px', textDecoration: 'none' }}>
          ← На главную
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
