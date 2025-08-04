import React from 'react';

const ChainIcon = ({ chain, size = 'md', className = '' }) => {
  const chainData = {
    ethereum: {
      name: 'Ethereum',
      symbol: 'ETH',
      gradient: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-500',
      iconUrl: '/assets/chain-icons/ethereum.png'
    },
    bitcoin: {
      name: 'Bitcoin',
      symbol: 'BTC', 
      gradient: 'from-orange-400 to-yellow-500',
      bgColor: 'bg-orange-500',
      iconUrl: '/assets/chain-icons/bitcoin.png'
    },
    solana: {
      name: 'Solana',
      symbol: 'SOL',
      gradient: 'from-purple-300 to-pink-250',
      bgColor: 'bg-purple-500',
      iconUrl: '/assets/chain-icons/solana.png'
    },
    polygon: {
      name: 'Polygon',
      symbol: 'MATIC',
      gradient: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-600',
      iconUrl: '/assets/chain-icons/polygon.png'
    },
    avalanche: {
      name: 'Avalanche',
      symbol: 'AVAX',
      gradient: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-500',
      iconUrl: '/assets/chain-icons/avalanche.png'
    },
    arbitrum: {
      name: 'Arbitrum',
      symbol: 'ARB',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-600',
      iconUrl: '/assets/chain-icons/arbitrum.png'
    },
    optimism: {
      name: 'Optimism',
      symbol: 'OP',
      gradient: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-600',
      iconUrl: '/assets/chain-icons/optimism.png'
    },
    bsc: {
      name: 'BNB Chain',
      symbol: 'BNB',
      gradient: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-500',
      iconUrl: '/assets/chain-icons/bnb.png'
    }
  };

  const sizes = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12', 
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const data = chainData[chain] || chainData.ethereum;

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="relative group">
        {/* Background with gradient */}
        <div className={`w-full h-full bg-gradient-to-br ${data.gradient} rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300 scale-110`}></div>
          
          {/* Icon container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-3">
            <img
              src={data.iconUrl}
              alt={`${data.name} logo`}
              className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                // Fallback to symbol if image fails
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Fallback symbol */}
            <div className="hidden w-full h-full items-center justify-center text-white font-bold">
              {data.symbol}
            </div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ChainIcon;
