// redux/slices/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';
import quizzesData from "../assets/quizzes.json";

// Add the initial properties 'completed' and 'maxGrade' to each quiz
const initialState = {
    quizzes: quizzesData.map(quiz => ({
        ...quiz,
        completed: false,
        maxGrade: 0
    })),
    selectedQuiz: {
        id: null,
        title: null,
        questions: []
    },
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setMaxGrade: (state, action) => {
            const { id, maxGrade } = action.payload;
            const quiz = state.quizzes.find(q => q.id === id);
            if (quiz) {
                quiz.maxGrade = maxGrade;
            }
        },
        setSelectedQuiz: (state, action) => {
            state.selectedQuiz = action.payload
        },
        updateQuizResults: (state, action) => {
            const quiz = state.quizzes.find(q => q.id === action.payload.id);
            if (quiz) {
                quiz.completed = true;
            }
            quiz.maxGrade = Math.max(action.payload.grade, quiz.maxGrade)

        },
    },
});

export const { setMaxGrade, setSelectedQuiz, updateQuizResults } = quizSlice.actions;
export default quizSlice.reducer;
