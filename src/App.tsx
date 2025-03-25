import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Goals from "./pages/Goals";
import Insights from "./pages/Insights";
import Chatbot from "./pages/Chatbot";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import BudgetingRule from "./pages/recommendations/BudgetingRule";
import EmergencyFund from "./pages/recommendations/EmergencyFund";
import InvestmentBasics from "./pages/recommendations/InvestmentBasics";
import RetirementPlanning from "./pages/recommendations/RetirementPlanning";
import TaxOptimization from "./pages/recommendations/TaxOptimization";
import DebtManagement from "./pages/recommendations/DebtManagement";
import SubscriptionReview from "./pages/recommendations/SubscriptionReview";
import SmartShopping from "./pages/recommendations/SmartShopping";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/expenses" element={
                  <ProtectedRoute>
                    <Expenses />
                  </ProtectedRoute>
                } />
                <Route path="/budget" element={
                  <ProtectedRoute>
                    <Budget />
                  </ProtectedRoute>
                } />
                <Route path="/goals" element={
                  <ProtectedRoute>
                    <Goals />
                  </ProtectedRoute>
                } />
                <Route path="/insights" element={
                  <ProtectedRoute>
                    <Insights />
                  </ProtectedRoute>
                } />
                <Route path="/chatbot" element={
                  <ProtectedRoute>
                    <Chatbot />
                  </ProtectedRoute>
                } />
                {/* Recommendation Routes */}
                <Route path="/recommendations/budgeting-rule" element={
                  <ProtectedRoute>
                    <BudgetingRule />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations/emergency-fund" element={
                  <ProtectedRoute>
                    <EmergencyFund />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations/investment-basics" element={
                  <ProtectedRoute>
                    <InvestmentBasics />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations/retirement-planning" element={
                  <ProtectedRoute>
                    <RetirementPlanning />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations/tax-optimization" element={
                  <ProtectedRoute>
                    <TaxOptimization />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations/debt-management" element={
                  <ProtectedRoute>
                    <DebtManagement />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations/subscription-review" element={
                  <ProtectedRoute>
                    <SubscriptionReview />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations/smart-shopping" element={
                  <ProtectedRoute>
                    <SmartShopping />
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
