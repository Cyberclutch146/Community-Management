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
  
  const { login } = useAuth();
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
          grid-template-columns: repeat(3, 1fr);
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
                <button className="social-btn">
                  <img className="social-icon" src="https://www.svgrepo.com/show/475656/google-color.svg" />
                  Google
                </button>
                <button className="social-btn">
                  <img className="social-icon" src="https://www.svgrepo.com/show/475647/facebook-color.svg" />
                  Facebook
                </button>
                <button className="social-btn">
                  <img className="social-icon" src="https://www.svgrepo.com/show/475689/twitter-color.svg" />
                  X
                </button>
              </div>
            </form>

            <div className="login-footer">
              New here? <Link href="/register">Create an account</Link>
            </div>
          </form>

          {/* Social Logins */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-on-surface-variant font-body">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-outline-variant rounded-lg shadow-sm bg-surface text-sm font-medium text-on-surface hover:bg-surface-variant transition-colors"
                onClick={() => console.log('Google login placeholder')}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 border border-outline-variant rounded-lg shadow-sm bg-surface text-sm font-medium text-on-surface hover:bg-surface-variant transition-colors"
                onClick={() => console.log('GitHub login placeholder')}
              >
                <svg className="h-5 w-5 mr-2 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
            <p className="font-body text-sm text-on-surface-variant">
              New to Terra Relief?{' '}
              <Link className="font-medium text-primary hover:text-primary-container transition-colors underline underline-offset-2" href="/register">Create an account</Link>
            </p>
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
