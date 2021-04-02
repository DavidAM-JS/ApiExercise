import React from "react";

const divStyle = {
    backgroundColor: "#D9EAF8",
    margin: "50px",
    padding: "30px",
    borderRadius: "15px",
}
export const Card = ({ question, answers, correctAnswer, isCorrect }) => {
    const checkAnswer = (selectedAnswer) => {
        if (selectedAnswer === correctAnswer) {
            isCorrect(true);
        } else {
            isCorrect(false);
        }
    }

    const allAnswers = () => {
        return [...answers, correctAnswer];
    }

    return (
        <React.Fragment>
            <div style={divStyle}>
                <h2>{question}</h2>
                {allAnswers().map((answer, index) => (
                    <p key={index} onClick={() => checkAnswer(answer)}>
                        {answer}
                    </p>
                ))}
            </div>
        </React.Fragment>
    )
}