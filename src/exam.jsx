import React, { useState, useEffect } from 'react';

const Exam = () => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute1 in seconds
  const [questions] = useState([
    'What is your name?',
    'What is your favorite color?',
    'What is your favorite food?'
  ]);
  const [answers, setAnswers] = useState(['', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // You can handle submission logic here
    console.log('Answers submitted:', answers);
    setIsSubmitted(true);
  };

  return (
    <div>
      <h1>Exam</h1>
      <div>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
      {isSubmitted ? (
        <div>
          <h2>Answers submitted successfully!</h2>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <strong>Question {index + 1}:</strong> {question}<br />
                <strong>Your Answer:</strong> {answers[index]}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Questions</h2>
          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div key={index}>
                <label htmlFor={`question-${index + 1}`}>Question {index + 1}: {question}</label><br />
                <input
                  type="text"
                  id={`question-${index + 1}`}
                  value={answers[index]}
                  onChange={event => handleChange(index, event)}
                  required
                /><br />
              </div>
            ))}
            <button type="submit">Submit Answers</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Exam;
