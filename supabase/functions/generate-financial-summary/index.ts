import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Get auth user from request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user's data
    const { data: userData, error: userError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token or user not found' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = userData.user.id
    const { year, month } = await req.json()

    // If year and month are provided, generate a summary for that specific period
    if (year && month) {
      const summary = await generateMonthlySummary(supabase, userId, year, month)
      
      return new Response(
        JSON.stringify({ summary }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Otherwise, return all existing summaries
    const { data: summaries, error: summariesError } = await supabase
      .from('records_summary')
      .select('*')
      .eq('user_id', userId)
      .order('year', { ascending: false })
      .order('month', { ascending: false })

    if (summariesError) {
      throw summariesError
    }

    return new Response(
      JSON.stringify({ summaries }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generateMonthlySummary(supabase, userId, year, month) {
  // Get monthly income (using a fixed value for demo purposes)
  const income = 50000 // In a real app, this would come from an incomes table

  // Get monthly expenses
  const startOfMonth = new Date(year, month - 1, 1).toISOString()
  const endOfMonth = new Date(year, month, 0).toISOString()
  
  const { data: expenses, error: expensesError } = await supabase
    .from('expenses')
    .select('amount')
    .eq('user_id', userId)
    .gte('date', startOfMonth)
    .lte('date', endOfMonth)

  if (expensesError) {
    throw expensesError
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => {
    const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount
    return sum + amount
  }, 0)

  // Get budget for this month
  const { data: budgets, error: budgetsError } = await supabase
    .from('budgets')
    .select('amount')
    .eq('user_id', userId)
    .eq('year', year)
    .eq('month', month)

  if (budgetsError) {
    throw budgetsError
  }

  // Calculate total budget
  const totalBudget = budgets.reduce((sum, budget) => {
    const amount = typeof budget.amount === 'string' ? parseFloat(budget.amount) : budget.amount
    return sum + amount
  }, 0)

  // Calculate budget utilization
  const budgetUtilization = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0

  // Calculate savings
  const savings = income - totalExpenses

  // Create or update the summary record
  const { data: existingRecord, error: existingRecordError } = await supabase
    .from('records_summary')
    .select('id')
    .eq('user_id', userId)
    .eq('year', year)
    .eq('month', month)
    .maybeSingle()

  if (existingRecordError) {
    throw existingRecordError
  }

  const summary = {
    user_id: userId,
    year,
    month,
    total_income: income,
    total_expenses: totalExpenses,
    total_savings: savings,
    budget_utilization_percentage: budgetUtilization
  }

  if (existingRecord) {
    // Update existing record
    const { error: updateError } = await supabase
      .from('records_summary')
      .update(summary)
      .eq('id', existingRecord.id)

    if (updateError) {
      throw updateError
    }
  } else {
    // Insert new record
    const { error: insertError } = await supabase
      .from('records_summary')
      .insert([summary])

    if (insertError) {
      throw insertError
    }
  }

  return summary
}
