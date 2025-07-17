import { motion } from 'framer-motion';
import { RotateCcw, Bookmark, TrendingUp, ExternalLink, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PoliticalCompass } from '@/components/political-compass';
import { VisualEffects } from '@/components/visual-effects';
import { PoliticalLeanings, ReadingStats } from '@/lib/types';

// Mock data for demonstration
const mockPoliticalLeanings: PoliticalLeanings = {
  economic: -35,
  social: 45,
  label: 'Center-Left Libertarian',
};

const mockReadingStats: ReadingStats = {
  totalArticles: 42,
  opposingViewsPercentage: 73,
  averageReadingTime: 8.5,
  favoriteTopics: ['Climate Change', 'Healthcare', 'Technology'],
};

const mockReadingHistory = [
  {
    id: '1',
    title: 'Climate Policy Analysis',
    description: "Biden's approach to environmental regulation",
    source: 'The Progressive Post',
    perspective: 'Opposite',
    date: '2 hours ago',
  },
  {
    id: '2',
    title: 'Healthcare Reform Options',
    description: 'Market-based vs. universal approaches',
    source: 'Market Health Journal',
    perspective: 'Similar',
    date: '1 day ago',
  },
  {
    id: '3',
    title: 'Technology Innovation Policy',
    description: 'Government role in tech regulation',
    source: 'Tech Policy Review',
    perspective: 'Opposite',
    date: '2 days ago',
  },
];

const mockRecentActivity = [
  { type: 'read', text: 'Read "Climate Policy Analysis"', color: 'bg-cogito-blue' },
  { type: 'saved', text: 'Saved "Healthcare Reform"', color: 'bg-sage' },
  { type: 'quiz', text: 'Completed quiz update', color: 'bg-neutral-400' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-matte pt-20 relative overflow-hidden">
      <VisualEffects />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl olive-header mb-6">Your Perspective Dashboard</h1>
            <p className="text-2xl text-ivory font-body max-w-2xl mx-auto leading-relaxed">
              Track your political journey and reading habits
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Political Compass Card */}
            <div className="lg:col-span-2">
              <Card className="glass-card olive-border rounded-2xl luxury-gradient">
                <CardHeader>
                  <CardTitle className="text-3xl olive-header mb-2">Your Political Compass</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <PoliticalCompass leanings={mockPoliticalLeanings} size="medium" />
                  </div>

                  {/* Reading Statistics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-card olive-border rounded-lg p-4">
                      <div className="olive-metric mb-1">{mockReadingStats.opposingViewsPercentage}%</div>
                      <div className="text-sm text-ivory">Articles from opposing views</div>
                    </div>
                    <div className="glass-card olive-border rounded-lg p-4">
                      <div className="olive-metric mb-1">{mockReadingStats.totalArticles}</div>
                      <div className="text-sm text-ivory">Articles read this month</div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-card olive-border rounded-lg p-4">
                      <div className="text-lg font-semibold text-olive mb-1">{mockReadingStats.averageReadingTime} min</div>
                      <div className="text-sm text-ivory">Average reading time</div>
                    </div>
                    <div className="glass-card olive-border rounded-lg p-4">
                      <div className="text-lg font-semibold text-olive mb-1">{mockReadingStats.favoriteTopics.length} topics</div>
                      <div className="text-sm text-ivory">Areas of interest</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="glass-card olive-border rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl olive-header">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full button-olive"> <RotateCcw className="mr-2 h-4 w-4" />Retake Quiz</Button>
                    <Button variant="outline" className="w-full button-olive"> <Bookmark className="mr-2 h-4 w-4" />Saved Articles</Button>
                    <Button variant="outline" className="w-full button-olive"> <TrendingUp className="mr-2 h-4 w-4" />View Analytics</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-card olive-border rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl olive-header">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 olive-tag rounded-full"></div>
                        <span className="text-ivory">{activity.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Favorite Topics */}
              <Card className="glass-card olive-border rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl olive-header">Favorite Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockReadingStats.favoriteTopics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="olive-tag text-sm">{topic}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reading History */}
          <Card className="mt-12 glass-card olive-border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl olive-header">Reading History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b olive-border">
                      <th className="text-left py-3 px-4 text-olive font-medium">Article</th>
                      <th className="text-left py-3 px-4 text-olive font-medium">Source</th>
                      <th className="text-left py-3 px-4 text-olive font-medium">Perspective</th>
                      <th className="text-left py-3 px-4 text-olive font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-olive font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReadingHistory.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        className="border-b olive-border hover:bg-charcoal transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="py-3 px-4">
                          <div className="font-medium text-ivory">{item.title}</div>
                          <div className="text-sm text-sage">{item.description}</div>
                        </td>
                        <td className="py-3 px-4 text-sage">{item.source}</td>
                        <td className="py-3 px-4">
                          <Badge variant={item.perspective === 'Opposite' ? 'default' : 'secondary'} className="olive-tag">
                            {item.perspective}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-ivory">{item.date}</td>
                        <td className="py-3 px-4">
                          <Button size="sm" className="button-olive">View</Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
