import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateQuizResults } from '../state/quizSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

const QuizPage = () => {
  const dispatch = useDispatch();
  const quiz = useSelector(state => state.quiz.selectedQuiz);
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="text-black p-4 text-center font-semibold">
        Loading quiz data or quiz not found...
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;

  const handleAnswerChange = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    setShowCompleteModal(true);
  };

  const confirmComplete = () => {
    const correctAnswers = quiz.questions.map(q => q.correctAnswer);
    const grade = Object.keys(selectedAnswers).reduce((score, index) => {
      return score + (selectedAnswers[index] === correctAnswers[index] ? 1 : 0);
    }, 0);
    dispatch(updateQuizResults({ id: quiz.id, grade }));
    navigate('/quiz-list');
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isDisabled = selectedAnswers[currentQuestionIndex] === undefined;

  // Calculate progress percent for progress bar
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="container py-6 max-w-3xl mx-auto">
      <div className="card shadow-lg p-6 bg-white text-black rounded-lg">
        <h1 className="text-center mb-6 text-3xl font-extrabold">{quiz.title}</h1>

        {/* Progress Bar */}
        <div className="mb-5">
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              role="progressbar"
              aria-label="Quiz Progress"
            />
          </div>
          <p className="text-center text-sm mt-1 font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold">{currentQuestion.text}</h2>

          <form>
            <fieldset>
              <legend className="sr-only">Answer choices</legend>
              <div className="flex flex-col gap-3">
                {currentQuestion.choices.map((choice, index) => (
                  <label
                    key={index}
                    htmlFor={`choice-${index}`}
                    className={`cursor-pointer p-3 rounded border
                      ${
                        selectedAnswers[currentQuestionIndex] === choice
                          ? 'border-blue-600 bg-blue-100'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      } 
                      transition-colors duration-200`}
                  >
                    <input
                      type="radio"
                      id={`choice-${index}`}
                      name={`question-${currentQuestionIndex}`}
                      value={choice}
                      checked={selectedAnswers[currentQuestionIndex] === choice}
                      onChange={() => handleAnswerChange(choice)}
                      className="mr-3 align-middle"
                    />
                    <span className="align-middle">{choice}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className={`btn ${
              currentQuestionIndex === 0 ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'
            }`}
            aria-disabled={currentQuestionIndex === 0}
            type="button"
          >
            Back
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleComplete}
              disabled={isDisabled}
              className={`btn ${
                isDisabled ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-success'
              }`}
              aria-disabled={isDisabled}
              type="button"
            >
              Complete
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isDisabled}
              className={`btn ${
                isDisabled ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'
              }`}
              aria-disabled={isDisabled}
              type="button"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Complete Confirmation Modal */}
      {showCompleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Complete Quiz?</h3>
            <p className="mb-6">
              Are you sure you want to complete the quiz? You won&apos;t be able to change your answers afterwards.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="btn btn-secondary"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={confirmComplete}
                className="btn btn-success"
                type="button"
              >
                Yes, Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;




