import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import ChainIcon from '../ui/ChainIcon';
import Beams from '../ui/Beams';

const SwapPage = ({ onBack }) => {
  const [fromToken, setFromToken] = useState('ethereum');
  const [toToken, setToToken] = useState('solana');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [fullWalletAddress, setFullWalletAddress] = useState('');
  const [isMainnet, setIsMainnet] = useState(true);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState('');
  const [tokenBalances, setTokenBalances] = useState({});
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);

  // Token contract addresses (these are examples - replace with actual contract addresses)
  const tokenContracts = {
    ethereum: {
      mainnet: 'native', // ETH is native, no contract address needed
      testnet: 'native'
    },
    bitcoin: {
      mainnet: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC on Ethereum
      testnet: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' // Example testnet address
    },
    solana: {
      mainnet: '0x570A5D26f7765Ecb712C0924E4De545B89fD43dF', // Example wrapped SOL
      testnet: '0x570A5D26f7765Ecb712C0924E4De545B89fD43dF'
    },
    polygon: {
      mainnet: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', // MATIC on Ethereum
      testnet: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
    },
    avalanche: {
      mainnet: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9', // AVAX wrapped
      testnet: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9'
    },
    bsc: {
      mainnet: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52', // BNB
      testnet: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
    },
    arbitrum: {
      mainnet: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1', // ARB token
      testnet: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1'
    },
    optimism: {
      mainnet: '0x4200000000000000000000000000000000000042', // OP token
      testnet: '0x4200000000000000000000000000000000000042'
    }
  };

  const tokens = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'WBTC', decimals: 8 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', decimals: 9 },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', decimals: 18 },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
    { id: 'bsc', name: 'BNB Chain', symbol: 'BNB', decimals: 18 },
    { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', decimals: 18 },
    { id: 'optimism', name: 'Optimism', symbol: 'OP', decimals: 18 }
  ];

  const slippageOptions = ['0.1', '0.5', '1.0', '2.0'];

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Fetch balances when wallet connects or network changes
  useEffect(() => {
    if (isConnected && fullWalletAddress) {
      fetchTokenBalances();
    }
  }, [isConnected, fullWalletAddress, isMainnet]);

  const checkWalletConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setFullWalletAddress(accounts[0]);
          setWalletAddress(`${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const fetchTokenBalances = async () => {
    if (!fullWalletAddress || !window.ethereum) return;
    
    setIsLoadingBalances(true);
    const balances = {};

    try {
      // Fetch ETH balance (native token)
      const ethBalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [fullWalletAddress, 'latest']
      });
      
      // Convert from wei to ether
      const ethBalanceInEth = parseInt(ethBalance, 16) / Math.pow(10, 18);
      balances['ethereum'] = ethBalanceInEth.toFixed(4);

      // For ERC-20 tokens, we need to call contract methods
      // This is a simplified example - in production, you'd use a library like ethers.js
      for (const token of tokens) {
        if (token.id === 'ethereum') continue; // Already handled

        const contractAddress = tokenContracts[token.id]?.[isMainnet ? 'mainnet' : 'testnet'];
        
        if (contractAddress && contractAddress !== 'native') {
          try {
            // ERC-20 balanceOf function call
            const data = '0x70a08231000000000000000000000000' + fullWalletAddress.slice(2);
            
            const balance = await window.ethereum.request({
              method: 'eth_call',
              params: [{
                to: contractAddress,
                data: data
              }, 'latest']
            });

            if (balance && balance !== '0x') {
              const tokenBalance = parseInt(balance, 16) / Math.pow(10, token.decimals);
              balances[token.id] = tokenBalance.toFixed(4);
            } else {
              balances[token.id] = '0.0000';
            }
          } catch (error) {
            console.error(`Error fetching balance for ${token.symbol}:`, error);
            balances[token.id] = '0.0000';
          }
        } else {
          // For tokens not available on current network
          balances[token.id] = '0.0000';
        }
      }

      setTokenBalances(balances);
    } catch (error) {
      console.error('Error fetching balances:', error);
      // Set fallback balances
      tokens.forEach(token => {
        balances[token.id] = '0.0000';
      });
      setTokenBalances(balances);
    }

    setIsLoadingBalances(false);
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setWalletError('');
    
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        setWalletError('MetaMask not detected. Please install MetaMask extension.');
        setIsConnecting(false);
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setIsConnected(true);
        setFullWalletAddress(accounts[0]);
        setWalletAddress(`${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
        setWalletError('');
        
        // Get network info
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log('Connected to chain:', chainId);
        
      } else {
        setWalletError('No accounts found. Please unlock MetaMask.');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      
      if (error.code === 4001) {
        setWalletError('Connection rejected. Please approve the connection request.');
      } else if (error.code === -32002) {
        setWalletError('Connection request pending. Check MetaMask.');
      } else {
        setWalletError('Failed to connect wallet. Please try again.');
      }
    }
    
    setIsConnecting(false);
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setFullWalletAddress('');
    setTokenBalances({});
    setWalletError('');
  };

  const handleSwap = () => {
    if (!fromAmount || !isConnected) return;
    const fromTokenData = tokens.find(t => t.id === fromToken);
    const toTokenData = tokens.find(t => t.id === toToken);
    alert(`Swapping ${fromAmount} ${fromTokenData?.symbol} to ${toTokenData?.symbol} on ${isMainnet ? 'Mainnet' : 'Testnet'}`);
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromDropdownOpen(false);
    setToDropdownOpen(false);
  };

  const selectFromToken = (tokenId) => {
    if (tokenId !== toToken) {
      setFromToken(tokenId);
    }
    setFromDropdownOpen(false);
  };

  const selectToToken = (tokenId) => {
    if (tokenId !== fromToken) {
      setToToken(tokenId);
    }
    setToDropdownOpen(false);
  };

  const getCurrentBalance = (tokenId) => {
    if (isLoadingBalances) return '...';
    return tokenBalances[tokenId] || '0.0000';
  };

  const setMaxAmount = () => {
    const balance = getCurrentBalance(fromToken);
    if (balance && balance !== '...' && balance !== '0.0000') {
      // Leave a small amount for gas fees if it's ETH
      if (fromToken === 'ethereum') {
        const maxAmount = Math.max(0, parseFloat(balance) - 0.01);
        setFromAmount(maxAmount.toString());
      } else {
        setFromAmount(balance);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
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
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={onBack}
              className="mb-6 text-slate-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
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
            <div 
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"
            />
            
            {/* Main card */}
            <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
              
              {/* Network Toggle */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-300 text-sm font-medium">Network</span>
                  <div className="flex bg-slate-700/50 rounded-lg p-1 border border-slate-600/50">
                    <button
                      onClick={() => setIsMainnet(true)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                        isMainnet
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Mainnet
                    </button>
                    <button
                      onClick={() => setIsMainnet(false)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                        !isMainnet
                          ? 'bg-orange-600 text-white shadow-lg'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Testnet
                    </button>
                  </div>
                </div>
              </div>

              {/* Wallet Connection */}
              <div className="mb-6">
                {!isConnected ? (
                  <div>
                    <Button
                      onClick={handleConnectWallet}
                      variant="primary"
                      size="md"
                      className="w-full"
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Connecting...
                        </div>
                      ) : 'Connect Wallet'}
                    </Button>
                    
                    {/* Error Message */}
                    {walletError && (
                      <div className="mt-3 p-3 bg-red-900/50 border border-red-600/50 rounded-lg">
                        <p className="text-red-300 text-sm">{walletError}</p>
                        {walletError.includes('MetaMask not detected') && (
                          <a
                            href="https://metamask.io/download/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:text-red-300 text-sm underline mt-1 block"
                          >
                            Download MetaMask →
                          </a>
                        )}
                      </div>
                    )}
                    
                    {/* Install MetaMask hint */}
                    {typeof window !== 'undefined' && !window.ethereum && (
                      <div className="mt-3 p-3 bg-blue-900/50 border border-blue-600/50 rounded-lg">
                        <p className="text-blue-300 text-sm">
                          Don't have MetaMask? 
                          <a
                            href="https://metamask.io/download/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline ml-1"
                          >
                            Install it here
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
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
                    <div className="flex items-center gap-2">
                      {isLoadingBalances && (
                        <svg className="animate-spin w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <button 
                        onClick={handleDisconnectWallet}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Disconnect Wallet"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* From Token */}
              <div className="mb-4">
                <label className="block text-slate-300 text-sm font-medium mb-2">From</label>
                <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="relative">
                      <button
                        onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
                        className="flex items-center gap-3 bg-transparent text-white font-semibold text-lg outline-none cursor-pointer hover:bg-slate-600/50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <ChainIcon chain={fromToken} size="xs" />
                        {tokens.find(t => t.id === fromToken)?.symbol}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* From Token Dropdown */}
                      {fromDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-30 min-w-[200px]">
                          {tokens.filter(token => token.id !== toToken).map(token => (
                            <button
                              key={token.id}
                              onClick={() => selectFromToken(token.id)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left border-b border-slate-700 last:border-b-0"
                            >
                              <ChainIcon chain={token.id} size="xs" />
                              <div className="flex-1">
                                <div className="text-white font-medium">{token.symbol}</div>
                                <div className="text-slate-400 text-sm">{token.name}</div>
                              </div>
                              <div className="text-slate-400 text-xs">
                                {getCurrentBalance(token.id)}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={setMaxAmount}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                      disabled={!isConnected || getCurrentBalance(fromToken) === '0.0000'}
                    >
                      MAX
                    </button>
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
                      Balance: {getCurrentBalance(fromToken)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center my-4">
                <button
                  onClick={swapTokens}
                  className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl transition-colors border border-slate-600/50 hover:scale-110 transform duration-200"
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
                    <div className="relative">
                      <button
                        onClick={() => setToDropdownOpen(!toDropdownOpen)}
                        className="flex items-center gap-3 bg-transparent text-white font-semibold text-lg outline-none cursor-pointer hover:bg-slate-600/50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <ChainIcon chain={toToken} size="xs" />
                        {tokens.find(t => t.id === toToken)?.symbol}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* To Token Dropdown */}
                      {toDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-30 min-w-[200px]">
                          {tokens.filter(token => token.id !== fromToken).map(token => (
                            <button
                              key={token.id}
                              onClick={() => selectToToken(token.id)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left border-b border-slate-700 last:border-b-0"
                            >
                              <ChainIcon chain={token.id} size="xs" />
                              <div className="flex-1">
                                <div className="text-white font-medium">{token.symbol}</div>
                                <div className="text-slate-400 text-sm">{token.name}</div>
                              </div>
                              <div className="text-slate-400 text-xs">
                                {getCurrentBalance(token.id)}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-slate-400 text-2xl font-bold">
                      {fromAmount ? (parseFloat(fromAmount) * 0.98).toFixed(4) : '0.0'}
                    </div>
                    <div className="text-slate-400 text-sm">
                      Balance: {getCurrentBalance(toToken)}
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
                      <span>{isMainnet ? '~$2.50' : '~$0.01'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Route</span>
                      <span className="text-blue-400">AI Optimized</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Network</span>
                      <span className={isMainnet ? 'text-green-400' : 'text-orange-400'}>
                        {isMainnet ? 'Mainnet' : 'Testnet'}
                      </span>
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
                disabled={!isConnected || !fromAmount || parseFloat(fromAmount) > parseFloat(getCurrentBalance(fromToken))}
              >
                {!isConnected ? 'Connect Wallet to Swap' : 
                 parseFloat(fromAmount) > parseFloat(getCurrentBalance(fromToken)) ? 'Insufficient Balance' :
                 `Swap on ${isMainnet ? 'Mainnet' : 'Testnet'}`}
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
    </div>
  );
};

export default SwapPage;
