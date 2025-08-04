import React from 'react';
import ChainIcon from '../ui/ChainIcon';
import Button from '../ui/Button';
import Beams from '../ui/Beams';

const PitchSection = () => {
  const supportedChains = [
    'ethereum',
    'bitcoin', 
    'solana',
    'polygon',
    'avalanche',
    'arbitrum',
    'optimism',
    'bsc'
  ];

  const stats = [
    {
      value: '12+',
      label: 'Supported Chains',
      description: 'Multi-chain compatibility',
      icon: '🔗'
    },
    {
      value: '$2.3M+',
      label: 'Total Value Locked',
      description: 'Growing liquidity pool',
      icon: '💰'
    },
    {
      value: '99.9%',
      label: 'Uptime',
      description: 'Reliable infrastructure',
      icon: '⚡'
    },
    {
      value: '<30s',
      label: 'Average Swap Time',
      description: 'Lightning fast execution',
      icon: '⏱️'
    }
  ];

  return (
    <section className="relative min-h-[120vh] py-24 overflow-hidden">
      {/* 3D Beams Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <Beams
          beamWidth={1.5}
          beamHeight={20}
          beamNumber={16}
          lightColor="#3b82f6"
          speed={1.5}
          noiseIntensity={2}
          scale={0.15}
          rotation={15}
        />
      </div>
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-sm mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Supported Networks
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Unify liquidity across
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              all major chains
            </span>
          </h2>
          
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Connect to the world's largest DeFi ecosystems without the complexity of bridging. 
            One interface, unlimited possibilities.
          </p>
        </div>

        {/* Supported Chains Grid */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            {supportedChains.map((chain, index) => (
              <div 
                key={chain}
                className="transform hover:scale-110 transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <ChainIcon chain={chain} size="lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement - FIXED VERSION */}
        <div className="relative mb-16">
          {/* Glow behind the card */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              rounded-3xl
              bg-gradient-to-r from-blue-600/40 to-purple-600/40
              blur-xl
            "
          />

          {/* Main card with overflow-hidden to prevent text ghosting */}
          <div className="
            relative z-10
            bg-slate-800/80 backdrop-blur-xl
            border border-slate-600/50
            rounded-3xl
            overflow-hidden
            p-8 md:p-12 shadow-2xl
          ">
            <div className="text-center space-y-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Our Mission
              </h3>

              <p className="text-xl md:text-2xl text-slate-200 leading-relaxed max-w-4xl mx-auto">
                <span className="text-blue-300 font-semibold">
                  "Unify liquidity across chains without bridging"
                </span>
                <br /><br />
                We're building the future of DeFi where users can access liquidity from
                any blockchain through a single, AI-powered interface. No more complex
                bridging, no more fragmented liquidity pools.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" size="lg">
                  Learn More →
                </Button>
                <Button variant="outline" size="lg">
                  📄 Technical Docs
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid - FIXED VERSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              {/* Glow behind the card */}
              <div 
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0 
                  bg-gradient-to-r from-blue-600/30 to-purple-600/30 
                  rounded-2xl blur-lg 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300
                "
              />
              
              {/* Main stat card */}
              <div className="
                relative z-10
                bg-slate-800/70 backdrop-blur-xl 
                border border-slate-600/50 
                rounded-2xl 
                overflow-hidden
                p-6 text-center 
                hover:scale-105 transition-all duration-300 
                shadow-xl
              ">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-slate-300 text-sm">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action - FIXED VERSION */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            {/* Glow behind the badge */}
            <div 
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-r from-slate-700/50 to-slate-600/50
                rounded-full blur-lg
              "
            />
            
            {/* Main badge */}
            <div className="
              relative z-10
              inline-flex items-center space-x-4 
              bg-slate-800/60 backdrop-blur-xl 
              border border-slate-600/50 
              rounded-full 
              overflow-hidden
              px-8 py-4 shadow-2xl
            ">
              <span className="text-slate-300 text-sm">Built with support from</span>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>
                  <span className="font-bold text-blue-300 text-sm">AXELAR</span>
                </div>
                <span className="text-slate-500">•</span>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg"></div>
                  <span className="font-bold text-purple-300 text-sm">GOOGLE CLOUD</span>
                </div>
                <span className="text-slate-500">•</span>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg"></div>
                  <span className="font-bold text-orange-300 text-sm">OKX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PitchSection;
