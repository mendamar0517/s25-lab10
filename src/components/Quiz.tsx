import React, { useState } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';

const quizCore = new QuizCore();

const Quiz: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, forceUpdate] = useState({}); // Хуудас дахин зурах

  const currentQuestion: QuizQuestion | null = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      quizCore.nextQuestion();
      setSelectedAnswer(null);
      forceUpdate({});
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted || !currentQuestion) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} / {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Question {quizCore['currentQuestionIndex'] + 1}:</h2>
      <p>{currentQuestion.question}</p>

      <ul className="options-list">
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <div className="button-group">
        {quizCore.hasNextQuestion() ? (
          <button disabled={!selectedAnswer} onClick={handleNext}>
            Next Question
          </button>
        ) : (
          <button disabled={!selectedAnswer} onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
