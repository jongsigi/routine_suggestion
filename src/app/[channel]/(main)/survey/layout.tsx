// src/app/[channel]/(main)/Layout.tsx
import React from 'react';
import '@/lib/survey_layout.css'; // Ensure the path to your CSS file is correct

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">{children}</div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Layout;
