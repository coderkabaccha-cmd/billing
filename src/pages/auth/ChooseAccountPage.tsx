import React from 'react';
import { GoogleLogo } from '../../components/Icons';

interface ChooseAccountPageProps {
  onNavigate: (page: string) => void;
}

interface Account {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  initial: string;
}

const accounts: Account[] = [
  {
    id: '1',
    name: 'Abishek Babu',
    email: 'admin@linodegpu.com',
    avatarColor: '#34a853',
    initial: 'A',
  },
  {
    id: '2',
    name: 'Abishek B',
    email: 'admin@linkerdm.online',
    avatarColor: '#34a853',
    initial: 'A',
  },
  {
    id: '3',
    name: 'light yagami',
    email: 'pkbiswas503@gmail.com',
    avatarColor: '#9c27b0',
    initial: 'l',
  },
];

export const ChooseAccountPage: React.FC<ChooseAccountPageProps> = ({ onNavigate }) => {
  const handleAccountSelect = (_account: Account) => {
    onNavigate('auth-password');
  };

  const handleUseAnotherAccount = () => {
    onNavigate('auth-signin');
  };

  return (
    <div className="min-h-screen bg-[#e8eaed] flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-[24px]">
        <div className="bg-white rounded-[8px] shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] w-full max-w-[450px] sm:max-w-[800px] p-[40px] sm:p-[48px]">
          <div className="flex flex-col sm:flex-row sm:gap-[48px]">
            {/* Left side */}
            <div className="flex-1 mb-[32px] sm:mb-0">
              <GoogleLogo size={48} className="mb-[16px]" />
              <h1 className="text-[24px] sm:text-[28px] font-normal text-[#202124]">Choose an account</h1>
            </div>

            {/* Right side - Account list */}
            <div className="flex-1">
              <div className="divide-y divide-[#e8eaed]">
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => handleAccountSelect(account)}
                    className="w-full flex items-center gap-[16px] py-[12px] hover:bg-[#f8f9fa] -mx-[8px] px-[8px] rounded-[4px] transition-colors"
                  >
                    <div
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-white text-[18px] font-medium flex-shrink-0"
                      style={{ backgroundColor: account.avatarColor }}
                    >
                      {account.initial}
                    </div>
                    <div className="text-left">
                      <p className="text-[14px] font-medium text-[#202124]">{account.name}</p>
                      <p className="text-[14px] text-[#5f6368]">{account.email}</p>
                    </div>
                  </button>
                ))}

                {/* Use another account */}
                <button
                  onClick={handleUseAnotherAccount}
                  className="w-full flex items-center gap-[16px] py-[12px] hover:bg-[#f8f9fa] -mx-[8px] px-[8px] rounded-[4px] transition-colors"
                >
                  <div className="w-[40px] h-[40px] rounded-full border-[2px] border-[#dadce0] flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-medium text-[#202124]">Use another account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-[16px] px-[24px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="text-[14px] text-[#5f6368]">English (United States)</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#5f6368">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
          <div className="flex items-center gap-[24px]">
            <button className="text-[14px] text-[#5f6368] hover:text-[#202124]">Help</button>
            <button className="text-[14px] text-[#5f6368] hover:text-[#202124]">Privacy</button>
            <button className="text-[14px] text-[#5f6368] hover:text-[#202124]">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChooseAccountPage;
