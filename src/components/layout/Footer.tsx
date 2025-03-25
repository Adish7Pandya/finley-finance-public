
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-finley-neutral-lightest py-6">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-finley-purple flex items-center justify-center">
              <span className="font-semibold text-white">F</span>
            </div>
            <span className="font-medium text-xl text-finley-neutral-darkest">Finley</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mb-4">
            AI-powered financial management designed specifically for women.
          </p>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Finley. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
