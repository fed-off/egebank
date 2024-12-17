import React from 'react';

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '' } = props;
  const baseClasses = 'min-h-6 p-2 border-2 border-solid text-lg text-center';
  const classes = `${baseClasses} ${className}`.trim();

  return <input {...props} className={classes} />;
}

export default Input;
