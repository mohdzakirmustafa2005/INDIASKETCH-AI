
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-light dark:bg-surface-dark mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-text-secondary-light dark:text-text-secondary-dark">
        <p>&copy; {new Date().getFullYear()} InidaSketch AI. Powered by Google Gemini.</p>
      </div>
    </footer>
  );
};
