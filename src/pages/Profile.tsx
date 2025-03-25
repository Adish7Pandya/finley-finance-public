
import React from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight">Your Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information and preferences
              </p>
            </div>
            
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <button className="inline-flex items-center justify-center rounded-lg border border-finley-purple text-finley-purple px-3 py-1.5 text-sm font-medium hover:bg-finley-purple-light/20 transition-colors">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 flex justify-center">
                    <div className="h-32 w-32 rounded-full bg-finley-purple-light flex items-center justify-center">
                      <User className="h-16 w-16 text-finley-purple-dark" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                        <p className="font-medium">Jane Doe</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Username</p>
                        <p className="font-medium">janedoe</p>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Email</p>
                          <p className="font-medium">jane.doe@example.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Phone</p>
                          <p className="font-medium">+91 98765 43210</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                          <p className="font-medium">15 Jan 1990</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Location</p>
                          <p className="font-medium">Mumbai, India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle>Financial Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Income Sources</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="font-medium">Primary Income</p>
                          <p className="text-sm text-muted-foreground">Monthly salary</p>
                        </div>
                        <ChipBadge variant="purple">Active</ChipBadge>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-1">₹</span>
                        <span className="text-lg font-semibold">0</span>
                        <span className="text-sm text-muted-foreground ml-1">/month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Financial Goals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4">
                        <p className="font-medium mb-1">Emergency Fund</p>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-muted-foreground">Progress</p>
                          <p className="text-sm">₹0 of ₹100,000</p>
                        </div>
                        <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                          <div className="h-full bg-finley-purple rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-4">
                        <p className="font-medium mb-1">Retirement</p>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-muted-foreground">Progress</p>
                          <p className="text-sm">₹0 of ₹10,000,000</p>
                        </div>
                        <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                          <div className="h-full bg-finley-purple rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Preferred Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      <ChipBadge variant="purple">Shopping</ChipBadge>
                      <ChipBadge variant="purple">Food & Drinks</ChipBadge>
                      <ChipBadge variant="purple">Housing</ChipBadge>
                      <ChipBadge variant="purple">Transportation</ChipBadge>
                      <ChipBadge variant="purple">Entertainment</ChipBadge>
                      <ChipBadge variant="purple">Education</ChipBadge>
                      <ChipBadge variant="purple">Health</ChipBadge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <div className="h-6 w-12 rounded-full bg-finley-neutral-light relative">
                      <div className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white border border-finley-neutral shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                    </div>
                    <div className="h-6 w-12 rounded-full bg-finley-neutral-light relative">
                      <div className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white border border-finley-neutral shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">AI Powered Insights</p>
                      <p className="text-sm text-muted-foreground">Receive personalized financial recommendations</p>
                    </div>
                    <div className="h-6 w-12 rounded-full bg-finley-purple relative">
                      <div className="absolute inset-y-0 right-0 w-6 h-6 rounded-full bg-white border border-finley-neutral shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Analytics</p>
                      <p className="text-sm text-muted-foreground">Allow anonymous data usage for improving services</p>
                    </div>
                    <div className="h-6 w-12 rounded-full bg-finley-neutral-light relative">
                      <div className="absolute inset-y-0 left-0 w-6 h-6 rounded-full bg-white border border-finley-neutral shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
