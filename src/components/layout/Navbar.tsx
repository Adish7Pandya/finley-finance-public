import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MessageSquare, ChevronDown, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-finley-purple flex items-center justify-center">
              <span className="font-semibold text-white">F</span>
            </div>
            <span className="font-medium text-xl text-finley-neutral-darkest">Finley</span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-finley-purple">
              Dashboard
            </Link>
            <Link to="/expenses" className="text-muted-foreground transition-colors hover:text-finley-purple">
              Expenses
            </Link>
            <Link to="/budget" className="text-muted-foreground transition-colors hover:text-finley-purple">
              Budget
            </Link>
            <Link to="/goals" className="text-muted-foreground transition-colors hover:text-finley-purple">
              Goals
            </Link>
            <Link to="/insights" className="text-muted-foreground transition-colors hover:text-finley-purple">
              AI Insights
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/chatbot" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-finley-neutral-light hover:text-finley-neutral-darkest">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Chat with Finley</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="flex items-center space-x-2 rounded-full py-1.5 px-2 text-sm transition-colors hover:bg-finley-neutral-light">
                  <div className="h-7 w-7 rounded-full bg-finley-purple-light flex items-center justify-center">
                    <User className="h-4 w-4 text-finley-purple-dark" />
                  </div>
                  <span className="hidden text-sm font-medium md:inline-block">
                    Profile
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>View Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-finley-neutral-dark hover:bg-finley-neutral-light hover:text-finley-neutral-darkest transition-colors md:hidden"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-16 z-50 h-[calc(100vh-4rem)] w-full overflow-y-auto bg-background md:hidden",
        isMenuOpen ? "animate-fade-in" : "hidden"
      )}>
        <div className="container py-6 space-y-4">
          <nav className="flex flex-col space-y-4 text-base font-medium">
            <Link 
              to="/" 
              className="rounded-md py-2 hover:bg-finley-neutral-light"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/expenses" 
              className="rounded-md py-2 text-muted-foreground hover:bg-finley-neutral-light hover:text-finley-neutral-darkest"
              onClick={() => setIsMenuOpen(false)}
            >
              Expenses
            </Link>
            <Link 
              to="/budget" 
              className="rounded-md py-2 text-muted-foreground hover:bg-finley-neutral-light hover:text-finley-neutral-darkest"
              onClick={() => setIsMenuOpen(false)}
            >
              Budget
            </Link>
            <Link 
              to="/goals" 
              className="rounded-md py-2 text-muted-foreground hover:bg-finley-neutral-light hover:text-finley-neutral-darkest"
              onClick={() => setIsMenuOpen(false)}
            >
              Goals
            </Link>
            <Link 
              to="/insights" 
              className="rounded-md py-2 text-muted-foreground hover:bg-finley-neutral-light hover:text-finley-neutral-darkest"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Insights
            </Link>
            <Link 
              to="/chatbot" 
              className="rounded-md py-2 text-muted-foreground hover:bg-finley-neutral-light hover:text-finley-neutral-darkest"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat with Finley
            </Link>
          </nav>
          
          <div className="border-t border-border pt-4">
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 rounded-md py-2 hover:bg-finley-neutral-light"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="h-7 w-7 rounded-full bg-finley-purple-light flex items-center justify-center">
                <User className="h-4 w-4 text-finley-purple-dark" />
              </div>
              <span className="text-sm font-medium">Profile</span>
            </Link>
            <button
              onClick={() => {
                handleSignOut();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 rounded-md py-2 text-red-600 hover:bg-finley-neutral-light w-full"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
