import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import PitchSection from './components/sections/PitchSection';
import SwapPage from './components/pages/swapPage';

function App() {
  const [showSwapPage, setShowSwapPage] = useState(false);

  if (showSwapPage) {
    return <SwapPage onBack={() => setShowSwapPage(false)} />;
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Navbar */}
      <Navbar onLaunchApp={() => setShowSwapPage(true)} />
      
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center">
        <div className="text-center space-y-8 px-4">
          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/40 backdrop-blur-sm border border-blue-500/20 rounded-full text-blue-300 text-sm mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="font-medium">Live on Mainnet • Multi-chain DeFi Protocol</span>
          </div>
          
          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            AI powered bridgeless
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight">
            liquidity unification layer
          </h2>
          
          {/* Description */}
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mt-6">
            InterSwap is an <span className="text-blue-400 font-semibold">AI-first</span>, decentralized, capital efficient, and 
            permissionless liquidity unification protocol for users and 
            businesses to seamlessly move & access liquidity across 
            chains & dApps <span className="text-purple-400 font-semibold">without bridging</span> with near 1-click experience
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => setShowSwapPage(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Launch App 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-slate-700/50 transition-all duration-300">
              📄 Read Whitepaper
            </button>
          </div>
        </div>
      </div>

      
      <PitchSection />
      <SwapPage/>
    </div>
  );
}

export default App;
