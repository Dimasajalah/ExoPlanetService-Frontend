// pages/QuizList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedQuiz } from '../state/quizSlice';
import quizBackground from '../assets/quiz-back.jpg';

const QuizList = () => {
  const quizzes = useSelector(state => state.quiz.quizzes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (quiz) => {
    dispatch(setSelectedQuiz(quiz));
    navigate('/quiz');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Planetary Quizzes</h1>
      <div style={styles.quizList}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} style={styles.quizItem}>
            <span style={styles.quizTitle}>{quiz.title}</span>
            <div style={styles.statusAndButton}>
              <span
                style={{
                  ...styles.statusIndicator,
                  backgroundColor: quiz.completed ? '#4caf50' : '#a44fb5',
                }}
              >
                {quiz.completed
                  ? `${quiz.maxGrade} / ${quiz.questions.length}`
                  : 'Pending'}
              </span>
              <button
                onClick={() => handleClick(quiz)}
                style={styles.toggleButton}
              >
                {quiz.completed ? 'Retry' : 'Solve'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url(${quizBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '100px',
  },
  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  quizList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  quizItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  quizTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  statusAndButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '10px',
  },
  statusIndicator: {
    padding: '5px 10px',
    borderRadius: '15px',
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default QuizList;

