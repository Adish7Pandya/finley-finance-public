
import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import FinancialOverview from './FinancialOverview';
import ExpenseTracker from './ExpenseTracker';
import BudgetPlanner from './BudgetPlanner';
import SavingsGoals from './SavingsGoals';
import AIInsights from './AIInsights';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container space-y-12">
          <FinancialOverview />
          <ExpenseTracker />
          <BudgetPlanner />
          <SavingsGoals />
          <AIInsights />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;
