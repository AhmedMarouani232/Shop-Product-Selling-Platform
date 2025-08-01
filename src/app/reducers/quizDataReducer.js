import { createSlice } from '@reduxjs/toolkit';


export const QuizSlice = createSlice({
    name: 'Quiz',
    initialState: {
        quiz: []
    },
    reducers: { 
      setQuiz: (state, action) => {
        return { ...state, ...action.payload };
      },
      clearQuiz: (state) =>{
        return { quiz: []};
      }
    }
  });
  export const { setQuiz, clearQuiz } = QuizSlice.actions;
  export default QuizSlice.reducer;