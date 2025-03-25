import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Target, TrendingUp, Shield, CreditCard, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const SubscriptionReview = () => {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: "Netflix", amount: 15.99, frequency: "monthly", category: "Entertainment" },
    { id: 2, name: "Spotify", amount: 9.99, frequency: "monthly", category: "Entertainment" },
    { id: 3, name: "Gym Membership", amount: 29.99, frequency: "monthly", category: "Health" },
    { id: 4, name: "Amazon Prime", amount: 14.99, frequency: "monthly", category: "Shopping" },
  ]);

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const totalYearly = totalMonthly * 12;

  const removeSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-2">Subscription Review</h1>
        <p className="text-muted-foreground">
          Track and optimize your subscription expenses.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="w-6 h-6 mr-2 text-primary" />
            Subscription Overview
          </h2>
          <div className="grid gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Monthly Total</h3>
                  <p className="text-2xl font-bold text-primary">
                    ${totalMonthly.toFixed(2)}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Yearly Total</h3>
                  <p className="text-2xl font-bold text-primary">
                    ${totalYearly.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{sub.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${sub.amount.toFixed(2)} / {sub.frequency} • {sub.category}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSubscription(sub.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-primary" />
            Optimization Tips
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold">Bundle Services</h3>
                <p className="text-muted-foreground">
                  Look for bundle deals that combine multiple services at a discount.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Annual Plans</h3>
                <p className="text-muted-foreground">
                  Consider annual subscriptions for better rates and fewer transactions.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold">Family Plans</h3>
                <p className="text-muted-foreground">
                  Share subscription costs with family members when possible.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary" />
            Best Practices
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Review subscriptions quarterly to identify unused services</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Set up subscription tracking in your budget</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Use a dedicated card for subscriptions to track spending</span>
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
              <span>Enable notifications for subscription renewals</span>
            </li>
          </ul>
        </Card>

        <div className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/expenses">
              Track Subscription Expenses
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionReview; 