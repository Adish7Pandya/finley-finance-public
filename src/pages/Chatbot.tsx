import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Chatbot = () => {
  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-semibold tracking-tight">Chat with Finley</h1>
        <p className="text-sm text-muted-foreground mb-8">Your AI financial assistant</p>
        
        <div className="flex items-center justify-center">
          <iframe 
            src="https://cloud.epsilla.com/chatbot/2558ff2c-85ea-4812-869c-d847cd0d1ddd-348541996/05a640b3-8840-45e8-b32a-9a9efd56e919?mode=embed" 
            width="900px" 
            height="600px" 
            style={{ border: 'none' }}
            title="Finley AI Chatbot"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;
