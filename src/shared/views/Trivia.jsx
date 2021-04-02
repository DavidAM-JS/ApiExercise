import React, { useEffect, useState } from "react";
import { Card } from '../organisms/Card';
import { fetchQuestions } from '../services/triviaService';

const counterStyle = {
    backgroundColor: "#D9EAF8",
    margin: "50px",
    padding: "30px",
    borderRadius: "15px",
}

const buttonStyle = {
    fontSize: "20px",
    margin: "10px",
}

const buttonNavigation = {
    textAlign: "center",
}

export const Trivia = () => {
    const [questions, updatedQuestions] = useState();
    const [isLoading, updateLoading] = useState(true);
    const [questionNo, updateQuestionNo] = useState(0);
    const [score, updateScore] = useState(0);

    useEffect(() => {
        const receivedQuestions = async () => {
            updatedQuestions(await fetchQuestions());
            updateLoading(false);
        }
        receivedQuestions();
    }, []);

    const handleCallback = (isCorrect) => {
        if (isCorrect) {
            updateScore(score + 1);
        }
    }

    const handleQuestionJump = (step) => {
        if (questionNo < 9 && step === "forth") {
            updateQuestionNo(questionNo + 1);
        }
        if (questionNo > 0 && step === "back") {
            updateQuestionNo(questionNo - 1);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!isLoading) {
        return (
            <React.Fragment>
                <p style={counterStyle}>SCORE: {score}/10</p>
                <Card
                    question={questions[questionNo].question}
                    answers={questions[questionNo].incorrect_answers}
                    correctAnswer={questions[questionNo].correct_answer}
                    isCorrect={handleCallback} />

                <div style={buttonNavigation}>
                    <button style={buttonStyle}
                        onClick={() => handleQuestionJump("back")}>
                        Previous
                </button>
                    <button style={buttonStyle}
                        onClick={() => handleQuestionJump("forth")}>
                        Next
                </button>
                </div>
            </React.Fragment>
        );
    }
}