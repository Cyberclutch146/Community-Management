'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createUserProfile } from '@/services/userService';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(''), 7000);
    return () => clearTimeout(timer);
  }, [error]);

  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const user = await register(email, password);
      await createUserProfile(user.uid, {
        displayName: fullName,
        email,
        location,
        role: 'volunteer',
        skills: [],
        bio: '',
        phone: '',
        avatarUrl: '',
        volunteerHours: 0,
        totalDonated: 0,
        profileComplete: false
      });
      router.push('/feed');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
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
          padding: 60px 64px;
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
          margin-bottom: 24px;
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
          margin: 30px 0 20px;
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
            display: none;
          }
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">

          <div className="login-left">
            <h1 className="login-title">Join Terra Relief.</h1>
            <p className="login-sub">Create your volunteer account.</p>

            <form onSubmit={handleRegister}>
              <input
                className="input"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                required
              />

              <input
                className="input"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />

              <input
                className="input"
                type="text"
                placeholder="Primary Location (City, Country)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={loading}
                required
              />

              <input
                className="input"
                type="password"
                placeholder="Password (at least 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                minLength={8}
              />

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px', fontSize: '13px', color: 'var(--stone)' }}>
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)} 
                  disabled={loading} 
                  style={{ marginRight: '12px', width: '16px', height: '16px', accentColor: 'var(--olive)' }} 
                  required
                />
                <span>
                  I agree to the <a href="#" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>Privacy Policy</a>.
                </span>
              </div>

              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Join Terra Relief'}
              </button>

              <div className="or-divider">or sign up with</div>

              <div className="social-row">
                <button type="button" className="social-btn">
                  <img className="social-icon" src="https://www.svgrepo.com/show/475656/google-color.svg" />
                  Google
                </button>
                <button type="button" className="social-btn">
                  <img className="social-icon" src="https://www.svgrepo.com/show/475647/facebook-color.svg" />
                  Facebook
                </button>
                <button type="button" className="social-btn">
                  <img className="social-icon" src="https://www.svgrepo.com/show/475689/twitter-color.svg" />
                  X
                </button>
              </div>
            </form>

            <div className="login-footer">
              Already have an account? <Link href="/login">Log in here</Link>
            </div>
          </div>


          <div className="login-right">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAreKeglV9ZJKv0zGehE1dWVuvZrijPeYA4HQmiOFaMZ5UFVHy1IW_xmFj7ZmVWbkTnEbUm7mi9uEQ7PmFIufwWsH4bZsVoqT7uGgRpLE2rKYui85nDDLq3Te3U3evUqEwira7Ca4IODlVfwWIhRliXqnA0fWrauQ4nRfj7Yw9irLFoSP_jWRarHU2q9nitqm0J98DmRY3QNec-8pYzPPdN73LXN8LnfSYsfSCvgZUotNzZvqvcwImGHu7zz4nhaQIjrdkV8Wn9w7GZ" />
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
