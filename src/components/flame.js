import React, { useState, useRef } from "react";
import "./flame.css";
// import flameAudioF from "./assets/flameF.mp3";
// import flameAudioL from "./assets/flameL.mp3";
// import flameAudioA from "../assests/music/flameA.mp3";
// import flameAudioM from "./assets/flameM.mp3";
// import flameAudioE from "./assets/flameE.mp3";
import Lottie from "lottie-react";
import flameanimationF from "../assests/animations/flameanimationF.json";
import flameanimationL from "../assests/animations/flameanimationL.json";
import flameanimationA from "../assests/animations/flameanimationA.json";
import flameanimationM from "../assests/animations/flameanimationM.json";
import flameanimationE from "../assests/animations/flameanimationE.json";




function NameEntry() {
  const audioRefs = {
    F: useRef(null),
    L: useRef(null),
    A: useRef(null),
    M: useRef(null),
    E: useRef(null),
  };
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");
  const [name1Striked, setName1Striked] = useState("");
  const [name2Striked, setName2Striked] = useState("");
  const [compatibilityDescription, setCompatibilityDescription] = useState("");
  const [name1Error, setName1Error] = useState("");
  const [name2Error, setName2Error] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state


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
    const audioRef = audioRefs[result];
    if (audioRef && audioRef.current) {
      audioRef.current.play();
    }
    setIsCalculating(false); // Clear loading indicator
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
      }, 1300);
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
    <>
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
        <button
          onClick={handlePlayFlameGame}
          disabled={isCalculating}
          className="button"
        >
          {isCalculating ? (
            <span className="calculating">Calculating...</span>
          ) : (
            "FLAMES"
          )}
        </button>
        <button className="button" onClick={handleResetGame}>
          Reset Game
        </button>

        <p className="strike">{name1Striked}</p>
        <p className="strike">{name2Striked}</p>
        <p className="result result-{result}"> {resultMeanings[result]}</p>
        <p className={`compatibility-description result-${result}`}>
          {compatibilityDescription}
        </p>
        {/* <audio ref={audioRefs.F} src={flameAudioF} />
      <audio ref={audioRefs.L} src={flameAudioL} /> */}
        {/* <audio ref={audioRefs.A} src={flameAudioA} /> */}
        {/* <audio ref={audioRefs.M} src={flameAudioM} />
      <audio ref={audioRefs.E} src={flameAudioE} /> */}
      </div>
      {loading & result==="F"?
      <div className="celebration"><Lottie style={{height:350}} animationData={flameanimationF} /></div>:""}
      {loading & result==="L"?
      <div className="celebration"><Lottie style={{height:350}} animationData={flameanimationL} /></div>:""}
      {loading & result==="A"?
      <div className="celebration"><Lottie style={{height:350}} animationData={flameanimationA} /></div>:""}
      {loading & result==="M"?
      <div className="celebration"><Lottie style={{height:350}} animationData={flameanimationM} /></div>:""}
      { loading & result==="E"?
      <div className="celebration"><Lottie style={{height:350}} animationData={flameanimationE} /></div>:""}
    </>
  );
}

export default NameEntry;
