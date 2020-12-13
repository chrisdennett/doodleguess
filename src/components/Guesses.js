import React from "react";
import styled from "styled-components";

export const Guesses = ({ guessList }) => {
  if (!guessList) return null;

  const trimmedList = guessList.slice(0, 3);

  return (
    <List>
      <h2>Here's what I reckon you've drawn:</h2>
      {trimmedList.map((res) => {
        return <Guess key={res.label} guessData={res} />;
      })}
    </List>
  );
};

const Guess = ({ guessData }) => {
  const { label, confidence } = guessData;
  let guessName = label.split("_").join(" ");
  const confidenceDecimal = confidence.toFixed(2);
  const confidencePercentage = Math.round(confidenceDecimal * 100);

  const minTextSize = 1;
  const maxTextSize = 2;
  const range = maxTextSize - minTextSize;
  const textSize = minTextSize + confidenceDecimal * range;

  return (
    <GuessDiv style={{ fontSize: textSize + "em" }}>
      {guessName}: {confidencePercentage}%
    </GuessDiv>
  );
};

const List = styled.div`
  background: white;
  margin: 10px;
  padding: 10px;
  font-size: 1.3em;

  h2 {
    margin: 0;
  }
`;

const GuessDiv = styled.div`
  padding: 10px 0;
  text-transform: capitalize;
`;
