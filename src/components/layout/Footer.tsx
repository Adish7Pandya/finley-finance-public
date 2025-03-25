
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-finley-neutral-lightest py-10 md:py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-finley-purple flex items-center justify-center">
                <span className="font-semibold text-white">F</span>
              </div>
              <span className="font-medium text-xl text-finley-neutral-darkest">Finley</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered financial management designed specifically for women.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Features</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/expenses" className="text-muted-foreground transition-colors hover:text-finley-purple">
                    Expense Tracking
                  </Link>
                </li>
                <li>
                  <Link to="/budget" className="text-muted-foreground transition-colors hover:text-finley-purple">
                    Budget Planning
                  </Link>
                </li>
                <li>
                  <Link to="/goals" className="text-muted-foreground transition-colors hover:text-finley-purple">
                    Savings Goals
                  </Link>
                </li>
                <li>
                  <Link to="/insights" className="text-muted-foreground transition-colors hover:text-finley-purple">
                    AI Financial Insights
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/about" className="text-muted-foreground transition-colors hover:text-finley-purple">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-finley-purple">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground transition-colors hover:text-finley-purple">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground transition-colors hover:text-finley-purple">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Finley. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
