import React, { useEffect } from 'react';

interface LoadingTransitionPageProps {
  onNavigate: (page: string) => void;
  email?: string;
}

export const LoadingTransitionPage: React.FC<LoadingTransitionPageProps> = ({ onNavigate, email = '' }) => {
  useEffect(() => {
    // Simulate loading and redirect after 2 seconds
    const timer = setTimeout(() => {
      onNavigate('subscriptions');
    }, 2000);

    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-[#e8eaed] flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-[24px]">
        <div className="bg-white rounded-[8px] shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] w-full max-w-[450px] sm:max-w-[800px] p-[40px] sm:p-[48px] relative overflow-hidden">
          {/* Progress bar at top */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#e8eaed]">
            <div className="h-full bg-[#1a73e8] animate-pulse" style={{ width: '60%' }} />
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-[48px]">
            {/* Left side - Google Logo and Welcome */}
            <div className="flex-1 mb-[32px] sm:mb-0">
              {/* Google Logo */}
              <svg width="48" height="48" viewBox="0 0 48 48" className="mb-[16px]">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              <h1 className="text-[24px] sm:text-[28px] font-normal text-[#9aa0a6] mb-[16px]">Welcome</h1>

              {/* Email dropdown (disabled/greyed out state) */}
              <div className="flex items-center gap-[8px] px-[12px] py-[8px] border border-[#dadce0] rounded-[20px] opacity-50 w-fit">
                <div className="w-[20px] h-[20px] bg-[#9aa0a6] rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <span className="text-[14px] text-[#9aa0a6]">{email}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#9aa0a6">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>

            {/* Right side - Loading state */}
            <div className="flex-1">
              {/* Info text (greyed out) */}
              <p className="text-[16px] text-[#9aa0a6] mb-[24px]">
                Signing you in...
              </p>

              {/* Loading spinner */}
              <div className="flex items-center justify-center py-[32px]">
                <div className="w-[40px] h-[40px] border-[4px] border-[#e8eaed] border-t-[#1a73e8] rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (greyed out) */}
      <footer className="py-[16px] px-[24px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[8px] opacity-50">
            <span className="text-[14px] text-[#9aa0a6]">English (United Kingdom)</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#9aa0a6">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
          <div className="flex items-center gap-[24px] opacity-50">
            <span className="text-[14px] text-[#9aa0a6]">Help</span>
            <span className="text-[14px] text-[#9aa0a6]">Privacy</span>
            <span className="text-[14px] text-[#9aa0a6]">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoadingTransitionPage;
