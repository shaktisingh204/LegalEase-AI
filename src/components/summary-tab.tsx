'use client';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Copy } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface SummaryTabProps {
  title: string;
  content: string;
}

export function SummaryTab({ title, content }: SummaryTabProps) {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: t('summaryTab.copied'),
      description: t('summaryTab.copiedSuccess'),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          <Copy className="h-5 w-5" />
          <span className="sr-only">{t('summaryTab.copySummary')}</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-foreground/90">{content}</p>
      </CardContent>
    </Card>
  );
}
