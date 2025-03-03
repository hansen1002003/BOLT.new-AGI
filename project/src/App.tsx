import React, { useState } from 'react';
import { Shield, Brain, MessageSquare, BarChart3, LogIn, LogOut, Menu, X } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setActiveTab('chat');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <header className="bg-indigo-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8" />
                <h1 className="text-xl font-bold">AI Assistant</h1>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <span>Welcome, {username}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
              
              <button 
                className="md:hidden text-white"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </header>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-indigo-700 text-white p-4">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => { setActiveTab('chat'); setMobileMenuOpen(false); }}
                  className={`flex items-center space-x-2 p-2 rounded-md ${activeTab === 'chat' ? 'bg-indigo-800' : 'hover:bg-indigo-600'}`}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                  className={`flex items-center space-x-2 p-2 rounded-md ${activeTab === 'dashboard' ? 'bg-indigo-800' : 'hover:bg-indigo-600'}`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <div className="border-t border-indigo-500 my-2 pt-2">
                  <div className="mb-2">Logged in as {username}</div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-indigo-800 hover:bg-indigo-900 p-2 rounded-md w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Main content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
              <nav className="flex flex-col p-4 flex-1">
                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`flex items-center space-x-2 p-3 rounded-md mb-2 ${activeTab === 'chat' ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat</span>
                </button>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-2 p-3 rounded-md ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
              </nav>
            </aside>
            
            {/* Content area */}
            <main className="flex-1 overflow-auto">
              {activeTab === 'chat' && <Chat username={username} />}
              {activeTab === 'dashboard' && <Dashboard />}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;