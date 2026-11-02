import React, { useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Globe,
  Calendar,
  Compass,
  LogOut,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { tourService } from '../services/tourService';

const AccountPage: React.FC = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const unauthorizedAdmin = Boolean(
    (location.state as { unauthorizedAdmin?: boolean } | null)?.unauthorizedAdmin
  );

  const userBookings = useMemo(() => {
    if (!user?.email) return [];
    const allBookings = tourService.getBookings();
    return allBookings.filter(
      (b) => b.clientEmail.toLowerCase() === user.email?.toLowerCase()
    );
  }, [user?.email]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'Safari Explorer';
  const phone = (user?.user_metadata?.phone as string | undefined) || 'Not provided';
  const country = (user?.user_metadata?.country as string | undefined) || 'International Guest';

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 bg-neutral-50 dark:bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto space-y-6">
        {unauthorizedAdmin && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>
              Your account does not have the <code className="font-mono">admin</code> role in{' '}
              <code className="font-mono">app_metadata</code>. You have been directed to your personal Traveler Portal.
            </span>
          </div>
        )}

        {/* Header Profile Card */}
        <div className="bg-white dark:bg-[#121212] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-gold to-amber-500 flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg">
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-gold/15 text-brand-gold">
                  <ShieldCheck className="w-3 h-3" /> Verified Guest
                </span>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 transition-colors"
                  >
                    Admin Access →
                  </Link>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-black dark:text-white mt-1">
                Karibu, {fullName}
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {user?.email} • Member since{' '}
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Today'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/plan-my-visit"
              className="px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-brand-gold/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan New Safari</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-white/10 hover:bg-rose-500/15 hover:text-rose-500 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Traveler Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-black/10 dark:border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Registered Email
              </span>
              <span className="block text-sm font-semibold text-black dark:text-white truncate">
                {user?.email}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-black/10 dark:border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Phone / WhatsApp
              </span>
              <span className="block text-sm font-semibold text-black dark:text-white truncate">
                {phone}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] p-5 rounded-2xl border border-black/10 dark:border-white/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Home Country
              </span>
              <span className="block text-sm font-semibold text-black dark:text-white truncate">
                {country}
              </span>
            </div>
          </div>
        </div>

        {/* My Safari Bookings & Inquiries */}
        <div className="bg-white dark:bg-[#121212] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-black dark:text-white">
                My Safari Reservations & Inquiries
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Expeditions linked to {user?.email}
              </p>
            </div>
            <Link
              to="/tours"
              className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1"
            >
              <span>Browse 84+ Expeditions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {userBookings.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.02] border border-dashed border-black/15 dark:border-white/15">
              <Compass className="w-10 h-10 text-brand-gold mx-auto mb-3 opacity-80" />
              <h3 className="text-base font-bold text-black dark:text-white">
                No Safari Bookings Linked Yet
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mt-1 mb-5">
                Start designing your custom Serengeti, Ngorongoro, or Kilimanjaro itinerary and our Arusha operations desk will link your reservation here.
              </p>
              <Link
                to="/plan-my-visit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gold hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Build Custom Safari</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {userBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-brand-gold">
                        {booking.id}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
                        {booking.status === 'Confirmed' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {booking.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-black dark:text-white mt-1">
                      {booking.tourName}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Travel Date: {booking.travelDate} • {booking.pax} Guests • Guide:{' '}
                      {booking.assignedGuide || 'TBA'}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="block text-xs text-neutral-400">Total Package</span>
                    <span className="text-lg font-extrabold text-black dark:text-white">
                      {booking.currency}
                      {booking.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

