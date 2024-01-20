import { FC } from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <>
      <div className={`w-full shadow-xl rounded-xl py-4 px-4 ${className}`}>{children}</div>
    </>
  );
};

export default Card;
