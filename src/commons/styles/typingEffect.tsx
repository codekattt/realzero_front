import React, { useState, useEffect } from 'react';

interface ITypingEffectProps {
  text: string;
  speed?: number;
  chunkSize?: number;
  onComplete?: () => void;
}

const TypingEffect = ({
  text,
  speed = 30,
  chunkSize = 1,
  onComplete,
}: ITypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text.slice(index, index + chunkSize));
        setIndex((prev) => prev + chunkSize);
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      onComplete?.();
    }
  }, [index, text, speed, chunkSize]);

  return <p>{displayedText}</p>;
};

export default TypingEffect;
