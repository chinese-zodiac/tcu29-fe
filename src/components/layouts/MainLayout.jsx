import React from 'react';
import Header from './Header';
import Faq from './Faq';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="tempestas-main">{children}</main>

      <Faq />
      <Footer />
    </>
  );
}
