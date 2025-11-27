import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const QuizPage = ({ topic, questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(selectedAnswers[currentQuestion + 1] ?? null);
    } else {
      // Quiz completed - calculate score
      let correctCount = 0;
      questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctCount++;
        }
      });
      const percentage = Math.round((correctCount / questions.length) * 100);
      onComplete(percentage);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(selectedAnswers[currentQuestion - 1] ?? null);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Outer container with gradient border effect */}
        <div className="bg-linear-to-br from-[#B8D5E8] via-[#D5E8F3] to-[#E8F3F8] p-8 rounded-[2.5rem] shadow-2xl">
          {/* Quiz Card */}
          <div className="relative">
            {/* Encouragement (left side) */}
            {currentQuestion === 0 && (
              <div className="absolute -left-40 bottom-8 hidden lg:block z-10">
                <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-[#E0EEF7]">
                  <div className="text-sm text-[#6B7C8F] mb-2 font-medium">Best of Luck !</div>
                  <div className="flex justify-center">
                    <Sparkles className="w-12 h-12 text-[#2F6E8E]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            )}

            {/* Main Quiz Card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-[#2A6073] mb-3 italic">
                  Test Your Knowledge
                </h1>
                <p className="text-[#6B7C8F]">Answer all questions to see your results</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex gap-1 mb-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                        index < currentQuestion
                          ? 'bg-[#2F6E8E]'
                          : index === currentQuestion
                          ? 'bg-[#2F6E8E]'
                          : 'bg-[#C9DDEB]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="bg-[#D7ECF8] rounded-xl p-4 mb-6">
                <p className="text-[#2A6073] font-medium text-center">
                  {currentQuestion + 1}. {question.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full p-4 rounded-xl text-[#2A6073] font-medium 
                             transition-all duration-200 border-2 text-left
                             ${
                               selectedOption === index
                                 ? 'bg-[#C4E3F5] border-[#2F6E8E] shadow-md scale-[1.02]'
                                 : 'bg-[#D7ECF8] border-transparent hover:bg-[#C4E3F5] hover:border-[#E0EEF7]'
                             }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`w-12 h-12 rounded-full flex items-center justify-center 
                           transition-all duration-200 
                           ${
                             currentQuestion === 0
                               ? 'bg-gray-200 cursor-not-allowed opacity-50'
                               : 'bg-[#E6F2FA] hover:bg-[#C4E3F5] hover:shadow-md'
                           }`}
                >
                  <ChevronLeft className="w-6 h-6 text-[#4A6C82]" strokeWidth={2} />
                </button>

                <button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  className={`w-12 h-12 rounded-full flex items-center justify-center 
                           transition-all duration-200 
                           ${
                             selectedOption === null
                               ? 'bg-gray-200 cursor-not-allowed opacity-50'
                               : 'bg-[#E6F2FA] hover:bg-[#C4E3F5] hover:shadow-md'
                           }`}
                >
                  <ChevronRight className="w-6 h-6 text-[#4A6C82]" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
