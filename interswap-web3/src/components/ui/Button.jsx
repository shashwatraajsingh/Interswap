import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
    transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 
      hover:from-blue-500 hover:via-purple-500 hover:to-blue-700
      text-white font-medium shadow-lg hover:shadow-xl hover:shadow-blue-500/25
      focus:ring-blue-500 
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
    `,
    secondary: `
      bg-slate-800/50 backdrop-blur-sm border border-slate-600 text-white hover:bg-slate-700/50
      focus:ring-blue-400 hover:border-slate-500 hover:shadow-lg hover:shadow-slate-500/20
    `,
    outline: `
      border border-slate-600 text-slate-300 backdrop-blur-sm
      hover:bg-slate-800/50 hover:text-white hover:border-blue-400/50
      focus:ring-blue-400
    `,
    ghost: `
      text-slate-300 hover:text-white hover:bg-slate-800/30
      focus:ring-slate-400 backdrop-blur-sm
    `
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-xs gap-1 min-h-[28px]',
    sm: 'px-4 py-2 text-sm gap-2 min-h-[36px]',
    md: 'px-6 py-3 text-base gap-2 min-h-[44px]',
    lg: 'px-8 py-4 text-lg gap-3 min-h-[50px]',
    xl: 'px-10 py-5 text-xl gap-3 min-h-[56px]'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
