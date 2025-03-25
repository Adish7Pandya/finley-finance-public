
import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import FinancialOverview from './FinancialOverview';
import ExpenseTracker from './ExpenseTracker';
import BudgetPlanner from './BudgetPlanner';
import SavingsGoals from './SavingsGoals';
import AIInsights from './AIInsights';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // If children are provided, render them instead of the default dashboard components
  const renderContent = () => {
    if (children) {
      return children;
    }
    
    return (
      <div className="container space-y-12">
        <FinancialOverview />
        <ExpenseTracker />
        <BudgetPlanner />
        <SavingsGoals />
        <AIInsights />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;
