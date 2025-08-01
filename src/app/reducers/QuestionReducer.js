import { createSlice } from '@reduxjs/toolkit';
import {getQuestions, fillQuiz} from "../services/QuestionService";

// // createSlice automatically generates action creators and action types that correspond to the reducers and state.

export const QuestionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: null,
    status: 'idle',
    error: null,
    quizResponse: null,
    quizStatus: 'idle',
    quizError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fillQuiz.pending, (state) => {
        state.quizStatus = 'loading';
      })
      .addCase(fillQuiz.fulfilled, (state, action) => {
        state.quizStatus = 'succeeded';
        state.quizResponse = action.payload;
      })
      .addCase(fillQuiz.rejected, (state, action) => {
        state.quizStatus = 'failed';
        state.quizError = action.error.message;
      });
  },
});

export default QuestionsSlice.reducer;

