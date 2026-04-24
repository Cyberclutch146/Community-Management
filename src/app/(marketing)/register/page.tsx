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
          padding: 32px 24px;
        }

        .login-card {
          width: 100%;
          max-width: 1000px;
          background: var(--warm-white);
          border: 1px solid var(--mist);
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .login-left {
          padding: 80px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          margin-bottom: 12px;
        }

        .input {
          width: 100%;
          padding: 18px 0 10px;
          border: none;
          border-bottom: 1px solid var(--mist);
          background: transparent;
          margin-bottom: 28px;
          outline: none;
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
          border-radius: 6px;
        }

        .login-footer {
          margin-top: 40px;
          font-size: 13px;
          color: var(--stone);
        }

        .login-right {
          position: relative;
        }

        .login-right img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          color: var(--cream);
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
        }

        .error-toast {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(26,23,19,0.95);
          color: var(--cream);
          padding: 14px 20px;
          border-radius: 8px;
        }

        @media (max-width: 900px) {
          .login-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">

          <div className="login-left">
            <h1 className="login-title">Join us.</h1>
            <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', color: 'var(--olive)', marginBottom: '20px' }}>
              Start making an impact.
            </p>

            <form onSubmit={handleRegister}>
              <input className="input" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
              <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <label style={{ fontSize: '13px', color: 'var(--stone)', marginBottom: '24px', display: 'block' }}>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} /> Agree to terms
              </label>

              <button className="btn">{loading ? 'Creating...' : 'Create Account'}</button>
            </form>

            <div className="login-footer">
              Already have an account? <Link href="/login">Log in</Link>
            </div>
          </div>

          <div className="login-right">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6SsSRVlGYy_mYUBPddi5PP0YThIbaZOjDdbxdceDg1Y6UxF6lR23T8POlRObgpuxvvTDIgemtKHSk6ULAH8zMBeYYhFLPPR6xG3JggHWG8qMeJhf9bP7xWgBa02EDitKYJHAnyhB9qcai7rJAG3Gvw5XuoAnrg9DapfZkm0Q7na_aJgu6Cvx-HWuO24YEv4d25UPMK1HQJT_U6VknyixRH1bCSgVgHwpuQZCp6Zh_9LOBd2EzXwdbY784qMeRhQ88skYX-y_rNIUN" />
            <div className="login-overlay" />
            <div className="login-quote">Rooted in community,<br/>grown through care.</div>
          </div>

        </div>
        {error && <div className="error-toast">{error}</div>}
      </div>
    </>
  );
}
