import { useState, useEffect, useRef } from "react";
import "./App.css";
import MathUtil from "./Utilities";

import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import Gameover from "./components/Gameover";

function App() {
  //NON STATE VARIABLES
  const pages = 111;
  const snApiBaseURL =
    "https://supernatural-quotes-api.cyclic.app/characters?page=";

  //STATE VARIABLES
  const [characters, setCharacters] = useState(null);
  const visitedCharacters = useRef([]);

  const score = useRef(0);
  const hiscore = useRef(0);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameReset, setIsGameReset] = useState(true);

  useEffect(() => {
    if (isGameReset) {
      setIsGameReset(false);
      const randomPage = MathUtil.RandRange(pages);
      fetch(snApiBaseURL + randomPage, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setCharacters(data.data);
        });
    }
  }, [isGameReset]);

  //EVENTS
  function handleCardClick(e) {
    const clickedCardId = e.target.dataset.id;

    if (
      !visitedCharacters.current.find(
        (character) => character.id === clickedCardId
      )
    ) {
      let newVisitiedCharacters = structuredClone(visitedCharacters.current);
      newVisitiedCharacters.push(
        characters.find((character) => character.id === clickedCardId)
      );

      score.current = newVisitiedCharacters.length;
      if (score.current >= hiscore.current)
        hiscore.current = newVisitiedCharacters.length;

      if (score.current === 10) {
        score.current = 0;
        visitedCharacters.current = [];
        setCharacters(null);
        setIsGameOver(true);
      } else {
        visitedCharacters.current = newVisitiedCharacters;
        shuffleCharacters();
      }
    } else {
      score.current = 0;
      visitedCharacters.current = [];
      setCharacters(null);
      setIsGameOver(true);
    }
  }

  function handleGameReset() {
    setIsGameOver(false);
    setIsGameReset(true);
  }

  function shuffleCharacters() {
    let newCharacters = structuredClone(characters);

    for (let i = newCharacters.length - 1; i > 0; i--) {
      let j = MathUtil.RandRange(i + 1);
      let temp = newCharacters[i];
      newCharacters[i] = newCharacters[j];
      newCharacters[j] = temp;
    }

    setCharacters(newCharacters);
  }

  if (!isGameOver) {
    return (
      <>
        <header>
          <h2>Supernatural Memory Game</h2>
        </header>
        <Scoreboard score={score.current} hiscore={hiscore.current} />
        <div id="game">
          {characters
            ? characters.map((character) => {
                return (
                  <Card
                    name={character.name}
                    src={character.img}
                    id={character.id}
                    key={character.id}
                    onCLick={handleCardClick}
                  />
                );
              })
            : "Loading..."}
        </div>
      </>
    );
  } else {
    return <Gameover onClick={handleGameReset} />;
  }
}

export default App;
