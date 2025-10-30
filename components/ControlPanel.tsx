
import React from 'react';
import { PencilIcon, PaintBrushIcon, SparklesIcon, DownloadIcon } from './icons';

interface ControlPanelProps {
  onSketch: () => void;
  onColorize: () => void;
  onEdit: () => void;
  onDownload: (format: 'png' | 'jpeg') => void;
  editPrompt: string;
  setEditPrompt: (prompt: string) => void;
  hasProcessedImage: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onSketch,
  onColorize,
  onEdit,
  onDownload,
  editPrompt,
  setEditPrompt,
  hasProcessedImage,
}) => {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-lg space-y-6">
      
      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onSketch}
          className="flex items-center justify-center gap-2 w-full text-white bg-primary-light dark:bg-primary-dark hover:bg-opacity-90 font-medium rounded-lg text-sm px-5 py-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        >
          <PencilIcon className="h-5 w-5" />
          Sketchify
        </button>
        <button
          onClick={onColorize}
          className="flex items-center justify-center gap-2 w-full text-white bg-secondary-light dark:bg-secondary-dark hover:bg-opacity-90 font-medium rounded-lg text-sm px-5 py-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light dark:focus:ring-secondary-dark focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        >
          <PaintBrushIcon className="h-5 w-5" />
          Colorize
        </button>
      </div>

      {/* Edit with Prompt */}
      <div className="space-y-2">
        <label htmlFor="edit-prompt" className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
          Edit with a Prompt
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="edit-prompt"
            type="text"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            placeholder="e.g., 'Add a soaring eagle in the sky'"
            className="flex-grow block w-full px-4 py-2 text-text-primary-light dark:text-text-primary-dark bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark transition"
          />
          <button
            onClick={onEdit}
            disabled={!editPrompt}
            className="flex items-center justify-center gap-2 w-full sm:w-auto text-white bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed dark:bg-gray-600 dark:hover:bg-gray-700 dark:disabled:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300"
          >
            <SparklesIcon className="h-5 w-5" />
            Apply Edit
          </button>
        </div>
      </div>

      {/* Download Section */}
      {hasProcessedImage && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
           <h3 className="text-lg font-semibold mb-4 text-center text-text-primary-light dark:text-text-primary-dark">Download Your Creation</h3>
           <div className="flex justify-center gap-4">
             <button
                onClick={() => onDownload('png')}
                className="flex items-center justify-center gap-2 w-full sm:w-auto text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300"
              >
                <DownloadIcon className="h-5 w-5" />
                Download PNG
             </button>
             <button
                onClick={() => onDownload('jpeg')}
                className="flex items-center justify-center gap-2 w-full sm:w-auto text-white bg-teal-500 hover:bg-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300"
              >
                <DownloadIcon className="h-5 w-5" />
                Download JPEG
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
