function Progess({ index, numQuesitons, totalPoints, points, answer }) {
  return (
    <header className="progress">
      <progress max={numQuesitons} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong> / {numQuesitons}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} points
      </p>
    </header>
  );
}

export default Progess;
