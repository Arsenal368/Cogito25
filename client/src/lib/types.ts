export interface PoliticalLeanings {
  economic: number; // -100 to 100 (left to right)
  social: number; // -100 to 100 (authoritarian to libertarian)
  label: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  category: 'economic' | 'social';
  weight: number;
}

export interface QuizAnswer {
  questionId: string;
  value: number; // -2 to 2 (strongly disagree to strongly agree)
  text: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  url: string;
  source: string;
  perspective: 'liberal' | 'conservative' | 'neutral';
  biasScore: number;
  content: string;
  imageUrl?: string;
  publishedAt: Date;
  viewCount: number;
}

export interface BiasAnalysis {
  overallBias: number;
  emotionalLanguage: number;
  factualContent: number;
  sourceCredibility: number;
  balancedReporting: number;
}

export interface UserProfile {
  id: string;
  username: string;
  politicalLeanings?: PoliticalLeanings;
  articlesRead: number;
  opposingViewsPercentage: number;
  joinDate: Date;
}

export interface ReadingStats {
  totalArticles: number;
  opposingViewsPercentage: number;
  averageReadingTime: number;
  favoriteTopics: string[];
}
