import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Target, TrendingUp, PiggyBank, Shield, Coins, Wallet, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';

const getDifficultyColor = (level: string) => {
  switch(level.toLowerCase()) {
    case 'beginner':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'intermediate':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'advanced':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'priority':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'quick win':
      return 'bg-teal-100 text-teal-700 border-teal-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getDifficultyIcon = (level: string) => {
  switch(level.toLowerCase()) {
    case 'beginner':
      return <Target className="h-4 w-4" />;
    case 'intermediate':
      return <TrendingUp className="h-4 w-4" />;
    case 'advanced':
      return <Calculator className="h-4 w-4" />;
    case 'priority':
      return <Shield className="h-4 w-4" />;
    case 'quick win':
      return <Clock className="h-4 w-4" />;
    default:
      return <Star className="h-4 w-4" />;
  }
};

const RecommendationCard = ({ 
  title, 
  description, 
  difficulty, 
  icon, 
  link,
  estimatedTime
}: { 
  title: string;
  description: string;
  difficulty: string;
  icon: React.ReactNode;
  link: string;
  estimatedTime: string;
}) => (
  <Link to={link} className="block">
    <Card className="hover:shadow-lg transition-all duration-200 hover:border-finley-purple">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="h-10 w-10 rounded-full bg-finley-purple/10 flex items-center justify-center">
            {icon}
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {getDifficultyIcon(difficulty)}
            <span>{difficulty}</span>
          </div>
        </div>
        <h4 className="font-medium mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{estimatedTime}</span>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const AIInsights = () => {
  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Recommended for You</h2>
          <p className="text-sm text-muted-foreground">Personalized financial tips and strategies</p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 text-finley-teal mr-2" />
            <span>Financial Recommendations</span>
          </CardTitle>
          <CardDescription>
            Personalized tips based on your financial profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <RecommendationCard
              title="50/30/20 Budgeting Rule"
              description="A simple and effective way to manage your money by allocating 50% to needs, 30% to wants, and 20% to savings."
              difficulty="Beginner"
              icon={<Wallet className="h-5 w-5 text-finley-purple" />}
              link="/recommendations/budgeting-rule"
              estimatedTime="15 min read"
            />

            <RecommendationCard
              title="Smart Shopping Strategies"
              description="Learn how to maximize your savings through cashback apps, price tracking, and strategic shopping timing."
              difficulty="Quick Win"
              icon={<PiggyBank className="h-5 w-5 text-finley-purple" />}
              link="/recommendations/smart-shopping"
              estimatedTime="10 min read"
            />

            <RecommendationCard
              title="Subscription Review"
              description="Identify and cancel unused subscriptions to save money without impacting your lifestyle."
              difficulty="Quick Win"
              icon={<Calculator className="h-5 w-5 text-finley-purple" />}
              link="/recommendations/subscription-review"
              estimatedTime="5 min read"
            />

            <RecommendationCard
              title="Emergency Fund"
              description="Build a safety net with 3-6 months of expenses to protect yourself from unexpected financial challenges."
              difficulty="Priority"
              icon={<Shield className="h-5 w-5 text-finley-purple" />}
              link="/recommendations/emergency-fund"
              estimatedTime="20 min read"
            />

            <RecommendationCard
              title="Investment Basics"
              description="Learn fundamental investment strategies to start building your portfolio for long-term growth."
              difficulty="Intermediate"
              icon={<TrendingUp className="h-5 w-5 text-finley-purple" />}
              link="/recommendations/investment-basics"
              estimatedTime="25 min read"
            />

            <RecommendationCard
              title="Debt Management"
              description="Master the debt snowball or avalanche method to efficiently eliminate your debts."
              difficulty="Intermediate"
              icon={<Coins className="h-5 w-5 text-finley-purple" />}
              link="/recommendations/debt-management"
              estimatedTime="20 min read"
            />

            <RecommendationCard
              title="Retirement Planning"
              description="Plan for your future by understanding retirement accounts and calculating your needs."
              difficulty="Advanced"
              icon={<Target className="h-5 w-5 text-finley-purple" />}
              link="/recommendations/retirement-planning"
              estimatedTime="30 min read"
            />

            <RecommendationCard
              title="Tax Optimization"
              description="Maximize your after-tax returns through strategic investment and deduction planning."
              difficulty="Advanced"
              icon={<Calculator className="h-5 w-5 text-finley-purple" />}
              link="/recommendations/tax-optimization"
              estimatedTime="25 min read"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
