import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { TrendingUp, ArrowRight, CheckCircle, AlertCircle, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const InvestmentBasics = () => {
  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Investment Basics</h1>
        <p className="text-muted-foreground">
          Learn the fundamentals of investing and start building your investment portfolio for long-term growth.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-finley-teal" />
            Understanding Investment Basics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-700 mb-2">Key Investment Types</h3>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Stocks (Equities)</li>
                <li>• Bonds</li>
                <li>• Mutual Funds</li>
                <li>• Exchange-Traded Funds (ETFs)</li>
                <li>• Real Estate</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-700 mb-2">Investment Principles</h3>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Diversification</li>
                <li>• Risk Management</li>
                <li>• Long-term Focus</li>
                <li>• Regular Investing</li>
                <li>• Asset Allocation</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Risk vs. Return</h3>
            <div className="relative h-40 bg-gray-100 rounded-lg p-4">
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-green-500 to-red-500 opacity-20 rounded-b-lg"></div>
              <div className="relative z-10 flex justify-between items-end h-full">
                <div className="text-center">
                  <div className="h-8 w-8 bg-green-500 rounded-full mb-2"></div>
                  <p className="text-xs font-medium">Low Risk</p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-8 bg-yellow-500 rounded-full mb-2"></div>
                  <p className="text-xs font-medium">Medium Risk</p>
                </div>
                <div className="text-center">
                  <div className="h-24 w-8 bg-red-500 rounded-full mb-2"></div>
                  <p className="text-xs font-medium">High Risk</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Higher potential returns typically come with higher risks
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Getting Started</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Set Clear Goals</h4>
                  <p className="text-sm text-muted-foreground">
                    Define your investment objectives and time horizon.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Start with Index Funds</h4>
                  <p className="text-sm text-muted-foreground">
                    Begin with low-cost, diversified index funds or ETFs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Dollar-Cost Averaging</h4>
                  <p className="text-sm text-muted-foreground">
                    Invest regularly regardless of market conditions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Stay Informed</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep learning about investment strategies and market trends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Important Considerations</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Never invest money you can't afford to lose</li>
                  <li>• Diversify your portfolio across different asset classes</li>
                  <li>• Consider your risk tolerance before investing</li>
                  <li>• Be prepared for market volatility</li>
                  <li>• Keep investment costs low</li>
                  <li>• Don't try to time the market</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/investments">
              <Button className="w-full md:w-auto">
                Start Investing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentBasics; 