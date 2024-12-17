interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'light';
}

function Button(props: Props) {
  const { children, variant = 'primary', type = 'button', className = '' } = props;
  const baseClasses =
    'min-h-10 p-2.5 border-0 cursor-pointer font-[inherit] uppercase font-semibold disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-opacity-75 focus-visible:bg-opacity-75 enabled:active:bg-opacity-50';
  const variantClasses = {
    primary: 'bg-gray-300 text-gray-800',
    secondary: 'bg-blue-400 text-white',
    success: 'bg-green-400 text-white',
    danger: 'bg-red-400 text-white',
    warning: 'bg-orange-400 text-white',
    light: 'bg-white text-gray-800 enabled:hover:bg-opacity-75',
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();
  return (
    <button {...props} className={classes} type={type}>
      {children}
    </button>
  );
}

export default Button;
