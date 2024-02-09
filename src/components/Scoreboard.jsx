function Scoreboard({ score, hiscore }) {
  return (
    <div className="scoreboard">
      <span id="score">Score: {score}</span>
      <span id="hiscore">High score: {hiscore}</span>
    </div>
  );
}

export default Scoreboard;
