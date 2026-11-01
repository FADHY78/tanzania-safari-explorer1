import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * When true, requires either an authenticated Supabase user or (for /admin)
   * allows the component to handle fallback admin verification if configured.
   */
  requireAdminRole?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdminRole = false,
  redirectTo = '/login',
}) => {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col items-center justify-center p-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-xl animate-pulse mb-4">
          <Compass className="w-7 h-7 text-white animate-spin" />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Verifying Safari Session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requireAdminRole && !isAdmin) {
    return <Navigate to="/account" state={{ unauthorizedAdmin: true }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

