import { motion } from 'framer-motion';
import { Eye, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NewsArticle } from '@/lib/types';

interface ArticleCardProps {
  article: NewsArticle;
  perspective: 'opposing' | 'similar';
  onReadMore: (article: NewsArticle) => void;
}

export function ArticleCard({ article, perspective, onReadMore }: ArticleCardProps) {
  const perspectiveColors = {
    opposing: 'bg-cogito-blue/10 text-cogito-blue border-cogito-blue',
    similar: 'bg-sage/10 text-sage border-sage',
  };

  const buttonColors = {
    opposing: 'text-cogito-blue hover:text-blue-600',
    similar: 'text-sage hover:text-green-600',
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="perspective-card bg-white rounded-xl shadow-lg overflow-hidden">
        <CardContent className="p-6">
          {article.imageUrl && (
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          
          <div className="flex items-center space-x-3 mb-3">
            <span className={`text-sm font-medium px-2 py-1 rounded ${perspectiveColors[perspective]}`}>
              {article.source}
            </span>
            <span className="text-sm text-neutral-500">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>
          
          <h4 
            className="text-xl font-semibold mb-3 text-ink hover:text-cogito-blue transition-colors cursor-pointer line-clamp-2"
            onClick={() => onReadMore(article)}
          >
            {article.title}
          </h4>
          
          <p className="text-neutral-600 mb-4 line-clamp-3">
            {article.content}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-500">{article.viewCount} views</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className={buttonColors[perspective]}
              onClick={() => onReadMore(article)}
            >
              Read More
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
