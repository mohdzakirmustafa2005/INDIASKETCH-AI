
import React from 'react';

interface SpinnerProps {
    message: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-t-primary-dark border-gray-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg font-semibold">{message || "Processing..."}</p>
    </div>
  );
};
