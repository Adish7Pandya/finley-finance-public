
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Chatbot = () => {
  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Chat with Finley</h1>
        <p className="text-sm text-muted-foreground mb-8">Your AI financial assistant</p>
        
        {/* Chatbot will be implemented later */}
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground">Chat functionality coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;
