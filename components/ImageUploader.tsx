
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageUpload(event.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center w-full max-w-2xl h-96 border-2 border-dashed rounded-lg cursor-pointer bg-surface-light dark:bg-surface-dark transition-colors duration-300 ${
          isDragging 
            ? 'border-primary-light dark:border-primary-dark' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" />
          <p className="mb-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <span className="font-semibold text-primary-light dark:text-primary-dark">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">PNG, JPG, or WEBP</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
    </div>
  );
};
