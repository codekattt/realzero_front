import React, { useState, useEffect } from 'react';

interface ITypingEffectProps {
  text: string;
}

const TypingEffect = ({ text }: ITypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [index, text]);

  return <p>{displayedText}</p>;
};

export default TypingEffect;
