import { useState, useEffect, useRef } from "react";
import "./App.css";
import MathUtil from "./Utilities";

import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";

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

  const [isGameOver, setIsGameOver] = useState(true);

  useEffect(() => {
    if (isGameOver) {
      setIsGameOver(false);
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
  }, [isGameOver]);

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
      visitedCharacters.current = newVisitiedCharacters;

      shuffleCharacters();
    } else {
      score.current = 0;
      visitedCharacters.current = [];
      setCharacters(null);
      setIsGameOver(true);
    }
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
}

export default App;
