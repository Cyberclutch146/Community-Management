'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError('');
    }, 7000);
    return () => clearTimeout(timer);
  }, [error]);
  
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/feed');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push('/feed');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --cream: #F5F0E8;
          --warm-white: #FAF8F4;
          --ink: #1A1713;
          --olive: #3D4A2E;
          --terracotta: #C4622D;
          --stone: #9A8F82;
          --mist: #E8E2D9;
        }

        .login-root {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          box-sizing: border-box;
        }

        .login-card {
          width: 100%;
          max-width: 1000px;
          height: auto;
          background: var(--warm-white);
          border: 1px solid var(--mist);
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          margin: 0 auto;
          transform: translateY(0);
          transition: box-shadow 0.5s ease, border-color 0.3s ease;
        }
        .login-card:hover {
          box-shadow: 0 30px 80px rgba(0,0,0,0.12);
        }

        .login-left {
          padding: 100px 64px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .login-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .login-sub {
          color: var(--stone);
          font-size: 15px;
          margin-bottom: 48px;
          max-width: 380px;
        }

        .input {
          width: 100%;
          padding: 18px 0 10px;
          border: none;
          border-bottom: 1px solid var(--mist);
          background: transparent;
          font-size: 14px;
          outline: none;
          margin-bottom: 28px;
          border-radius: 4px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .input:focus {
          border-color: var(--olive);
          box-shadow: 0 2px 0 0 var(--olive);
        }

        .btn {
          width: 100%;
          padding: 16px;
          background: var(--ink);
          color: var(--cream);
          border: none;
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease, box-shadow 0.25s ease;
          border-radius: 6px;
        }

        .btn:hover {
          background: var(--olive);
          box-shadow: 0 6px 18px rgba(0,0,0,0.10);
        }

        .btn:active {
          box-shadow: 0 2px 8px rgba(0,0,0,0.08) inset;
        }

        .login-footer {
          margin-top: 32px;
          font-size: 13px;
          color: var(--stone);
        }

        .login-footer a {
          color: var(--ink);
          text-decoration: underline;
        }

        .login-right {
          position: relative;
          overflow: hidden;
        }

        .login-right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.9);
          border-radius: 0 20px 20px 0;
          transition: filter 0.6s ease;
        }
        .login-right:hover img {
          filter: brightness(1);
        }

        .login-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,23,19,0.55), rgba(26,23,19,0.15));
        }

        .login-quote {
          position: absolute;
          bottom: 60px;
          left: 60px;
          right: 60px;
          color: var(--cream);
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          line-height: 1.3;
        }

        .or-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 36px 0 24px;
          color: var(--stone);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .or-divider::before,
        .or-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--mist);
        }

        .social-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          border: 1px solid var(--mist);
          background: transparent;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: border-color 0.2s ease, background 0.2s ease;
          border-radius: 8px;
        }

        .social-btn:hover {
          border-color: var(--ink);
          background: var(--mist);
        }

        .social-icon {
          width: 16px;
          height: 16px;
        }

        .error-toast {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(26,23,19,0.95);
          color: var(--cream);
          padding: 14px 20px;
          font-size: 13px;
          letter-spacing: 0.04em;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          z-index: 999;
          animation: fadeInUp 0.3s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @media (max-width: 900px) {
          .login-card {
            grid-template-columns: 1fr;
          }
          .login-left {
            padding: 48px 32px;
          }
          .login-right {
            height: 300px;
          }
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">

          <div className="login-left">
            <h1 className="login-title">Welcome back.</h1>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '34px', fontStyle: 'italic', marginBottom: '24px', color: 'var(--olive)' }}>
              We're glad you're here.
            </p>
            <p className="login-sub">Continue your journey of impact.</p>

            <form onSubmit={handleLogin}>
              <input
                className="input"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="or-divider">or</div>

              <div className="social-row">
                <button type="button" className="social-btn" onClick={handleGoogleSignIn} disabled={loading}>
                  <img className="social-icon" src="https://www.svgrepo.com/show/475656/google-color.svg" />
                  Google
                </button>
              </div>
            </form>

            <div className="login-footer">
              New here? <Link href="/register">Create an account</Link>
            </div>
          </div>


          <div className="login-right">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6SsSRVlGYy_mYUBPddi5PP0YThIbaZOjDdbxdceDg1Y6UxF6lR23T8POlRObgpuxvvTDIgemtKHSk6ULAH8zMBeYYhFLPPR6xG3JggHWG8qMeJhf9bP7xWgBa02EDitKYJHAnyhB9qcai7rJAG3Gvw5XuoAnrg9DapfZkm0Q7na_aJgu6Cvx-HWuO24YEv4d25UPMK1HQJT_U6VknyixRH1bCSgVgHwpuQZCp6Zh_9LOBd2EzXwdbY784qMeRhQ88skYX-y_rNIUN" />
            <div className="login-overlay" />
            <div className="login-quote">
              Rooted in community,<br/>grown through care.
            </div>
          </div>

        </div>
        {error && <div className="error-toast">{error}</div>}
      </div>
    </>
  );
}
