import { FC } from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  full?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, className, onClick = () => {}, full, disabled }) => {
  return (
    <>
      <button
        className={`${full ? 'w-full' : ''} ${
          disabled
            ? 'bg-agnos_gray-light text-agnos_gray-dark'
            : 'bg-gradient-to-t from-agnos_blue-light to-agnos_blue-dark text-white'
        }   text-xl font-medium py-3 px-4 rounded-xl ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
