import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateQuizResults } from '../state/quizSlice';

const QuizPage = () => {
    const dispatch = useDispatch()
    const quiz = useSelector(state => state.quiz.selectedQuiz);
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleAnswerChange = (answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: answer
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleComplete = () => {
        console.log("Quiz Completed!", selectedAnswers);
        const correctAnswers = quiz.questions.map(q => q.correctAnswer);
        const grade = Object.keys(selectedAnswers).reduce((score, index) => {
            return score + (selectedAnswers[index] === correctAnswers[index] ? 1 : 0);
        }, 0);
        alert(`You got ${grade}`)
        dispatch(updateQuizResults({ id: quiz.id, grade }))
        navigate('/quiz-list')
    };

    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    const isDisabled = selectedAnswers[currentQuestionIndex] === undefined;

    return (
        <div style={styles.container}>
            <h1>{quiz.title}</h1>
            <div style={styles.questionSection}>
                <h2>{currentQuestion.text}</h2>
                <div style={styles.choicesSection}>
                    {currentQuestion.choices.map((choice, index) => (
                        <label key={index} style={styles.choiceLabel}>
                            <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                value={choice}
                                checked={selectedAnswers[currentQuestionIndex] === choice}
                                onChange={() => handleAnswerChange(choice)}
                                style={styles.radioInput}
                            />
                            {choice}
                        </label>
                    ))}
                </div>
            </div>
            <div style={styles.navigationButtons}>
                <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    style={{
                        ...styles.navButton,
                        ...(currentQuestionIndex === 0 ? styles.disabledButton : {})
                    }}
                >
                    Back
                </button>
                {isLastQuestion ? (
                    <button
                        onClick={handleComplete}
                        disabled={isDisabled}
                        style={{
                            ...styles.navButton,
                            ...(isDisabled ? styles.disabledButton : {})
                        }}
                    >
                        Complete
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        disabled={isDisabled}
                        style={{
                            ...styles.navButton,
                            ...(isDisabled ? styles.disabledButton : {})
                        }}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

// Basic styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        color: 'white',
        margin: 'auto',
    },
    questionSection: {
        marginBottom: '20px',
    },
    choicesSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    choiceLabel: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    radioInput: {
        marginRight: '10px',
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    navButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    disabledButton: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
};

export default QuizPage;
