
import React from 'react';
import AnimatedText from './AnimatedText';
import { TYPING_TEXT_CYAN_CLASS } from '../constants';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  titleClassName?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, titleClassName = TYPING_TEXT_CYAN_CLASS }) => {
  return (
    <section className="my-8 p-4 md:p-6 border border-gray-700 rounded-lg shadow-lg bg-gray-800/50 backdrop-blur-sm">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        <AnimatedText text={`// ${title}`} className={titleClassName} speed={30} />
      </h2>
      <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default Section;
