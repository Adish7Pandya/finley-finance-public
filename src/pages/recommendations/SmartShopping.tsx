import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PiggyBank, ShoppingBag, Clock, TrendingUp, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartShopping = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link to="/insights" className="inline-flex items-center text-sm text-muted-foreground hover:text-finley-purple">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Recommendations
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Smart Shopping Strategies</h1>
          <p className="text-muted-foreground">
            Learn how to maximize your savings through strategic shopping techniques and modern tools.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PiggyBank className="h-5 w-5 text-finley-purple mr-2" />
              Key Strategies
            </CardTitle>
            <CardDescription>
              Essential tips to make your shopping more cost-effective
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-finley-purple/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-4 w-4 text-finley-purple" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Cashback and Rewards Apps</h3>
                  <p className="text-sm text-muted-foreground">
                    Leverage cashback apps and browser extensions to earn money back on your purchases. Popular options include Rakuten, Honey, and Ibotta.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-finley-purple/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-finley-purple" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Strategic Timing</h3>
                  <p className="text-sm text-muted-foreground">
                    Shop during sales seasons and use price tracking tools to ensure you're getting the best deals. Many retailers have predictable sale patterns throughout the year.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-finley-purple/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-finley-purple" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Price Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Use price tracking tools to monitor product prices and get notified when they drop. This helps you avoid paying full price when items go on sale shortly after.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-finley-purple/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-4 w-4 text-finley-purple" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Shopping Lists and Budgets</h3>
                  <p className="text-sm text-muted-foreground">
                    Always shop with a list and stick to your budget. This helps prevent impulse purchases and ensures you're only buying what you need.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full">
                Start Saving Today
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartShopping; 