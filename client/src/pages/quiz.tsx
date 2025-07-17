import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { PoliticalCompass } from '@/components/political-compass';
import { QuizQuestion, QuizAnswer, PoliticalLeanings } from '@/lib/types';

const questions: QuizQuestion[] = [
  {
    id: '1',
    text: 'Government regulation of businesses is necessary to protect consumers and workers.',
    category: 'economic',
    weight: 1,
  },
  {
    id: '2',
    text: 'Free markets generally produce the best outcomes for society.',
    category: 'economic',
    weight: 1,
  },
  {
    id: '3',
    text: 'Higher taxes on wealthy individuals help reduce inequality.',
    category: 'economic',
    weight: 1,
  },
  {
    id: '4',
    text: 'Individual liberty should be prioritized over collective security.',
    category: 'social',
    weight: 1,
  },
  {
    id: '5',
    text: 'Climate change requires immediate government intervention.',
    category: 'economic',
    weight: 1,
  },
  {
    id: '6',
    text: 'Traditional family values are essential for society.',
    category: 'social',
    weight: 1,
  },
  {
    id: '7',
    text: 'Healthcare should be guaranteed as a right for all citizens.',
    category: 'economic',
    weight: 1,
  },
  {
    id: '8',
    text: 'Immigration benefits the economy and enriches culture.',
    category: 'social',
    weight: 1,
  },
  {
    id: '9',
    text: 'Military spending should be reduced to fund social programs.',
    category: 'economic',
    weight: 1,
  },
  {
    id: '10',
    text: 'Abortion should be legal and accessible to all women.',
    category: 'social',
    weight: 1,
  },
  {
    id: '11',
    text: 'Criminal justice should focus on rehabilitation over punishment.',
    category: 'social',
    weight: 1,
  },
  {
    id: '12',
    text: 'Religious freedom includes the right to discriminate based on beliefs.',
    category: 'social',
    weight: 1,
  },
];

const answerOptions = [
  { value: -2, text: 'Strongly Disagree' },
  { value: -1, text: 'Disagree' },
  { value: 0, text: 'Neutral' },
  { value: 1, text: 'Agree' },
  { value: 2, text: 'Strongly Agree' },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [politicalLeanings, setPoliticalLeanings] = useState<PoliticalLeanings | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      value: selectedAnswer,
      text: answerOptions.find(opt => opt.value === selectedAnswer)?.text || '',
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate results
      const results = calculatePoliticalLeanings(newAnswers);
      setPoliticalLeanings(results);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer(null);
    }
  };

  const calculatePoliticalLeanings = (answers: QuizAnswer[]): PoliticalLeanings => {
    let economicScore = 0;
    let socialScore = 0;
    let economicCount = 0;
    let socialCount = 0;

    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question?.category === 'economic') {
        economicScore += answer.value;
        economicCount++;
      } else if (question?.category === 'social') {
        socialScore += answer.value;
        socialCount++;
      }
    });

    const economicAverage = economicCount > 0 ? (economicScore / economicCount) * 50 : 0;
    const socialAverage = socialCount > 0 ? (socialScore / socialCount) * 50 : 0;

    // Determine label
    let label = '';
    if (economicAverage < -25) {
      label = 'Left-wing';
    } else if (economicAverage > 25) {
      label = 'Right-wing';
    } else {
      label = 'Centrist';
    }

    if (socialAverage < -25) {
      label += ' Authoritarian';
    } else if (socialAverage > 25) {
      label += ' Libertarian';
    } else {
      label += ' Moderate';
    }

    return {
      economic: economicAverage,
      social: socialAverage,
      label: label.trim(),
    };
  };

  if (showResults && politicalLeanings) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white rounded-2xl shadow-lg p-8">
                <CardContent>
                  <h2 className="text-3xl font-bold mb-8 text-center text-ink">
                    Your Political Compass
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-600">Economic Views</span>
                          <span className="font-semibold text-cogito-blue">
                            {politicalLeanings.economic > 0 ? 'Right' : 'Left'}
                          </span>
                        </div>
                        <Progress 
                          value={Math.abs(politicalLeanings.economic)} 
                          className="w-full"
                        />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-600">Social Issues</span>
                          <span className="font-semibold text-sage">
                            {politicalLeanings.social > 0 ? 'Libertarian' : 'Authoritarian'}
                          </span>
                        </div>
                        <Progress 
                          value={Math.abs(politicalLeanings.social)} 
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={() => {
                            setCurrentQuestionIndex(0);
                            setAnswers([]);
                            setSelectedAnswer(null);
                            setShowResults(false);
                            setPoliticalLeanings(null);
                          }}
                          className="w-full bg-cogito-blue text-white hover:bg-blue-600"
                        >
                          Retake Quiz
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-cogito-blue text-cogito-blue hover:bg-cogito-blue hover:text-white"
                        >
                          Save Results
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <PoliticalCompass leanings={politicalLeanings} size="large" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-ink">Discover Your Political Compass</h1>
            <p className="text-xl text-neutral-600">
              A thoughtful assessment to understand your political leanings
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white rounded-2xl shadow-lg p-8">
                <CardContent>
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-neutral-600">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <span className="text-sm font-medium text-neutral-600">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-6 text-ink leading-relaxed">
                      {currentQuestion.text}
                    </h3>
                    
                    <RadioGroup
                      value={selectedAnswer?.toString()}
                      onValueChange={(value) => handleAnswer(parseInt(value))}
                    >
                      <div className="space-y-4">
                        {answerOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-3">
                            <RadioGroupItem 
                              value={option.value.toString()} 
                              id={option.value.toString()}
                              className="text-cogito-blue"
                            />
                            <Label 
                              htmlFor={option.value.toString()}
                              className="text-lg cursor-pointer flex-1 p-4 border-2 border-neutral-200 rounded-lg hover:border-cogito-blue transition-colors"
                            >
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="text-neutral-600 hover:text-cogito-blue"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswer === null}
                      className="bg-cogito-blue text-white hover:bg-blue-600"
                    >
                      {currentQuestionIndex === questions.length - 1 ? (
                        <>
                          Finish
                          <Check className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
