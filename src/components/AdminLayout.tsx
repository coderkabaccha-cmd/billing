import React, { useState } from 'react';
import {
  MenuIcon,
  SearchIcon,
  NotificationIcon,
  HelpIcon,
  AppsIcon,
  BillingIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  UpgradeIcon,
  FeedbackIcon,
  SupportIcon,
} from './Icons';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSubPage?: string;
  onNavigate: (page: string) => void;
}

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  isExpanded?: boolean;
  hasChildren?: boolean;
  onClick?: () => void;
  indent?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive = false,
  isExpanded,
  hasChildren = false,
  onClick,
  indent = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-[12px] h-[40px] px-[24px] text-left
        transition-colors duration-150 relative
        ${indent ? 'pl-[56px]' : ''}
        ${isActive
          ? 'bg-[#e8f0fe] text-[#1a73e8]'
          : 'text-[#202124] hover:bg-[#e8eaed]'
        }
      `}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#1a73e8] rounded-r-[2px]" />
      )}
      {icon && (
        <span className={`flex-shrink-0 ${isActive ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`}>
          {icon}
        </span>
      )}
      <span className="flex-1 text-[14px] font-medium truncate">{label}</span>
      {hasChildren && (
        <span className="text-[#5f6368]">
          {isExpanded ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
        </span>
      )}
    </button>
  );
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeSubPage = 'subscriptions',
  onNavigate,
}) => {
  const [billingExpanded, setBillingExpanded] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[56px] sm:h-[64px] bg-white border-b border-[#dadce0] z-50 flex items-center px-[4px] sm:px-[8px]">
        {/* Left section */}
        <div className="flex items-center gap-[2px] sm:gap-[4px]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full hover:bg-[#f1f3f4] text-[#5f6368]"
          >
            <MenuIcon size={24} />
          </button>

          {/* Google Admin Logo */}
          <button
            onClick={() => onNavigate('subscriptions')}
            className="flex items-center gap-[8px] px-[4px] sm:px-[8px]"
          >
            <svg width="32" height="32" viewBox="0 0 48 48" className="sm:w-[40px] sm:h-[40px]">
              {/* Outer hexagon */}
              <path
                d="M24 4L44 14.5V33.5L24 44L4 33.5V14.5L24 4Z"
                fill="#4285F4"
              />
              {/* Inner hexagonal hole */}
              <path
                d="M24 16L32 20.5V29.5L24 34L16 29.5V20.5L24 16Z"
                fill="white"
              />
            </svg>
            <span className="text-[18px] sm:text-[22px] text-[#5f6368] font-normal hidden xs:inline">Admin</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex justify-center px-[8px] sm:px-[16px] md:px-[32px]">
          <div className="w-full max-w-[720px] relative">
            <div className="flex items-center h-[40px] sm:h-[48px] bg-[#f1f3f4] rounded-[20px] sm:rounded-[24px] px-[12px] sm:px-[16px] hover:bg-[#e8eaed] hover:shadow-[0_1px_1px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all">
              <SearchIcon size={20} className="text-[#5f6368] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent border-none outline-none ml-[8px] sm:ml-[12px] text-[14px] sm:text-[16px] text-[#202124] placeholder:text-[#5f6368] min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-[2px] sm:gap-[4px]">
          <button className="w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full hover:bg-[#f1f3f4] text-[#5f6368]">
            <NotificationIcon size={20} className="sm:w-[24px] sm:h-[24px]" />
          </button>
          <button className="hidden md:flex w-[48px] h-[48px] items-center justify-center rounded-full hover:bg-[#f1f3f4] text-[#5f6368]">
            <SupportIcon size={24} />
          </button>
          <button className="hidden sm:flex w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] items-center justify-center rounded-full hover:bg-[#f1f3f4] text-[#5f6368]">
            <HelpIcon size={20} className="sm:w-[24px] sm:h-[24px]" />
          </button>
          <button className="hidden lg:flex w-[48px] h-[48px] items-center justify-center rounded-full hover:bg-[#f1f3f4] text-[#5f6368]">
            <AppsIcon size={24} />
          </button>
          <button className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-full bg-[#5f6368] text-white text-[14px] sm:text-[18px] font-medium ml-[4px] sm:ml-[8px]">
            A
          </button>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-[56px] sm:top-[64px] left-0 bottom-0 bg-[#f8f9fa] border-r border-[#dadce0]
          flex flex-col overflow-hidden transition-all duration-200 z-40
          w-[260px]
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-[8px]">
          {/* Billing section */}
          <NavItem
            icon={<BillingIcon size={20} />}
            label="Billing"
            hasChildren
            isExpanded={billingExpanded}
            onClick={() => setBillingExpanded(!billingExpanded)}
          />

          {billingExpanded && (
            <>
              <NavItem
                label="Subscriptions"
                indent
                isActive={activeSubPage === 'subscriptions' || activeSubPage === 'subscription-detail'}
                onClick={() => { onNavigate('subscriptions'); setSidebarOpen(false); }}
              />
              <NavItem
                label="Payment accounts"
                indent
                isActive={activeSubPage === 'payment-accounts' || activeSubPage === 'transactions'}
                onClick={() => { onNavigate('payment-accounts'); setSidebarOpen(false); }}
              />
              <NavItem
                label="Buy or upgrade"
                indent
                isActive={activeSubPage === 'buy-or-upgrade'}
                onClick={() => { onNavigate('buy-or-upgrade'); setSidebarOpen(false); }}
              />
            </>
          )}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-[#dadce0]">
          {/* Upgrade button */}
          <button
            onClick={() => { onNavigate('buy-or-upgrade'); setSidebarOpen(false); }}
            className="w-full flex items-center gap-[12px] h-[48px] px-[24px] text-[#202124] hover:bg-[#e8eaed] transition-colors"
          >
            <UpgradeIcon size={20} className="text-[#5f6368]" />
            <span className="flex-1 text-[14px] font-medium text-left">Upgrade</span>
            <ArrowRightIcon size={20} className="text-[#5f6368]" />
          </button>

          {/* Send feedback */}
          <button className="w-full flex items-center gap-[12px] h-[48px] px-[24px] text-[#202124] hover:bg-[#e8eaed] transition-colors">
            <FeedbackIcon size={20} className="text-[#5f6368]" />
            <span className="flex-1 text-[14px] font-medium text-left">Send feedback</span>
          </button>

          {/* Sign out link */}
          <button
            onClick={() => { onNavigate('auth-signin'); setSidebarOpen(false); }}
            className="w-full flex items-center gap-[12px] h-[48px] px-[24px] text-[#202124] hover:bg-[#e8eaed] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            <span className="flex-1 text-[14px] font-medium text-left">Sign out</span>
          </button>

          {/* Footer links */}
          <div className="px-[24px] py-[16px] text-[12px] text-[#5f6368]">
            <p>© 2025 Google Inc.</p>
            <p className="mt-[4px]">
              <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] hover:underline">Terms of Service</a>
              {' - '}
              <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] hover:underline">Billing terms</a>
              {' - '}
              <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pt-[56px] sm:pt-[64px] lg:ml-[260px] transition-all duration-200">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
