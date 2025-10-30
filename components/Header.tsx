
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../types';
import { CameraIcon } from './icons';

interface HeaderProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="bg-surface-light dark:bg-surface-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <CameraIcon className="h-8 w-8 text-primary-light dark:text-primary-dark" />
            <h1 className="text-xl md:text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              InidaSketch <span className="text-primary-light dark:text-primary-dark">AI</span>
            </h1>
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
};
