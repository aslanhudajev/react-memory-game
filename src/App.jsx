import { useState, useEffect } from "react";
import "./App.css";
import MathUtil from "./Utilities";

function App() {
  //NON STATE VARIABLES
  const pages = 111;
  const snApiBaseURL =
    "https://supernatural-quotes-api.cyclic.app/characters?page=";
  let characters = [];
  let clickedCharacters = [];

  //STATE VARIABLES

  useEffect(() => {
    getCharacters();
  }, []);

  async function getCharacters() {
    const randomPage = await MathUtil.RandRange(pages);
    const resp = await fetch(snApiBaseURL + randomPage, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const respJson = await resp.json();
    characters = respJson.data;
  }

  return <>{characters[0].name}</>;
}

export default App;
