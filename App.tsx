
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { ControlPanel } from './components/ControlPanel';
import { Spinner } from './components/Spinner';
import { processImageWithAI } from './services/geminiService';
import { Theme } from './types';
import { DownloadIcon, SparklesIcon, PencilIcon, PaintBrushIcon } from './components/icons';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalMimeType, setOriginalMimeType] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>('');

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      setOriginalMimeType(file.type);
      setProcessedImage(null);
      setError(null);
    };
    reader.onerror = () => {
      setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setOriginalMimeType(null);
    setError(null);
    setEditPrompt('');
  };

  const executeAIProcess = useCallback(async (
    image: string,
    mimeType: string,
    prompt: string,
    message: string
  ) => {
    setIsLoading(true);
    setLoadingMessage(message);
    setError(null);

    const base64Data = image.split(',')[1];

    try {
      const resultBase64 = await processImageWithAI(base64Data, mimeType, prompt);
      setProcessedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const handleSketch = () => {
    if (!originalImage || !originalMimeType) return;
    executeAIProcess(
      originalImage,
      originalMimeType,
      "Convert this image into a highly detailed, artistic black and white pencil sketch. Emphasize clean lines, dramatic shading, and texture. The background should be pure white.",
      "Sketching your masterpiece..."
    );
  };
  
  const handleColorize = () => {
    const imageToProcess = processedImage || originalImage;
    if (!imageToProcess || !originalMimeType) return;
     executeAIProcess(
      imageToProcess,
      originalMimeType,
      "Colorize this sketch with vibrant, rich, and realistic colors. Preserve the underlying sketch details and texture while adding a beautiful color palette.",
      "Adding a splash of color..."
    );
  };

  const handleEdit = () => {
    const imageToProcess = processedImage || originalImage;
    if (!imageToProcess || !editPrompt || !originalMimeType) return;
    executeAIProcess(
      imageToProcess,
      originalMimeType,
      editPrompt,
      "Applying your creative vision..."
    );
  };

  const handleDownload = (format: 'png' | 'jpeg') => {
    if (!processedImage) return;

    const link = document.createElement('a');
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        link.href = canvas.toDataURL(`image/${format}`);
        link.download = `inidasketch-result.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    image.src = processedImage;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
      {isLoading && <Spinner message={loadingMessage} />}
      <Header theme={theme} setTheme={setTheme} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="flex flex-col gap-8">
            <ImageDisplay originalImage={originalImage} processedImage={processedImage} onClear={handleClear} />
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
            <ControlPanel
              onSketch={handleSketch}
              onColorize={handleColorize}
              onEdit={handleEdit}
              onDownload={handleDownload}
              editPrompt={editPrompt}
              setEditPrompt={setEditPrompt}
              hasProcessedImage={!!processedImage}
            />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
