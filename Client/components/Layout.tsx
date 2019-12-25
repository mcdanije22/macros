import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
}

const Layout: React.FC<Props> = ({ children, title = 'Macros' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
