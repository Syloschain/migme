
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const SAMPLE_QUESTIONS: TriviaQuestion[] = [
  {
    id: "q1",
    question: "Which of these was a feature in the original migme platform?",
    options: ["Video calling", "Virtual gifts", "Desktop application", "Cryptocurrency trading"],
    correctAnswer: 1
  },
  {
    id: "q2",
    question: "What was migme originally known as?",
    options: ["myChat", "mig33", "migMe", "migTalk"],
    correctAnswer: 1
  },
  {
    id: "q3",
    question: "What is required to create a chat group in migme?",
    options: ["Level 5", "Level 10", "Level 20", "Level 50"],
    correctAnswer: 2
  }
];

const TriviaMiniGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];
  
  const handleSelectOption = (optionIndex: number) => {
    if (selectedOption !== null) return; // Already answered
    setSelectedOption(optionIndex);
    
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "+5 XP earned",
      });
    } else {
      toast({
        title: "Wrong answer",
        description: "Better luck next time!",
        variant: "destructive",
      });
    }
  };
  
  const handleNextQuestion = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameComplete(true);
      }
      setIsLoading(false);
    }, 500);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setGameComplete(false);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>migme Trivia</CardTitle>
        <CardDescription>
          Test your knowledge and earn XP!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!gameComplete ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {SAMPLE_QUESTIONS.length}
            </div>
            <div className="text-lg font-medium">
              {currentQuestion.question}
            </div>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start h-auto py-3 px-4 ${
                    selectedOption === index
                      ? index === currentQuestion.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : ""
                  }`}
                  onClick={() => handleSelectOption(index)}
                  disabled={selectedOption !== null}
                >
                  <span className="mr-2">{String.fromCharCode(65 + index)}.</span> {option}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="text-4xl font-bold">{score}/{SAMPLE_QUESTIONS.length}</div>
            <div className="text-xl">
              {score === SAMPLE_QUESTIONS.length
                ? "Perfect score! You're a migme expert!"
                : score >= SAMPLE_QUESTIONS.length / 2
                ? "Good job! Keep learning about migme!"
                : "Keep trying to improve your score!"}
            </div>
            <div className="text-sm text-muted-foreground">
              You earned {score * 5} XP from this game.
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm font-medium">
          Score: {score}/{SAMPLE_QUESTIONS.length}
        </div>
        {!gameComplete ? (
          <Button 
            onClick={handleNextQuestion} 
            disabled={selectedOption === null || isLoading}
          >
            {isLoading ? "Loading..." : "Next Question"}
          </Button>
        ) : (
          <Button onClick={handleRestart}>
            Play Again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TriviaMiniGame;
