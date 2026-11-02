import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Compass,
  Mail,
  Lock,
  User,
  Phone,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabaseUrl } from '../lib/supabase';

type AuthMode = 'signin' | 'signup' | 'magic' | 'reset';

const AuthPage: React.FC = () => {
  const {
    user,
    isConfigured,
    signInWithPassword,
    signUpWithPassword,
    signInWithMagicLink,
    resetPassword,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const initialMode = (searchParams.get('mode') as AuthMode) || (location.pathname === '/register' ? 'signup' : 'signin');
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fromLocation = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/account';

  useEffect(() => {
    if (user) {
      navigate(fromLocation, { replace: true });
    }
  }, [user, navigate, fromLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!isConfigured) {
      setErrorMsg(
        'Supabase Publishable/Anon Key is not set yet. Add VITE_SUPABASE_PUBLISHABLE_KEY to .env.local and restart the dev server.'
      );
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'signin') {
        const { error } = await signInWithPassword(email.trim(), password);
        if (error) {
          setErrorMsg(error.message);
        } else {
          navigate(fromLocation, { replace: true });
        }
      } else if (mode === 'signup') {
        const { data, error } = await signUpWithPassword(email.trim(), password, {
          full_name: fullName.trim() || undefined,
          phone: phone.trim() || undefined,
          country: country.trim() || undefined,
        });
        if (error) {
          setErrorMsg(error.message);
        } else if (data.session) {
          navigate(fromLocation, { replace: true });
        } else {
          setSuccessMsg(
            'Account created! Please check your email inbox to confirm your address before signing in.'
          );
        }
      } else if (mode === 'magic') {
        const { error } = await signInWithMagicLink(email.trim());
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Magic sign-in link sent! Check your email inbox to continue.');
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email.trim());
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Password reset instructions sent to your email.');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 bg-neutral-50 dark:bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-3xl p-7 sm:p-9 border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold via-brand-orange to-amber-500" />

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center mx-auto mb-3 text-brand-gold">
            <Compass className="w-7 h-7" />
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> Embuat Safaris Traveler Portal
          </span>
          <h1 className="text-2xl font-serif font-bold text-black dark:text-white mt-3">
            {mode === 'signin' && 'Welcome Back to Tanzania'}
            {mode === 'signup' && 'Create Your Safari Account'}
            {mode === 'magic' && 'Passwordless Magic Link'}
            {mode === 'reset' && 'Reset Your Password'}
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Access your custom itineraries, saved expeditions, and booking status.
          </p>
        </div>

        {!isConfigured && (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 flex-shrink-0 text-brand-gold" />
              <span>Supabase Key Required in .env.local</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              Connected to <code className="font-mono">{supabaseUrl}</code>. Paste your project&apos;s{' '}
              <code className="font-mono">VITE_SUPABASE_PUBLISHABLE_KEY</code> (or anon key) in{' '}
              <code className="font-mono">.env.local</code> to activate live authentication.
            </p>
          </div>
        )}

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`py-2 rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-brand-gold text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`py-2 rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-brand-gold text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('magic');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`py-2 rounded-xl transition-all ${
              mode === 'magic'
                ? 'bg-brand-gold text-white shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Magic Link
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 dark:bg-black/50 border border-black/10 dark:border-white/15 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      placeholder="+1 555 234 5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-black/50 border border-black/10 dark:border-white/15 text-xs text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
                    Country
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="United States"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-black/50 border border-black/10 dark:border-white/15 text-xs text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                placeholder="traveler@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 dark:bg-black/50 border border-black/10 dark:border-white/15 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
          </div>

          {(mode === 'signin' || mode === 'signup') && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('reset');
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
                    className="text-[11px] font-semibold text-brand-gold hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 dark:bg-black/50 border border-black/10 dark:border-white/15 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-5 rounded-xl bg-brand-gold hover:bg-brand-orange disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-gold/25 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>Processing...</span>
            ) : (
              <>
                {mode === 'signin' && <span>Sign In to Safari Portal</span>}
                {mode === 'signup' && <span>Create Traveler Account</span>}
                {mode === 'magic' && (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Send Magic Sign-In Link</span>
                  </>
                )}
                {mode === 'reset' && <span>Send Password Reset Email</span>}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <Link to="/" className="hover:text-brand-gold transition-colors">
            ← Back to Home
          </Link>
          <Link to="/admin" className="hover:text-brand-gold transition-colors font-semibold">
            Operations Admin →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

