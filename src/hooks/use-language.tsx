'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type Language = 'en' | 'hi';

const translations = {
  en: {
    appTitle: 'LegalEase AI',
    // Upload View
    uploadView: {
      title: 'Demystify Your Legal Document',
      description: 'Upload a contract, agreement, or terms of service to get a clear, simple explanation.',
      dropFile: 'Drop the file here',
      dragOrClick: 'Drag & drop a file or click to upload',
      supportedFormats: 'PDF, DOCX, and image files are supported.',
      clearError: 'Clear error',
    },
    // Loading Messages
    loading: {
      extractingText: 'Securely analyzing your document...',
      analyzingAndSummarizing: 'Generating your simplified summary...',
      processing: 'Processing...',
      waitMessage: 'This may take a moment. Your privacy is our priority.',
    },
    // Summary View
    summaryView: {
      analyzeAnother: 'Analyze Another Document',
      showingAnalysisFor: 'Showing analysis for',
      aiSummaryTitle: 'High-Level Summary',
      keyPointsTitle: 'Key Clauses & Potential Risks',
      keyPointsDescription: 'A simplified breakdown of important clauses, obligations, and potential risks.',
      noKeyPoints: 'No specific key points were identified by the AI.',
      tabs: {
        summary: 'Summary',
        keyPoints: 'Key Points',
        qa: 'Q&A',
      },
    },
    // QA Tab
    qaTab: {
      title: 'Ask About Your Document',
      description: 'Ask specific questions to get instant, easy-to-understand answers.',
      inputPlaceholder: 'e.g., What are the penalties for early termination?',
      sendMessage: 'Send message',
      errorMessage: "Sorry, I couldn't find an answer to that in the document.",
    },
    // Summary Tab
    summaryTab: {
      copied: 'Copied to clipboard!',
      copiedSuccess: 'The summary has been successfully copied.',
      copySummary: 'Copy summary',
    },
    // Errors
    error: {
      error: 'Error',
      noTextExtracted: 'No text could be extracted from the document. Please try a different file.',
      textExtractionFailed: 'Text Extraction Failed',
      aiProcessingError: 'An error occurred during AI processing. Please try again.',
      processingError: 'Processing Error',
      fileReadError: 'The uploaded file could not be read. Please try again.',
      fileReadErrorTitle: 'File Read Error',
      unexpectedError: 'An unexpected error occurred. Please try again.',
    },
  },
  hi: {
    appTitle: 'लीगलईज़ एआई',
    // Upload View
    uploadView: {
      title: 'अपने कानूनी दस्तावेज़ को समझें',
      description: 'एक स्पष्ट, सरल स्पष्टीकरण प्राप्त करने के लिए एक अनुबंध, समझौता, या सेवा की शर्तें अपलोड करें।',
      dropFile: 'फ़ाइल को यहाँ छोड़ें',
      dragOrClick: 'एक फ़ाइल खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें',
      supportedFormats: 'पीडीएफ, DOCX, और छवि फ़ाइलें समर्थित हैं।',
      clearError: 'त्रुटि साफ़ करें',
    },
    // Loading Messages
    loading: {
      extractingText: 'आपके दस्तावेज़ का सुरक्षित रूप से विश्लेषण किया जा रहा है...',
      analyzingAndSummarizing: 'आपका सरलीकृत सारांश तैयार किया जा रहा है...',
      processing: 'प्रोसेस हो रहा है...',
      waitMessage: 'इसमें कुछ समय लग सकता है। आपकी गोपनीयता हमारी प्राथमिकता है।',
    },
    // Summary View
    summaryView: {
      analyzeAnother: 'दूसरे दस्तावेज़ का विश्लेषण करें',
      showingAnalysisFor: 'इसके लिए विश्लेषण दिखाया जा रहा है',
      aiSummaryTitle: 'उच्च-स्तरीय सारांश',
      keyPointsTitle: 'मुख्य धाराएं और संभावित जोखिम',
      keyPointsDescription: 'महत्वपूर्ण धाराओं, दायित्वों और संभावित जोखिमों का एक सरलीकृत विश्लेषण।',
      noKeyPoints: 'एआई द्वारा कोई विशिष्ट मुख्य बिंदु पहचाना नहीं गया।',
      tabs: {
        summary: 'सारांश',
        keyPoints: 'मुख्य बिंदु',
        qa: 'प्रश्नोत्तर',
      },
    },
    // QA Tab
    qaTab: {
      title: 'अपने दस्तावेज़ के बारे में पूछें',
      description: 'तुरंत, समझने में आसान उत्तर पाने के लिए विशिष्ट प्रश्न पूछें।',
      inputPlaceholder: 'उदा., जल्दी समाप्ति के लिए क्या दंड हैं?',
      sendMessage: 'संदेश भेजें',
      errorMessage: 'माफ़ कीजिए, मुझे दस्तावेज़ में इसका जवाब नहीं मिला।',
    },
    // Summary Tab
    summaryTab: {
      copied: 'क्लिपबोर्ड पर कॉपी किया गया!',
      copiedSuccess: 'सारांश सफलतापूर्वक कॉपी कर लिया गया है।',
      copySummary: 'सारांश कॉपी करें',
    },
    // Errors
    error: {
      error: 'त्रुटि',
      noTextExtracted: 'दस्तावेज़ से कोई टेक्स्ट नहीं निकाला जा सका। कृपया कोई अन्य फ़ाइल आज़माएँ।',
      textExtractionFailed: 'टेक्स्ट निकालने में विफल',
      aiProcessingError: 'एआई प्रसंस्करण के दौरान एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
      processingError: 'प्रसंस्करण त्रुटि',
      fileReadError: 'अपलोड की गई फ़ाइल को पढ़ा नहीं जा सका। कृपया पुनः प्रयास करें।',
      fileReadErrorTitle: 'फ़ाइल पढ़ने में त्रुटि',
      unexpectedError: 'एक अप्रत्याशहित त्रुटि हुई। कृपया पुनः प्रयास करें।',
    },
  },
};

type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedTranslation(obj: any, key: string): string | undefined {
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (['en', 'hi'].includes(lang)) {
        setLanguageState(lang);
    }
  };

  const t = (key: string): string => {
    const translation = getNestedTranslation(translations[language], key);
    if (translation === undefined) {
        // Fallback to English if translation is missing
        const fallback = getNestedTranslation(translations.en, key);
        if (fallback === undefined) {
            console.warn(`Translation key "${key}" not found in English or ${language}.`);
            return key;
        }
        return fallback;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
