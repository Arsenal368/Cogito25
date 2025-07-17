import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Link as LinkIcon, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BiasAnalysis } from '@/lib/types';

const mockBiasAnalysis: BiasAnalysis = {
  overallBias: 75,
  emotionalLanguage: 80,
  factualContent: 60,
  sourceCredibility: 85,
  balancedReporting: 25,
};

export default function BiasDetector() {
  const [url, setUrl] = useState('');
  const [textContent, setTextContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<BiasAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState('url');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult(mockBiasAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getBiasLabel = (score: number) => {
    if (score >= 80) return { label: 'High Bias', color: 'text-red-600' };
    if (score >= 60) return { label: 'Moderate Bias', color: 'text-yellow-600' };
    if (score >= 40) return { label: 'Some Bias', color: 'text-blue-600' };
    return { label: 'Low Bias', color: 'text-green-600' };
  };

  const getCredibilityLabel = (score: number) => {
    if (score >= 80) return { label: 'High Credibility', color: 'text-green-600' };
    if (score >= 60) return { label: 'Moderate Credibility', color: 'text-blue-600' };
    if (score >= 40) return { label: 'Some Concerns', color: 'text-yellow-600' };
    return { label: 'Low Credibility', color: 'text-red-600' };
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display mb-6 text-sophisticated">Bias Detection Tool</h1>
            <p className="text-2xl text-elegant font-body max-w-3xl mx-auto leading-relaxed">
              Analyze political bias in articles and news content using sophisticated AI algorithms
            </p>
          </div>

          {/* Input Section */}
          <Card className="bg-white rounded-2xl shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-ink">
                Analyze Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">Article URL</TabsTrigger>
                  <TabsTrigger value="text">Text Content</TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                      <Input
                        placeholder="Paste article URL here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-12 pr-4 py-4 text-lg border-2 border-neutral-200 focus:border-cogito-blue"
                      />
                    </div>
                    <Button 
                      onClick={handleAnalyze}
                      disabled={!url || isAnalyzing}
                      className="bg-cogito-blue text-white hover:bg-blue-600 px-8 py-4"
                    >
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-5 w-5" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    placeholder="Paste article text here..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="min-h-[200px] border-2 border-neutral-200 focus:border-cogito-blue"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAnalyze}
                      disabled={!textContent || isAnalyzing}
                      className="bg-cogito-blue text-white hover:bg-blue-600 px-8 py-4"
                    >
                      {isAnalyzing ? (
                        <>
                          <motion.div
                            className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-5 w-5" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Results Section */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-ink flex items-center">
                    <BarChart3 className="mr-3 h-6 w-6" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Overall Bias Score */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-ink">Overall Bias Score</h3>
                      <Badge 
                        variant="secondary" 
                        className={`text-lg px-4 py-2 ${getBiasLabel(analysisResult.overallBias).color}`}
                      >
                        {getBiasLabel(analysisResult.overallBias).label}
                      </Badge>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={analysisResult.overallBias} 
                        className="h-4"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white mix-blend-difference">
                          {analysisResult.overallBias}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-600 mt-2">
                      <span>Unbiased</span>
                      <span>Highly Biased</span>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-neutral-600">Emotional Language</span>
                          <span className="text-sm font-medium text-cogito-blue">
                            {analysisResult.emotionalLanguage}%
                          </span>
                        </div>
                        <Progress value={analysisResult.emotionalLanguage} className="h-2" />
                        <p className="text-xs text-neutral-500 mt-1">
                          High use of emotionally charged words and phrases
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-neutral-600">Factual Content</span>
                          <span className="text-sm font-medium text-cogito-blue">
                            {analysisResult.factualContent}%
                          </span>
                        </div>
                        <Progress value={analysisResult.factualContent} className="h-2" />
                        <p className="text-xs text-neutral-500 mt-1">
                          Moderate use of verifiable facts and statistics
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-neutral-600">Source Credibility</span>
                          <span className="text-sm font-medium text-sage">
                            {analysisResult.sourceCredibility}%
                          </span>
                        </div>
                        <Progress value={analysisResult.sourceCredibility} className="h-2" />
                        <p className="text-xs text-neutral-500 mt-1">
                          {getCredibilityLabel(analysisResult.sourceCredibility).label}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-neutral-600">Balanced Reporting</span>
                          <span className="text-sm font-medium text-sage">
                            {analysisResult.balancedReporting}%
                          </span>
                        </div>
                        <Progress value={analysisResult.balancedReporting} className="h-2" />
                        <p className="text-xs text-neutral-500 mt-1">
                          Limited presentation of multiple perspectives
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
                    <h4 className="text-lg font-semibold text-ink mb-4 flex items-center">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5" />
                        Consider reading articles from opposing viewpoints on this topic
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5" />
                        Look for additional sources with higher factual content
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5" />
                        Be aware of emotionally charged language that may influence perception
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* How It Works */}
          <Card className="mt-8 bg-white rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-ink">
                How Bias Detection Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-cogito-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-ink mb-2">Content Analysis</h4>
                  <p className="text-sm text-neutral-600">
                    Our AI analyzes language patterns, word choice, and sentence structure
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-ink mb-2">Bias Scoring</h4>
                  <p className="text-sm text-neutral-600">
                    Multiple metrics are combined to create a comprehensive bias score
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-neutral-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-ink mb-2">Recommendations</h4>
                  <p className="text-sm text-neutral-600">
                    Get actionable insights to help you consume news more critically
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
