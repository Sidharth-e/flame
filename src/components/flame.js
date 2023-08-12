import React, { useState } from "react";
import "./flame.css";

function NameEntry() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");
  const [name1Striked, setName1Striked] = useState("");
  const [name2Striked, setName2Striked] = useState("");
  const [compatibilityDescription, setCompatibilityDescription] = useState("");
  const [name1Error, setName1Error] = useState("");
  const [name2Error, setName2Error] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleName1Change = (event) => {
    setName1(event.target.value);
    setName1Error(""); // Clear any previous error messages
  };

  const handleName2Change = (event) => {
    setName2(event.target.value);
    setName2Error(""); // Clear any previous error messages
  };

  const handlePlayFlameGame = () => {
    if (name1.trim() === "") {
      setName1Error("Please enter a valid name.");
      return;
    }
    if (name2.trim() === "") {
      setName2Error("Please enter a valid name.");
      return;
    }
    setIsCalculating(true); // Set loading indicator
    const name1Chars = name1.toLowerCase().split("");
    const name2Chars = name2.toLowerCase().split("");

    const uniqueChars1 = name1Chars.filter(
      (char) => !name2Chars.includes(char)
    );
    const uniqueChars2 = name2Chars.filter(
      (char) => !name1Chars.includes(char)
    );

    const totalUniqueChars = uniqueChars1.length + uniqueChars2.length;
    const flameLetters = ["F", "L", "A", "M", "E"];

    const resultIndex = (totalUniqueChars - 1) % flameLetters.length;
    const resultString = flameLetters[resultIndex];
    setResult(resultString);
    setCompatibilityDescription(getCompatibilityDescription(resultString));

    const name1StrikedChars = name1Chars.map((char) =>
      uniqueChars1.includes(char) ? (
        <span className="nonstrikethrough">{char}</span>
      ) : (
        <span className="strikethrough">{char}</span>
      )
    );
    const name2StrikedChars = name2Chars.map((char) =>
      uniqueChars2.includes(char) ? (
        <span className="nonstrikethrough">{char}</span>
      ) : (
        <span className="strikethrough">{char}</span>
      )
    );
    setName1Striked(name1StrikedChars);
    setName2Striked(name2StrikedChars);
    setIsCalculating(false); // Clear loading indicator
  };

  const getCompatibilityDescription = (result) => {
    const descriptions = {
      F: "Friendship - Your names have a strong friendship!",
      L: "Lovers - Your names are destined to be together!",
      A: "Affectionate - There's a strong bond between your names.",
      M: "Marriage Material - Your names complement each other well.",
      E: "Enemies - Uh oh, there might be some conflict between your names!",
    };
    return descriptions[result] || "Oops! Something went wrong.";
  };
  const handleResetGame = () => {
    setName1("");
    setName2("");
    setResult("");
    setName1Striked("");
    setName2Striked("");
    setCompatibilityDescription("");
  };

  const resultMeanings = {
    F: "Friendship",
    L: "Love",
    A: "Affection",
    M: "Marriage",
    E: "Enemies",
  };
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Enter Name 1"
        value={name1}
        className="input-field"
        onChange={handleName1Change}
      />
      <span className="error">{name1Error}</span>
      <input
        type="text"
        placeholder="Enter Name 2"
        value={name2}
        className="input-field"
        onChange={handleName2Change}
      />
      <span className="error">{name2Error}</span>
      <button onClick={handlePlayFlameGame} disabled={isCalculating} className="button">
        {isCalculating ?  <span className="calculating">Calculating...</span>: "FLAMES"}
      </button>
      <button className="button" onClick={handleResetGame}>Reset Game</button>

      <p className="strike">{name1Striked}</p>
      <p className="strike">{name2Striked}</p>
      <p className="result result-{result}">{resultMeanings[result]}</p>
      <p className={`compatibility-description result-${result}`}>
        {compatibilityDescription}
      </p>
      
    </div>
  );
}

export default NameEntry;
