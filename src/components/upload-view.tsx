'use client';
import { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/hooks/use-language';

interface UploadViewProps {
  onFileUpload: (file: File) => void;
  error: string | null;
  onReset: () => void;
}

export function UploadView({ onFileUpload, error, onReset }: UploadViewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useLanguage();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };
  
  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{t('uploadView.title')}</CardTitle>
        <CardDescription>{t('uploadView.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('error.error')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
             <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onReset} aria-label={t('uploadView.clearError')}>
                <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors",
            isDragging ? "border-primary bg-accent/20" : "border-border hover:border-primary/50",
            error ? 'border-destructive' : ''
          )}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,image/*"
            disabled={!!error}
          />
          <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="font-semibold">
            {isDragging ? t('uploadView.dropFile') : t('uploadView.dragOrClick')}
          </p>
          <p className="text-sm text-muted-foreground">{t('uploadView.supportedFormats')}</p>
        </div>
      </CardContent>
    </Card>
  );
}
