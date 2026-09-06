import Header from '@/src/shared/components/header';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-100 dark:bg-burgundy-950">
        {children}
      </main>
    </>
  );
};

export default layout;
