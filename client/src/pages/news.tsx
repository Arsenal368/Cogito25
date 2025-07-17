import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArticleCard } from '@/components/article-card';
import { NewsArticle } from '@/lib/types';

// Mock data for demonstration
const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: "Biden's Climate Plan Shows Promise, But Urgency Demands Faster Action",
    url: '#',
    source: 'The Progressive Post',
    perspective: 'liberal',
    biasScore: 75,
    content: "The administration's renewed focus on renewable energy infrastructure represents a crucial step forward in addressing the climate crisis, though environmental advocates argue the timeline remains insufficient for meeting critical emission targets...",
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200',
    publishedAt: new Date('2024-01-15'),
    viewCount: 2300,
  },
  {
    id: '2',
    title: 'Climate Regulations Risk American Jobs and Economic Growth',
    url: '#',
    source: 'Conservative Review',
    perspective: 'conservative',
    biasScore: -75,
    content: "While environmental stewardship is important, the proposed regulations threaten to displace thousands of workers and undermine America's energy independence. A balanced approach must consider economic impacts alongside environmental goals...",
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200',
    publishedAt: new Date('2024-01-15'),
    viewCount: 1900,
  },
  {
    id: '3',
    title: 'Universal Healthcare: A Moral Imperative for Modern Society',
    url: '#',
    source: 'Health Policy Today',
    perspective: 'liberal',
    biasScore: 80,
    content: "As healthcare costs continue to skyrocket, the case for universal coverage becomes increasingly compelling. Countries with universal systems consistently outperform the US in health outcomes while spending less per capita...",
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200',
    publishedAt: new Date('2024-01-14'),
    viewCount: 1800,
  },
  {
    id: '4',
    title: 'Free Market Healthcare: Innovation Through Competition',
    url: '#',
    source: 'Market Health Journal',
    perspective: 'conservative',
    biasScore: -70,
    content: "Market-based healthcare solutions have consistently driven innovation and improved patient outcomes. Competition among providers and insurers creates incentives for better service and lower costs, benefiting consumers...",
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200',
    publishedAt: new Date('2024-01-14'),
    viewCount: 2100,
  },
];

const quickTopics = [
  'Climate Change',
  'Healthcare',
  'Economy',
  'Technology',
  'Immigration',
  'Education',
];

export default function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [timeRange, setTimeRange] = useState('24h');
  const [sourceType, setSourceType] = useState('all');
  const [perspective, setPerspective] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

  const filteredArticles = mockArticles.filter(article => {
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedTopic && !article.title.toLowerCase().includes(selectedTopic.toLowerCase())) {
      return false;
    }
    return true;
  });

  const liberalArticles = filteredArticles.filter(article => article.perspective === 'liberal');
  const conservativeArticles = filteredArticles.filter(article => article.perspective === 'conservative');

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setSearchQuery(topic);
  };

  return (
    <div className="min-h-screen bg-alabaster pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-ink">
              Explore News Through Multiple Lenses
            </h1>
            <p className="text-xl text-neutral-600">
              Search for current events and see how different perspectives cover the same story
            </p>
          </div>

          {/* Search Interface */}
          <Card className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                  <Input
                    placeholder="Search for news topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-2 border-neutral-200 focus:border-cogito-blue"
                  />
                </div>
                <Button className="bg-cogito-blue text-white hover:bg-blue-600 px-8 py-4">
                  <Search className="mr-2 h-5 w-5" />
                  Search News
                </Button>
              </div>

              {/* Quick Topics */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-neutral-600 mr-4">Quick Topics:</span>
                {quickTopics.map((topic) => (
                  <Button
                    key={topic}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTopicClick(topic)}
                    className={`rounded-full hover:bg-cogito-blue hover:text-white transition-colors ${
                      selectedTopic === topic ? 'bg-cogito-blue text-white' : ''
                    }`}
                  >
                    {topic}
                  </Button>
                ))}
              </div>

              {/* Advanced Filters */}
              <div className="border-t border-neutral-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Time Range
                    </label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">Last 24 hours</SelectItem>
                        <SelectItem value="week">Last week</SelectItem>
                        <SelectItem value="month">Last month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Source Type
                    </label>
                    <Select value={sourceType} onValueChange={setSourceType}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="major">Major Publications</SelectItem>
                        <SelectItem value="independent">Independent Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Perspective
                    </label>
                    <Select value={perspective} onValueChange={setPerspective}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Show All Perspectives</SelectItem>
                        <SelectItem value="opposing">Opposite to My Views</SelectItem>
                        <SelectItem value="similar">Similar to My Views</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* News Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Liberal Perspective */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-cogito-blue rounded-full"></div>
                <h3 className="text-xl font-semibold text-ink">Liberal Perspective</h3>
                <Badge variant="secondary" className="text-sm text-neutral-500">
                  Opposite to your views
                </Badge>
              </div>

              {liberalArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  perspective="opposing"
                  onReadMore={handleArticleClick}
                />
              ))}
            </div>

            {/* Conservative Perspective */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-sage rounded-full"></div>
                <h3 className="text-xl font-semibold text-ink">Conservative Perspective</h3>
                <Badge variant="secondary" className="text-sm text-neutral-500">
                  Similar to your views
                </Badge>
              </div>

              {conservativeArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  perspective="similar"
                  onReadMore={handleArticleClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      <Dialog open={showArticleModal} onOpenChange={setShowArticleModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-cogito-blue rounded-full"></div>
              <span>Article Analysis</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedArticle && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Selected Article */}
                <div className="space-y-4">
                  <div className="bg-cogito-blue/10 rounded-lg p-4">
                    <h4 className="font-semibold text-cogito-blue mb-2">Selected Article</h4>
                    <p className="text-sm text-neutral-600">
                      {selectedArticle.perspective === 'liberal' ? 'Liberal' : 'Conservative'} perspective from {selectedArticle.source}
                    </p>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-ink">{selectedArticle.title}</h2>
                  
                  <div className="prose prose-neutral max-w-none">
                    <p>{selectedArticle.content}</p>
                  </div>
                </div>

                {/* Opposing Viewpoint */}
                <div className="space-y-4">
                  <div className="bg-sage/10 rounded-lg p-4">
                    <h4 className="font-semibold text-sage mb-2">Opposing Viewpoint</h4>
                    <p className="text-sm text-neutral-600">
                      {selectedArticle.perspective === 'liberal' ? 'Conservative' : 'Liberal'} perspective
                    </p>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-ink">
                    {selectedArticle.perspective === 'liberal' 
                      ? 'Climate Regulations Risk American Jobs and Economic Growth'
                      : "Biden's Climate Plan Shows Promise, But Urgency Demands Faster Action"
                    }
                  </h2>
                  
                  <div className="prose prose-neutral max-w-none">
                    <p>
                      {selectedArticle.perspective === 'liberal' 
                        ? "While environmental stewardship is important, the proposed regulations threaten to displace thousands of workers and undermine America's energy independence. A balanced approach must consider economic impacts alongside environmental goals..."
                        : "The administration's renewed focus on renewable energy infrastructure represents a crucial step forward in addressing the climate crisis, though environmental advocates argue the timeline remains insufficient for meeting critical emission targets..."
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Bias Analysis */}
              <div className="border-t border-neutral-200 pt-6">
                <h4 className="text-lg font-semibold mb-4">Bias Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Emotional Language</span>
                      <span className="text-sm font-medium text-cogito-blue">High</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-cogito-blue h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Factual Content</span>
                      <span className="text-sm font-medium text-cogito-blue">Medium</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-cogito-blue h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Source Credibility</span>
                      <span className="text-sm font-medium text-sage">High</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-sage h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-600">Balanced Reporting</span>
                      <span className="text-sm font-medium text-sage">Low</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-sage h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
