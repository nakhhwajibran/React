function Option({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  function handleSelectAnswer(answerId) {
    dispatch({ type: "newAnswer", payload: answerId });
  }

  return (
    <div className="options">
      {question.options.map((option, optionId) => {
        return (
          <button
            onClick={() => handleSelectAnswer(optionId)}
            className={`
            btn btn-option 
            ${optionId === answer ? "answer" : ""} 
            
            ${
              hasAnswered
                ? optionId === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }
            `}
            key={option}
            disabled={hasAnswered}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Option;
