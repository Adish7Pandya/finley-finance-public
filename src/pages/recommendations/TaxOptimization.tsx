import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Target, TrendingUp, Shield, Receipt } from "lucide-react";
import { Link } from "react-router-dom";

const TaxOptimization = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">Tax Optimization</h1>
        <p className="text-muted-foreground">
          Learn how to optimize your tax strategy and maximize your savings.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-primary" />
            Tax-Saving Strategies
          </h2>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Maximize Tax-Advantaged Accounts</h3>
                  <ul className="mt-2 space-y-2 text-muted-foreground">
                    <li>• Contribute to 401(k) up to employer match</li>
                    <li>• Consider Roth IRA for tax-free growth</li>
                    <li>• Use HSA for healthcare expenses</li>
                    <li>• Take advantage of FSA benefits</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Investment Tax Strategies</h3>
                  <ul className="mt-2 space-y-2 text-muted-foreground">
                    <li>• Hold investments for long-term capital gains</li>
                    <li>• Use tax-loss harvesting</li>
                    <li>• Consider municipal bonds for tax-free income</li>
                    <li>• Manage required minimum distributions</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Deductions and Credits</h3>
                  <ul className="mt-2 space-y-2 text-muted-foreground">
                    <li>• Track charitable contributions</li>
                    <li>• Document business expenses</li>
                    <li>• Claim education credits</li>
                    <li>• Consider energy-efficient home improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Receipt className="w-6 h-6 mr-2 text-primary" />
            Tax Planning Checklist
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span>Review and adjust tax withholding</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span>Maximize retirement account contributions</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span>Organize tax documents and receipts</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span>Consider tax-advantaged investment strategies</span>
            </div>
            <div className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
              <span>Review potential tax credits and deductions</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary" />
            Important Considerations
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Keep detailed records of all tax-related documents</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Consider consulting with a tax professional for complex situations</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Stay informed about tax law changes and updates</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Plan for estimated tax payments if self-employed</span>
            </li>
          </ul>
        </Card>

        <div className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/expenses">
              Track Tax-Deductible Expenses
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaxOptimization; 