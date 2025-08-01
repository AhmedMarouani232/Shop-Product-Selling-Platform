import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonField from "../components/Button";
import SideBar from "../components/SideBar";
import Question from "../components/Question";
import LoadingButton from "../components/loadingButton";

import { useNavigate } from "react-router-dom";
import { getQuestions, fillQuiz } from "../app/services/QuestionService";
import { useDispatch, useSelector } from 'react-redux';
import verifyAuth from "../components/VerifyAuth";
import ToggleButton from "../components/ToggleButton"; // Import the new component
import { setQuiz } from "../app/reducers/quizDataReducer"; // Import the setUser action
import { BorneType } from "../app/services/QuestionService";

const Container = styled.div`
    display: flex;
    width: 190%;
    max-width: 190%; /* Set a max width to avoid overflow */
    padding: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    flex-shrink: 0;
    align-self: stretch; 
    border-radius: 16px;
    background: var(--White, #FFF);
    /* Box shadow */
    box-shadow: 2px 2px 16px 0px rgba(0, 51, 204, 0.08); 
    margin : auto;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input {
        &[type="number"] {
            -moz-appearance: textfield;
        }
    }
    @media (max-width: 1025px) {
        margin: 1% 2%;
        width: 100%;
        flex-direction: column;
    }
`;

const Title = styled.p`
    color: var(--Tertiary-100, #C7B299);
    /* Titre / H3 */
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.44px; 
    margin-left: 10%;
    width: 70%;
`;

const Arrow = styled.a`
    margin-left: -2%;
    margin-top: -3%;
    @media (max-width: 1025px) {
        margin-left: -8%;

    }
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
`;

function EmplacementBorne() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const questionsState = useSelector((state) => state.questions.questions);
    const borneTypeState = useSelector((state) => state.borneType.BorneType);
    const user_pending_id = useSelector((state) => state.userPending?.userPendingStatus?.data?.pending_user_id);
    const savedQuiz = useSelector((state) => state.Quiz.quiz);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const [responses, setResponses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const [errors, setErrors] = useState({});
     
    const [finished, setFinished] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(questionsState) && questionsState.length > 0) {
            let selectedQuestion = {};
            const updatedResponses = questionsState
                .map((question, index) => {
                    const savedQuestion = savedQuiz.find(quiz => quiz.question_id === question.id);
                    let selectedResponses = [];
                    
                    // Ensure question.responses exists and is an array
                    if (!question.responses || !Array.isArray(question.responses)) {
                        console.warn(`Question ${question.id} has no responses array:`, question);
                        return {
                            ...question,
                            responses: [],
                            selectedResponses: []
                        };
                    }
                    
                    // If savedQuiz has data for this question, populate selectedResponses
                    if (savedQuestion) {
                        selectedResponses = question.responses
                            .filter(response => savedQuestion.responses_ids.includes(response.id))
                            .map(response => response.label);
        
                        // For INPUT type questions, use the response_input_value
                        if (question.question_type === "INPUT" && savedQuestion.response_input_value) {
                            selectedResponses = [savedQuestion.response_input_value];
                        }else if(question.question_type === "INPUT" && savedQuestion.response_input_value === undefined){
                            selectedResponses = [""];
                        }
                    } else {
                        // If no saved data, use default logic (first question gets borneTypeState)
                        selectedResponses = index === 0 ? [borneTypeState] : [];
                    }
                    selectedQuestion[question.id] = selectedResponses;
                    return {
                        ...question,
                        responses: [...question.responses] // Create a new array to avoid mutation
                            .map(response => ({ label: response.label, id: response.id })),
                        selectedResponses
                    };
                });
            setResponses(updatedResponses);
            setSelectedQuestion(selectedQuestion);
        }
    }, [questionsState, savedQuiz, borneTypeState]);
    
    useEffect(() => {
        if (Array.isArray(questionsState) && questionsState.length > 0) {
            const updatedResponses = questionsState
                .map((question, index) => {
                    const savedQuestion = savedQuiz.find(quiz => quiz.question_id === question.id);
                    
                    let selectedResponses = [];
                    
                    // Ensure question.responses exists and is an array
                    if (!question.responses || !Array.isArray(question.responses)) {
                        console.warn(`Question ${question.id} has no responses array:`, question);
                        return {
                            ...question,
                            responses: [],
                            selectedResponses: []
                        };
                    }
                    
                    // If savedQuiz has data for this question, populate selectedResponses
                    if (savedQuestion) {
                        selectedResponses = question.responses
                            .filter(response => savedQuestion.responses_ids.includes(response.id))
                            .map(response => response.label); // Ensure selectedResponses contains only labels (strings)
    
                        // For INPUT type questions, use the response_input_value
                        if (question.question_type === "INPUT" && savedQuestion.response_input_value) {
                            selectedResponses = [savedQuestion.response_input_value];
                        }
                    } else {
                        // If no saved data, use default logic (first question gets borneTypeState)
                        selectedResponses = index === 0 ? [borneTypeState] : [];
                    }
    
                    return {
                        ...question,
                        responses: [...question.responses] // Ensure immutability
                            .map(response => response.label),
                        selectedResponses
                    };
                });
            setQuestions(updatedResponses);
        }
    }, [questionsState, savedQuiz, borneTypeState]);

    const isQuestionVisible = (question) => {
        if (!question.current_response) return true;
        let includes = false;
        Object.keys(selectedQuestion).forEach(key => {
            if (selectedQuestion[key] && selectedQuestion[key].includes(question.current_response.label)) {
                includes = true;
            };
        });
        return includes;
    };

    const validateResponse = () => {
        let allValid = true;
        responses
        .filter(response => isQuestionVisible(response))
        .map(response => {
            if (response.selectedResponses.length === 0 || !response.selectedResponses[0] || parseInt(response.selectedResponses[0]) < 0) {
                if (response.question_type !== "INFORMATION") {
                    setErrors(prevErrors => ({ ...prevErrors, [response.id]: "Ce champ est obligatoire." }));
                    allValid = false;
                }
            }
        });
        return allValid;
    };

    const quiz = responses
    .filter(response => isQuestionVisible(response))
    .map(response => {
        // Ensure responses array exists and has items
        if (!response.responses || !Array.isArray(response.responses) || response.responses.length === 0) {
            console.warn(`Response ${response.id} has no valid responses array:`, response);
            return {
                question_id: response.id,
                responses_ids: [],
                ...(response.question_type === "INPUT" && response.selectedResponses.length > 0 && { 
                    response_input_value: response.selectedResponses.toString() 
                })
            };
        }

        const responseIds = response.question_type === "INPUT"
        ? [response.responses[0].id] 
        : response.selectedResponses.map(selected =>
            response.responses.find(resp => resp.label === selected)?.id
        ).filter(id => id !== undefined); // Filter out undefined IDs

        const response_input_value = response.question_type === "INPUT" && response.selectedResponses.length > 0 
            ? response.selectedResponses.toString() 
            : undefined; 

        return {
            question_id: response.id,
            responses_ids: responseIds,
            ...(response_input_value && { response_input_value }) // Include response_input_value only if it's not undefined
        };
    });

    const quizData = {
        user_pending_id,
        quiz
    };

    const handleSubmit = async () => {
        try {
            const validForm = validateResponse();
            if (validForm) {
                dispatch(setQuiz({ quiz }));
                if(quiz[0].responses_ids[0] === 1){
                    dispatch(BorneType(0)) // Câble attaché
                }else{
                    dispatch(BorneType(1)) // Prise T2S
                }
                setIsLoading(true)
                await dispatch(fillQuiz(quizData)).unwrap();
                setIsLoading(false)
                navigate("/totalDevis");
            } else {
                console.error("Errors found in form");
            }
        } catch (error) {
            console.error('Failed to submit quiz:', error);
        }
    };

    const popKeyIfPresent = (obj, key) => {
        if (obj && obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value) delete obj[key];
        }
        return obj;
    };

    const handleResponseChange = (questionId, selectedResponses) => {
        setResponses(prevResponses =>
            prevResponses.map(response =>
                response.id === questionId ? { ...response, selectedResponses } : response
            )
        );

        setSelectedQuestion({
            ...selectedQuestion, 
            [questionId]: selectedResponses
        });

        setErrors((prevErrors) => {
            // Use popKeyIfPresent to remove the error for the given questionId
            const updatedErrors = popKeyIfPresent(prevErrors, questionId);
          
            // Return the updated errors object
            return updatedErrors;
        });
    };
    console.log("questionsState", questionsState)
    console.log("borneTypeState", borneTypeState)

    return (
      <>
      <div style={{overflowYy: 'scroll'}} >
        <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
        <Container>
          <SideBar isOpen={isSideBarOpen} />
            <TitleContainer>
                <Arrow href="/choixBorne"><img src="images/Arrow.svg" alt="Arrow" /></Arrow>
                <Title>Configuration technique de l'installation</Title>
            </TitleContainer>
            {questions.map((question, index) => (
               isQuestionVisible(question) && question.responses && Array.isArray(question.responses) ? (
                <Question
                    key={question.id}
                    label={question.label}
                    questionId={question.id}
                    question_type={question.question_type ? question.question_type.split('_')[0] : "DROPDOWN"}
                    multiple={question.question_type === "CHECKBOX_MULTIPLE" || question.question_type === "DROPDOWN_MULTIPLE"}
                    responses={question.responses} 
                    onResponseChange={handleResponseChange}
                    error={errors?.[question.id]}
                    preSelected={question.selectedResponses || []}
                />) : null
            ))}
            <ButtonField onClick={handleSubmit} isLoading={isLoading} type="submit" variant="primary">Suivant</ButtonField>
            {/* <LoadingButton
                loading={loading}
                done={finished}
                onClick={() => {
                    // Clicked, so show the progress dialog
                    setLoading(true)

                    // In a 1.5 seconds, end the progress to show that it's done
                    setTimeout(() => { this.setState({ finished: true })}, 1500);
                }}
                >
                Click Meeeeeee
            </LoadingButton> */}
        </Container>
      </div>

        </>
    );
}
export default verifyAuth(EmplacementBorne);

