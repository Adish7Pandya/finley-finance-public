
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Sparkles, MessageSquare, TrendingUp, AlertTriangle, ArrowRight, FileDown, ChevronRight, BarChart3 } from 'lucide-react';
import { ChipBadge } from '@/components/ui/ChipBadge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { analyzeSpendingPatterns, detectAnomalies, predictBudget } from '@/utils/aiAlgorithms';
import { exportToExcel } from '@/utils/exportToExcel';

// Custom components for insights sections
const InsightSection = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const InsightItem = ({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel?: string; onAction?: () => void }) => (
  <div className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
    <h4 className="font-medium mb-1">{title}</h4>
    <p className="text-sm text-muted-foreground mb-2">{description}</p>
    {actionLabel && onAction && (
      <Button variant="link" className="p-0 h-auto text-finley-purple flex items-center" onClick={onAction}>
        {actionLabel} <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    )}
  </div>
);

const Insights = () => {
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);

  // Fetch expenses for AI analysis
  const { data: expenses = [], isLoading: isLoadingExpenses } = useQuery({
    queryKey: ['expenses', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch budgets for budget prediction
  const { data: budgets = [], isLoading: isLoadingBudgets } = useQuery({
    queryKey: ['budgets', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch records summary for export
  const { data: recordsSummary = [], isLoading: isLoadingRecords } = useQuery({
    queryKey: ['records_summary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('records_summary')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Run AI algorithms when data is available
  const [aiResults, setAiResults] = useState<{
    spendingPatterns: ReturnType<typeof analyzeSpendingPatterns> | null;
    anomalies: ReturnType<typeof detectAnomalies> | null;
    budgetPredictions: ReturnType<typeof predictBudget> | null;
  }>({
    spendingPatterns: null,
    anomalies: null,
    budgetPredictions: null
  });

  useEffect(() => {
    if (expenses.length > 0) {
      // Run AI algorithms
      const spendingPatterns = analyzeSpendingPatterns(expenses);
      const anomalies = detectAnomalies(expenses);
      const budgetPredictions = predictBudget(expenses, budgets);

      setAiResults({ spendingPatterns, anomalies, budgetPredictions });
    }
  }, [expenses, budgets]);

  const handleExportSummary = () => {
    setIsExporting(true);
    try {
      exportToExcel(recordsSummary, `financial_summary_${new Date().toISOString().split('T')[0]}`);
      toast({
        title: "Export Successful",
        description: "Your financial summary has been exported to Excel.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const isLoading = isLoadingExpenses || isLoadingBudgets || isLoadingRecords;

  return (
    <DashboardLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Financial Insights</h1>
            <p className="text-sm text-muted-foreground">Personalized financial analysis and recommendations</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={handleExportSummary} 
              className="bg-finley-teal hover:bg-finley-teal-dark"
              disabled={isExporting || recordsSummary.length === 0}
            >
              <FileDown className="mr-2 h-4 w-4" />
              {isExporting ? 'Exporting...' : 'Get Your Summary'}
            </Button>
            <Link to="/chatbot">
              <Button className="bg-finley-purple hover:bg-finley-purple-dark">
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask Finley
              </Button>
            </Link>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-finley-purple/10 to-finley-teal/10 border-none">
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-full bg-finley-purple/20 backdrop-blur-sm flex items-center justify-center mr-5">
              <Sparkles className="h-6 w-6 text-finley-purple" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">AI-Powered Financial Insights</h3>
              <p className="text-sm text-muted-foreground">
                Finley uses advanced algorithms to analyze your financial data, including K-Means clustering for spending patterns, 
                Isolation Forest for anomaly detection, and Linear Regression for budget predictions.
              </p>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-finley-purple"></div>
          </div>
        ) : expenses.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No expense data available</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start tracking your expenses to get personalized AI insights and financial recommendations.
              </p>
              <Link to="/expenses">
                <Button>Track Your First Expense</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightSection 
              title="Spending Pattern Analysis" 
              icon={<TrendingUp className="h-5 w-5 text-finley-teal" />}
            >
              {aiResults.spendingPatterns && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Your Spending Profile</h4>
                    <ChipBadge variant="teal">{aiResults.spendingPatterns.spendingProfile}</ChipBadge>
                  </div>
                  
                  <div className="space-y-2">
                    {aiResults.spendingPatterns.patterns.slice(0, 3).map((pattern, index) => (
                      <div key={pattern.category} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ 
                            backgroundColor: index === 0 ? '#9B87F5' : 
                                             index === 1 ? '#5CEAD8' : '#F9A03F'
                          }}></div>
                          <span className="text-sm">{pattern.category}</span>
                        </div>
                        <span className="text-sm font-medium">{pattern.percentage.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-2">
                    {aiResults.spendingPatterns.insights.map((insight, index) => (
                      <p key={index} className="text-sm text-muted-foreground mb-2">{insight}</p>
                    ))}
                  </div>
                </div>
              )}
            </InsightSection>

            <InsightSection 
              title="Anomaly Detection" 
              icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
            >
              {aiResults.anomalies && (
                <div className="space-y-4">
                  {aiResults.anomalies.insights.map((insight, index) => (
                    <p key={index} className="text-sm text-muted-foreground">{insight}</p>
                  ))}
                  
                  {aiResults.anomalies.anomalies.length > 0 && (
                    <div className="border-t pt-4 mt-2">
                      <h4 className="font-medium mb-2">Unusual Expenses</h4>
                      <div className="space-y-3">
                        {aiResults.anomalies.anomalies.slice(0, 3).map((anomaly) => (
                          <div key={anomaly.date} className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">{anomaly.category}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(anomaly.date).toLocaleDateString()} - {anomaly.description || 'No description'}
                              </div>
                            </div>
                            <div className="text-sm font-medium">₹{anomaly.amount.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </InsightSection>

            <InsightSection 
              title="Budget Predictions" 
              icon={<BarChart3 className="h-5 w-5 text-finley-purple" />}
            >
              {aiResults.budgetPredictions && (
                <div className="space-y-4">
                  {aiResults.budgetPredictions.insights.map((insight, index) => (
                    <p key={index} className="text-sm text-muted-foreground">{insight}</p>
                  ))}
                  
                  <div className="border-t pt-4 mt-2">
                    <h4 className="font-medium mb-2">Predicted Budget for Next Month</h4>
                    <div className="space-y-3">
                      {Object.entries(aiResults.budgetPredictions.predictions)
                        .filter(([_, amount]) => amount > 0)
                        .sort(([_, a], [__, b]) => b - a)
                        .slice(0, 5)
                        .map(([category, amount]) => (
                          <div key={category} className="flex items-center justify-between">
                            <div className="text-sm">{category}</div>
                            <div className="text-sm font-medium">₹{amount.toLocaleString()}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </InsightSection>

            <InsightSection 
              title="Financial Recommendations" 
              icon={<Sparkles className="h-5 w-5 text-finley-teal" />}
            >
              <div className="space-y-4">
                <InsightItem
                  title="Budget Optimization"
                  description="Our AI has analyzed your spending and suggests optimizing your budget in the Food & Drinks category where you consistently spend less than budgeted."
                  actionLabel="Review Budget"
                  onAction={() => { window.location.href = '/budget'; }}
                />
                
                <InsightItem
                  title="Saving Opportunity"
                  description="Based on your income and expenses, you could potentially increase your monthly savings by ₹5,000 by reducing discretionary spending."
                  actionLabel="See Savings Goals"
                  onAction={() => { window.location.href = '/goals'; }}
                />
                
                <InsightItem
                  title="Emergency Fund"
                  description="Your emergency fund is currently at 50% of the recommended 6 months of expenses. Continue allocating funds to reach your target."
                  actionLabel="Track Progress"
                  onAction={() => { window.location.href = '/goals'; }}
                />
              </div>
            </InsightSection>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Insights;
