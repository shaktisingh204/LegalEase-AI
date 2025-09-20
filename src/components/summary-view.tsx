'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { SummaryData } from '@/app/page';
import { SummaryTab } from './summary-tab';
import { QaTab } from './qa-tab';
import { Button } from './ui/button';
import { ArrowLeft, ClipboardList, ShieldAlert, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface SummaryViewProps {
  data: SummaryData;
  onReset: () => void;
}

export function SummaryView({ data, onReset }: SummaryViewProps) {
    const { t } = useLanguage();
  const keyPoints = data.plainLanguageSummary
    .split('\n')
    .map(line => line.trim().replace(/^[\*\-]\s*/, ''))
    .filter(line => line.length > 0);

  return (
    <div className="space-y-4">
       <Button variant="outline" onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('summaryView.analyzeAnother')}
        </Button>
      <Tabs defaultValue="key-points" className="w-full">
        <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <TabsList>
            <TabsTrigger value="key-points"><ShieldAlert className="mr-2 h-4 w-4"/>{t('summaryView.tabs.keyPoints')}</TabsTrigger>
            <TabsTrigger value="summary"><ClipboardList className="mr-2 h-4 w-4"/>{t('summaryView.tabs.summary')}</TabsTrigger>
            <TabsTrigger value="qa"><MessageSquare className="mr-2 h-4 w-4"/>{t('summaryView.tabs.qa')}</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            {t('summaryView.showingAnalysisFor')}: <span className="font-medium text-foreground">{data.fileName}</span>
          </div>
        </div>
        
        <TabsContent value="summary" className="mt-0">
          <SummaryTab title={t('summaryView.aiSummaryTitle')} content={data.summary} />
        </TabsContent>
        
        <TabsContent value="key-points" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{t('summaryView.keyPointsTitle')}</CardTitle>
              <CardDescription>{t('summaryView.keyPointsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                    <p className="text-foreground">{point}</p>
                  </li>
                ))}
                {keyPoints.length === 0 && (
                   <p className="text-muted-foreground">{t('summaryView.noKeyPoints')}</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="qa" className="mt-0">
          <QaTab documentText={data.documentText} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
