import React, { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { SubscriptionsListPage } from './pages/SubscriptionsListPage';
import { SubscriptionDetailPage } from './pages/SubscriptionDetailPage';
import { PaymentAccountsPage } from './pages/PaymentAccountsPage';
import { PaymentAccountDetailPage } from './pages/PaymentAccountDetailPage';
import { PaymentMethodPage } from './pages/PaymentMethodPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { BuyOrUpgradePage } from './pages/BuyOrUpgradePage';
import { SignInPage } from './pages/auth/SignInPage';
import { PasswordPage } from './pages/auth/PasswordPage';
import { LoadingTransitionPage } from './pages/auth/LoadingTransitionPage';
import { UserProvider } from './context/UserContext';

type PageType =
  | 'subscriptions'
  | 'subscription-detail'
  | 'payment-accounts'
  | 'payment-account-detail'
  | 'payment-method'
  | 'transactions'
  | 'buy-or-upgrade'
  | 'auth-signin'
  | 'auth-password'
  | 'loading-transition';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('auth-signin');
  const [pendingEmail, setPendingEmail] = useState<string>('');

  const handleNavigate = (page: string, data?: { email?: string }) => {
    if (data?.email) {
      setPendingEmail(data.email);
    }
    setCurrentPage(page as PageType);
  };

  const getActiveSubPage = (): string => {
    switch (currentPage) {
      case 'subscriptions':
      case 'subscription-detail':
        return 'subscriptions';
      case 'payment-accounts':
      case 'payment-account-detail':
      case 'payment-method':
      case 'transactions':
        return 'payment-accounts';
      case 'buy-or-upgrade':
        return 'buy-or-upgrade';
      default:
        return 'subscriptions';
    }
  };

  // Check if current page is an auth page (no admin layout)
  const isAuthPage = currentPage.startsWith('auth-') || currentPage === 'loading-transition';

  const renderPage = () => {
    switch (currentPage) {
      case 'subscriptions':
        return <SubscriptionsListPage onNavigate={handleNavigate} />;
      case 'subscription-detail':
        return <SubscriptionDetailPage onNavigate={handleNavigate} />;
      case 'payment-accounts':
        return <PaymentAccountsPage onNavigate={handleNavigate} />;
      case 'payment-account-detail':
        return <PaymentAccountDetailPage onNavigate={handleNavigate} />;
      case 'payment-method':
        return <PaymentMethodPage onNavigate={handleNavigate} />;
      case 'transactions':
        return <TransactionsPage onNavigate={handleNavigate} />;
      case 'buy-or-upgrade':
        return <BuyOrUpgradePage onNavigate={handleNavigate} />;
      case 'auth-signin':
        return <SignInPage onNavigate={handleNavigate} />;
      case 'auth-password':
        return <PasswordPage onNavigate={handleNavigate} email={pendingEmail} />;
      case 'loading-transition':
        return <LoadingTransitionPage onNavigate={handleNavigate} email={pendingEmail} />;
      default:
        return <SubscriptionsListPage onNavigate={handleNavigate} />;
    }
  };

  // Auth pages render without the admin layout
  if (isAuthPage) {
    return (
      <div className="font-['Google_Sans',_'Roboto',_-apple-system,_BlinkMacSystemFont,_'Segoe_UI',_sans-serif]">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="font-['Google_Sans',_'Roboto',_-apple-system,_BlinkMacSystemFont,_'Segoe_UI',_sans-serif]">
      <AdminLayout activeSubPage={getActiveSubPage()} onNavigate={handleNavigate}>
        {renderPage()}
      </AdminLayout>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
