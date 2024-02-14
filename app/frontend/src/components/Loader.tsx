import React, { useEffect, useState } from "react";

export default function () {
  const [text, setText] = useState("Loading");
  const [numDots, setNumDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumDots((numDots) => (numDots + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setText(`Loading${".".repeat(numDots)}`);
  }, [numDots]);
  return (
    <code>
      {text}
    </code>
  );
}
