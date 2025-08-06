import React, { useState } from 'react';
import Button from '../ui/Button';
import ChainIcon from '../ui/ChainIcon';

const SwapPage = ({ onBack }) => {
  const [fromToken, setFromToken] = useState('ethereum');
  const [toToken, setToToken] = useState('solana');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const tokens = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', balance: '2.45' },
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', balance: '0.1234' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', balance: '45.67' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', balance: '1,250.00' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', balance: '12.89' },
    { id: 'bsc', name: 'BNB Chain', symbol: 'BNB', balance: '3.45' }
  ];

  const slippageOptions = ['0.1', '0.5', '1.0', '2.0'];

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsConnected(true);
    setWalletAddress('0x742d...4f6a');
  };

  const handleSwap = () => {
    if (!fromAmount || !isConnected) return;
    // Simulate swap logic
    alert(`Swapping ${fromAmount} ${tokens.find(t => t.id === fromToken)?.symbol} to ${tokens.find(t => t.id === toToken)?.symbol}`);
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-2">InterSwap</h1>
          <p className="text-slate-400">AI-powered cross-chain swaps</p>
        </div>

        {/* Main Swap Card */}
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
          
          {/* Main card */}
          <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-6 shadow-2xl">
            
            {/* Wallet Connection */}
            <div className="mb-6">
              {!isConnected ? (
                <Button
                  onClick={handleConnectWallet}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Connect Wallet
                </Button>
              ) : (
                <div className="flex items-center justify-between bg-slate-700/50 rounded-xl p-3 border border-slate-600/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Connected</div>
                      <div className="text-slate-400 text-sm">{walletAddress}</div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* From Token */}
            <div className="mb-4">
              <label className="block text-slate-300 text-sm font-medium mb-2">From</label>
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <select
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    className="bg-transparent text-white font-semibold text-lg outline-none appearance-none cursor-pointer"
                  >
                    {tokens.map(token => (
                      <option key={token.id} value={token.id} className="bg-slate-800">
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                  <ChainIcon chain={fromToken} size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="bg-transparent text-white text-2xl font-bold outline-none placeholder-slate-500 w-full"
                  />
                  <div className="text-slate-400 text-sm">
                    Balance: {tokens.find(t => t.id === fromToken)?.balance}
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center my-4">
              <button
                onClick={swapTokens}
                className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl transition-colors border border-slate-600/50"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* To Token */}
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2">To</label>
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <select
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    className="bg-transparent text-white font-semibold text-lg outline-none appearance-none cursor-pointer"
                  >
                    {tokens.map(token => (
                      <option key={token.id} value={token.id} className="bg-slate-800">
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                  <ChainIcon chain={toToken} size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-slate-400 text-2xl font-bold">
                    {fromAmount ? (parseFloat(fromAmount) * 0.98).toFixed(4) : '0.0'}
                  </div>
                  <div className="text-slate-400 text-sm">
                    Balance: {tokens.find(t => t.id === toToken)?.balance}
                  </div>
                </div>
              </div>
            </div>

            {/* Slippage Settings */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-slate-300 text-sm font-medium">Slippage Tolerance</label>
                <div className="text-slate-400 text-sm">{slippage}%</div>
              </div>
              <div className="flex gap-2">
                {slippageOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setSlippage(option)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      slippage === option
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {option}%
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Information */}
            {fromAmount && (
              <div className="mb-6 bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Exchange Rate</span>
                    <span>1 {tokens.find(t => t.id === fromToken)?.symbol} = 0.98 {tokens.find(t => t.id === toToken)?.symbol}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Network Fee</span>
                    <span>~$2.50</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Route</span>
                    <span className="text-blue-400">AI Optimized</span>
                  </div>
                </div>
              </div>
            )}

            {/* Swap Button */}
            <Button
              onClick={handleSwap}
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!isConnected || !fromAmount}
            >
              {!isConnected ? 'Connect Wallet to Swap' : 'Swap Tokens'}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm">
            Powered by AI routing • Bridgeless swaps across 12+ chains
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
