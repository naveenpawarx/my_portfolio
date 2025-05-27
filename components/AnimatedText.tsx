
import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
  speed?: number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements; // Allow specifying HTML tag
  onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, speed = 50, className = '', tag: Tag = 'span', onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    } else if (currentIndex === text.length && text.length > 0) {
        if(onComplete) onComplete();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, text, speed]);

  return <Tag className={`${className} ${currentIndex < text.length ? 'hacker-caret' : ''}`}>{displayedText}</Tag>;
};

export default AnimatedText;
