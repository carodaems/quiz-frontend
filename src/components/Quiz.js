import React, { useState } from 'react';
import axios from 'axios';

const QuizAnswers = () => {
  const [roundId, setRoundId] = useState('');
  const [questionNumber, setQuestionNumber] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleRoundIdChange = event => {
    setRoundId(event.target.value);
  };

  const handleQuestionNumberChange = event => {
    setQuestionNumber(event.target.value);
  };

  const handleSelectedAnswerChange = event => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await axios.post(`https://quiz-service-carodaems.cloud.okteto.net/quiz_rounds/${roundId}/questions/`, {
      answer: selectedAnswer
    });

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Round ID:
        <input type="text" value={roundId} onChange={handleRoundIdChange} required/>
      </label>
      <br />
      <label>
        Correct Answer:
        <div>
          <input
            type="radio"
            name="answer"
            value="A"
            checked={selectedAnswer === "A"}
            onChange={handleSelectedAnswerChange}
            required
          />
          A
        </div>
        <div>
          <input
            type="radio"
            name="answer"
            value="B"
            checked={selectedAnswer === "B"}
            onChange={handleSelectedAnswerChange}
          />
          B
        </div>
        <div>
          <input
            type="radio"
            name="answer"
            value="C"
            checked={selectedAnswer === "C"}
            onChange={handleSelectedAnswerChange}
          />
          C
        </div>
        <div>
          <input
            type="radio"
            name="answer"
            value="D"
            checked={selectedAnswer === "D"}
            onChange={handleSelectedAnswerChange}
          />
          D
        </div>
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default QuizAnswers;
