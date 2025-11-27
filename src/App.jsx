import { useState } from 'react';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import { quizData } from './data/quizData';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'quiz', 'result'
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [score, setScore] = useState(0);

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    setCurrentView('quiz');
  };

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setCurrentView('result');
  };

  const handleRestart = () => {
    setCurrentView('landing');
    setSelectedTopic(null);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#A8D0E6] to-[#EEF7FF]">
      {currentView === 'landing' && (
        <LandingPage onTopicSelect={handleTopicSelect} />
      )}
      
      {currentView === 'quiz' && selectedTopic && (
        <QuizPage
          topic={quizData[selectedTopic].title}
          questions={quizData[selectedTopic].questions}
          onComplete={handleQuizComplete}
        />
      )}
      
      {currentView === 'result' && (
        <ResultPage score={score} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
