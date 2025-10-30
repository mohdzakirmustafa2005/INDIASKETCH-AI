
import React from 'react';
import { ArrowRightIcon, TrashIcon } from './icons';

interface ImageDisplayProps {
  originalImage: string | null;
  processedImage: string | null;
  onClear: () => void;
}

const ImageCard: React.FC<{ src: string | null; title: string; emptyText: string }> = ({ src, title, emptyText }) => (
    <div className="w-full flex-1 bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
        <h3 className="text-lg font-semibold mb-4 text-text-secondary-light dark:text-text-secondary-dark">{title}</h3>
        <div className="w-full h-full flex items-center justify-center rounded-md overflow-hidden bg-background-light dark:bg-background-dark">
            {src ? (
                <img src={src} alt={title} className="object-contain max-w-full max-h-full" />
            ) : (
                <p className="text-text-secondary-light dark:text-text-secondary-dark italic">{emptyText}</p>
            )}
        </div>
    </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, processedImage, onClear }) => {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <ImageCard src={originalImage} title="Original" emptyText="Upload an image to start." />
        <div className="my-4 md:my-0 text-primary-light dark:text-primary-dark">
          <ArrowRightIcon className="h-8 w-8 transform md:rotate-0 rotate-90" />
        </div>
        <ImageCard src={processedImage} title="AI Processed" emptyText="Your result will appear here." />
      </div>
       <button 
        onClick={onClear} 
        className="absolute top-0 right-0 mt-2 mr-2 md:-mt-2 md:-mr-2 flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark text-sm"
      >
        <TrashIcon className="h-4 w-4" />
        <span>New Image</span>
      </button>
    </div>
  );
};
