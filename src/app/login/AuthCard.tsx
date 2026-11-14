'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AuthTabs, { type AuthTabId } from './AuthTabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import DemoAccounts from './DemoAccounts';

type AuthCardProps = {
  showDemo?: boolean;
};

/**
 * The sign-in / register card. Both tabs live on this page and switch without
 * a reload; the demo-account cards below the card fill the login form when enabled.
 */
export default function AuthCard({ showDemo = false }: AuthCardProps) {
  const [activeTab, setActiveTab] = useState<AuthTabId>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setActiveTab('login');
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <AuthTabs active={activeTab} onChange={setActiveTab} />

        <div
          role="tabpanel"
          id="login-panel"
          aria-labelledby="login-tab"
          hidden={activeTab !== 'login'}
        >
          <LoginForm
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
          />
        </div>

        <div
          role="tabpanel"
          id="register-panel"
          aria-labelledby="register-tab"
          hidden={activeTab !== 'register'}
        >
          <RegisterForm onBackToLogin={() => setActiveTab('login')} />
        </div>
      </div>

      {showDemo && <DemoAccounts onFill={fillDemo} />}

      <Link
        href="/"
        className="mt-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-navy"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Homepage
      </Link>
    </div>
  );
}
