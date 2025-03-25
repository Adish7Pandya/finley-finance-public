import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Shield, ArrowRight, CheckCircle, AlertCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';

const EmergencyFund = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000);
  const targetAmount = monthlyExpenses * 6; // 6 months of expenses

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Building Your Emergency Fund</h1>
        <p className="text-muted-foreground">
          Create a financial safety net to protect yourself from unexpected expenses and life events.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-finley-teal" />
            Why You Need an Emergency Fund
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-700 mb-2">Common Emergencies</h3>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Medical expenses</li>
                <li>• Car repairs</li>
                <li>• Home repairs</li>
                <li>• Job loss</li>
                <li>• Family emergencies</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-700 mb-2">Benefits</h3>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Financial security</li>
                <li>• Peace of mind</li>
                <li>• Avoid debt</li>
                <li>• Better decision making</li>
                <li>• Faster recovery from setbacks</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Calculate Your Emergency Fund Target</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Monthly Expenses: ₹{monthlyExpenses.toLocaleString()}
                </label>
                <Slider
                  value={[monthlyExpenses]}
                  onValueChange={(value) => setMonthlyExpenses(value[0])}
                  min={1000}
                  max={50000}
                  step={1000}
                  className="w-full"
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-800">Target Emergency Fund</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      ₹{targetAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-600">
                      (6 months of expenses)
                    </p>
                  </div>
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">How to Build Your Emergency Fund</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Start Small</h4>
                  <p className="text-sm text-muted-foreground">
                    Begin with a goal of ₹10,000 and gradually increase it.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Automate Savings</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up automatic transfers to your emergency fund account.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Cut Non-Essentials</h4>
                  <p className="text-sm text-muted-foreground">
                    Temporarily reduce discretionary spending to boost savings.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Use Windfalls</h4>
                  <p className="text-sm text-muted-foreground">
                    Direct bonuses, tax refunds, or gifts to your emergency fund.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Important Tips</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Keep your emergency fund in a separate, easily accessible account</li>
                  <li>• Only use it for true emergencies</li>
                  <li>• Replenish the fund after using it</li>
                  <li>• Consider high-yield savings accounts for better returns</li>
                  <li>• Review and adjust your target amount annually</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/goals">
              <Button className="w-full md:w-auto">
                Set Up Emergency Fund Goal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyFund; 