'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

type SiteChromeProps = {
  year: number;
  children: React.ReactNode;
};

/**
 * The public site shows the marketing Navbar and Footer; the role portals use
 * their own dashboard chrome instead, and the sign-in page stands alone.
 */
export default function SiteChrome({ year, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith('/dashboard') ?? false;
  const isAuthPage = pathname === '/login';

  if (isPortal || isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer year={year} />
    </>
  );
}
