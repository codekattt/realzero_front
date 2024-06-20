import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100); // 100ms 간격으로 타이핑 효과
      return () => clearTimeout(timeoutId);
    }
  }, [index, text]);

  return <p>{displayedText}</p>;
};

export default TypingEffect;
