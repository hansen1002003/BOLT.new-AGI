import React from 'react';
import { BarChart3, MessageSquare, Users, Clock, Brain, Shield, Server, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = [
    { name: 'Total Conversations', value: '128', icon: MessageSquare, color: 'bg-blue-100 text-blue-600' },
    { name: 'Active Users', value: '24', icon: Users, color: 'bg-green-100 text-green-600' },
    { name: 'Avg. Response Time', value: '1.2s', icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Model Version', value: 'GPT-4', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  ];

  // Mock data for charts
  const usageData = [
    { day: 'Mon', queries: 45 },
    { day: 'Tue', queries: 52 },
    { day: 'Wed', queries: 49 },
    { day: 'Thu', queries: 62 },
    { day: 'Fri', queries: 58 },
    { day: 'Sat', queries: 40 },
    { day: 'Sun', queries: 35 },
  ];

  const securityEvents = [
    { time: '09:45 AM', event: 'Failed login attempt', severity: 'Medium' },
    { time: '11:23 AM', event: 'Rate limit reached', severity: 'Low' },
    { time: '02:15 PM', event: 'Unusual query pattern detected', severity: 'High' },
    { time: '04:30 PM', event: 'API key rotation completed', severity: 'Info' },
  ];

  const systemStatus = [
    { name: 'API Gateway', status: 'Operational', icon: Server },
    { name: 'Authentication Service', status: 'Operational', icon: Shield },
    { name: 'AI Model Service', status: 'Operational', icon: Brain },
    { name: 'Database', status: 'Degraded', icon: Server },
    { name: 'Monitoring', status: 'Operational', icon: Activity },
  ];

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'text-green-600';
      case 'Degraded':
        return 'text-yellow-600';
      case 'Down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Helper function to get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Monitor your AI assistant's performance and usage</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Usage Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Weekly Usage</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {usageData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-indigo-500 rounded-t"
                  style={{ height: `${(item.queries / 70) * 100}%` }}
                ></div>
                <div className="text-xs mt-2 text-gray-500">{item.day}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Security Events */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Security Events</h2>
            <Shield className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {securityEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{event.event}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                  {event.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* System Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">System Status</h2>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemStatus.map((system, index) => (
            <div key={index} className="border rounded-lg p-4 flex items-center">
              <div className="p-2 bg-gray-100 rounded-full mr-3">
                <system.icon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{system.name}</p>
                <p className={`text-sm ${getStatusColor(system.status)}`}>{system.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This is a simulated dashboard with mock data for demonstration purposes.</p>
        <p>In a real implementation, this would connect to backend services and display real-time metrics.</p>
      </div>
    </div>
  );
};

export default Dashboard;