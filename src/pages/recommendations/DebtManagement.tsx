import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Calculator, Target, TrendingUp, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const DebtManagement = () => {
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const [interestRate, setInterestRate] = useState(15);
  const [debtAmount, setDebtAmount] = useState(10000);

  const calculateMonthsToPayoff = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = Math.log(monthlyPayment / (monthlyPayment - debtAmount * monthlyRate)) / Math.log(1 + monthlyRate);
    return Math.ceil(months);
  };

  const monthsToPayoff = calculateMonthsToPayoff();
  const totalInterest = (monthlyPayment * monthsToPayoff) - debtAmount;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">Debt Management</h1>
        <p className="text-muted-foreground">
          Take control of your debt with our comprehensive debt management guide.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-primary" />
            Debt Payoff Calculator
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Total Debt Amount</label>
              <Slider
                value={[debtAmount]}
                onValueChange={(value) => setDebtAmount(value[0])}
                min={1000}
                max={50000}
                step={1000}
                className="w-full"
              />
              <div className="text-center mt-2">${debtAmount.toLocaleString()}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                min={0}
                max={30}
                step={0.5}
                className="w-full"
              />
              <div className="text-center mt-2">{interestRate}%</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Payment</label>
              <Slider
                value={[monthlyPayment]}
                onValueChange={(value) => setMonthlyPayment(value[0])}
                min={100}
                max={2000}
                step={100}
                className="w-full"
              />
              <div className="text-center mt-2">${monthlyPayment.toLocaleString()}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Payoff Summary</h3>
              <p className="text-2xl font-bold text-primary">
                {monthsToPayoff} months to payoff
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Total interest: ${totalInterest.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-primary" />
            Debt Management Strategies
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold">Snowball Method</h3>
                <p className="text-muted-foreground">
                  Pay off smallest debts first for quick wins and motivation.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Avalanche Method</h3>
                <p className="text-muted-foreground">
                  Focus on highest interest rate debts to minimize total interest paid.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold">Debt Consolidation</h3>
                <p className="text-muted-foreground">
                  Combine multiple debts into a single loan with lower interest rate.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary" />
            Important Tips
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Create a detailed budget to track income and expenses</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Build an emergency fund to avoid new debt</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Consider debt counseling for professional guidance</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Stay committed to your debt payoff plan</span>
            </li>
          </ul>
        </Card>

        <div className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/budget">
              Create Debt Payoff Budget
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DebtManagement; 