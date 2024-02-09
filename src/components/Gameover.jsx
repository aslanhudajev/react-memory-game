function Gameover({ onClick }) {
  return (
    <div id="overlay">
      <div className="game-finish">
        <h1>Game over</h1>
        <button onClick={onClick}>Restart</button>
      </div>
    </div>
  );
}

export default Gameover;
