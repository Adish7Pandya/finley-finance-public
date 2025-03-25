import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Calculator, Clock, Target, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const RetirementPlanning = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContribution, setMonthlyContribution] = useState(500);

  const yearsUntilRetirement = retirementAge - currentAge;
  const estimatedSavings = monthlyContribution * 12 * yearsUntilRetirement * 1.07; // Assuming 7% annual return

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">Retirement Planning</h1>
        <p className="text-muted-foreground">
          Plan for a secure and comfortable retirement with our comprehensive guide.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-primary" />
            Retirement Calculator
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Current Age</label>
              <Slider
                value={[currentAge]}
                onValueChange={(value) => setCurrentAge(value[0])}
                min={18}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-center mt-2">{currentAge} years</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Retirement Age</label>
              <Slider
                value={[retirementAge]}
                onValueChange={(value) => setRetirementAge(value[0])}
                min={currentAge + 1}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-center mt-2">{retirementAge} years</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Contribution</label>
              <Slider
                value={[monthlyContribution]}
                onValueChange={(value) => setMonthlyContribution(value[0])}
                min={100}
                max={5000}
                step={100}
                className="w-full"
              />
              <div className="text-center mt-2">${monthlyContribution.toLocaleString()}</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Estimated Retirement Savings</h3>
              <p className="text-2xl font-bold text-primary">
                ${estimatedSavings.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Based on {yearsUntilRetirement} years of contributions with 7% annual return
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-primary" />
            Key Retirement Planning Steps
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold">Start Early</h3>
                <p className="text-muted-foreground">
                  The earlier you start saving, the more time your money has to grow through compound interest.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Maximize Tax-Advantaged Accounts</h3>
                <p className="text-muted-foreground">
                  Take full advantage of 401(k), IRA, and other retirement accounts that offer tax benefits.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold">Diversify Investments</h3>
                <p className="text-muted-foreground">
                  Spread your investments across different asset classes to manage risk and optimize returns.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-semibold">Regular Review</h3>
                <p className="text-muted-foreground">
                  Monitor your retirement plan annually and adjust as needed based on life changes and market conditions.
                </p>
              </div>
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
              <span>Consider inflation when planning your retirement income needs</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Plan for healthcare costs in retirement</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Understand Social Security benefits and when to claim them</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Consider working with a financial advisor for personalized guidance</span>
            </li>
          </ul>
        </Card>

        <div className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/goals">
              Set Up Retirement Goals
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlanning; 