'use client';

import { useState, useEffect } from 'react';
import { getSummaries, extractText } from './actions';
import { UploadView } from '@/components/upload-view';
import { SummaryView } from '@/components/summary-view';
import { Logo } from '@/components/logo';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { LanguageSwitcher } from '@/components/language-switcher';

export type SummaryData = {
  documentText: string;
  summary: string;
  plainLanguageSummary: string;
  fileName: string;
};

export default function Home() {
  const [state, setState] = useState<'idle' | 'loading' | 'ready'>('idle');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleLanguageChange = async () => {
      if (isMounted && state === 'ready' && summaryData) {
        setState('loading');
        setLoadingMessage(t('loading.analyzingAndSummarizing'));
        try {
          const summaries = await getSummaries(summaryData.documentText, language);
          setSummaryData({
            ...summaryData,
            ...summaries,
          });
          setState('ready');
        } catch (e) {
          console.error(e);
          let errorMessage = t('error.aiProcessingError');
          if (e instanceof Error) {
            errorMessage = e.message;
          }
          toast({
            variant: 'destructive',
            title: t('error.processingError'),
            description: errorMessage,
          });
          // Revert to previous data on error
          setState('ready');
        }
      }
    };
    handleLanguageChange();
  }, [language]);


  const handleFileUpload = async (file: File) => {
    setState('loading');
    setError(null);
    
    try {
      setLoadingMessage(t('loading.extractingText'));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const documentDataUri = reader.result as string;

        try {
          const extractedText = await extractText(documentDataUri);

          if (!extractedText.trim()) {
            const noTextError = t('error.noTextExtracted');
            toast({
              variant: 'destructive',
              title: t('error.textExtractionFailed'),
              description: noTextError,
            });
            setError(noTextError);
            setState('idle');
            return;
          }

          setLoadingMessage(t('loading.analyzingAndSummarizing'));
          const summaries = await getSummaries(extractedText, language);
          setSummaryData({
            ...summaries,
            documentText: extractedText,
            fileName: file.name,
          });
          setState('ready');
        } catch(e) {
          console.error(e);
          let errorMessage = t('error.aiProcessingError');
          if (e instanceof Error) {
            errorMessage = e.message;
          }
          toast({
            variant: 'destructive',
            title: t('error.processingError'),
            description: errorMessage,
          });
          setError(errorMessage);
          setState('idle');
        }
      };
      reader.onerror = () => {
        const readerError = t('error.fileReadError');
        toast({
            variant: 'destructive',
            title: t('error.fileReadErrorTitle'),
            description: readerError,
        });
        setError(readerError);
        setState('idle');
      };
    } catch (e) {
      console.error(e);
      let errorMessage = t('error.unexpectedError');
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      toast({
        variant: 'destructive',
        title: t('error.error'),
        description: errorMessage,
      });
      setError(errorMessage);
      setState('idle');
    }
  };

  const handleReset = () => {
    setState('idle');
    setSummaryData(null);
    setError(null);
    setLoadingMessage('');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 justify-between">
        <div className='flex items-center gap-2'>
            <Logo />
            <h1 className="font-headline text-xl font-semibold text-foreground">
            {t('appTitle')}
            </h1>
        </div>
        <LanguageSwitcher />
      </header>
      <main className="flex-1 p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-4xl animate-in fade-in-50 duration-500">
          {state === 'idle' && <UploadView onFileUpload={handleFileUpload} error={error} onReset={() => setError(null)} />}
          {state === 'loading' && (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h2 className="font-headline text-2xl font-semibold">{loadingMessage || t('loading.processing')}</h2>
              <p className="text-muted-foreground">{t('loading.waitMessage')}</p>
            </div>
          )}
          {state === 'ready' && summaryData && (
              <SummaryView data={summaryData} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  );
}
