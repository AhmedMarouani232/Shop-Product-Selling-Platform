// Combine Reducers
import { combineReducers } from 'redux';
import { QuestionsSlice } from "./QuestionReducer";
import { userReducer } from "./userReducer";
import { UserPendingSlice } from "./userPendingReducer";
import {BorneTypeSlice} from "./borneTypeReducer";
import { ClientSlice } from './ClientReducer';
import { TimeslotsSlice } from './praxedoReducer';
import { DevisSlice } from './devisReducer';
import { QuizSlice } from './quizDataReducer';
import { StoresSlice } from './magasinReducer';


const rootReducer = combineReducers({
    user: userReducer,
    questions: QuestionsSlice.reducer,
    userPending : UserPendingSlice.reducer,
    borneType: BorneTypeSlice.reducer,
    client: ClientSlice.reducer,
    timeSlots: TimeslotsSlice.reducer,
    devis: DevisSlice.reducer,
    Quiz: QuizSlice.reducer,
    Stores: StoresSlice.reducer,
  });
  
export default rootReducer;
