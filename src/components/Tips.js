import React from "react";
import styled from "styled-components";

export const Tips = () => {
  return (
    <Outer>
      <h1>Things to try:</h1>
      <div>
        {things.map((t) => (
          <Suggestion key={t}>{t}</Suggestion>
        ))}
      </div>
    </Outer>
  );
};

const Outer = styled.div`
  padding: 20px;
`;

const Suggestion = styled.div`
  display: inline-block;
  padding: 10px;
  background-color: white;
  margin: 5px;
  font-size: 1.2em;
`;

const things = [
  "strawberry",
  "cat",
  "catus",
  "feather",
  "church",
  "panda",
  "folk",
  "toe",
  "t-shirt",
  "laptop",
  "hammer",
  "bat",
  "binoculars",
  "bed",
  "eye",
  "owl",
  "umbrella",
  "light bulb",
  "dumbell",
];
