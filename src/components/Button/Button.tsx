import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className
}: ButtonProps) => {
  return (
    <button
      className={`rounded-sm p-2 font-semibold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
