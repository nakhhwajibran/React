function StartScreen({ numQuestions, dispatch }) {
  function handleLetStart() {
    dispatch({ type: "start" });
  }
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!!!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button onClick={handleLetStart} className="btn">
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
