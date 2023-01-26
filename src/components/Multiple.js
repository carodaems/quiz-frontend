import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const options = ["A", "B", "C", "D"];

function QuizAnswers() {
  const [questions, setQuestions] = useState([
    { question: "Question 1", correctAnswer: "" },
  ]);
  const { register, handleSubmit } = useForm();

  const handleChange = (questionIndex, correctAnswer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) => {
        if (index === questionIndex) {
          return { ...question, correctAnswer: correctAnswer };
        }
        return question;
      })
    );
  };

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: `Question ${prevQuestions.length + 1}`, correctAnswer: "" },
    ]);
  };

  const onSubmit = async (data) => {
    await axios.post("http://localhost:8000/quiz_rounds/1/answers/multiple", {
      answers: questions
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={(e) => handleChange(index, e.target.value)}
                checked={question.correctAnswer === option}
                ref={register}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Add Question
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuizAnswers;
