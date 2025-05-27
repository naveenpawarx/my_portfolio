
import React from 'react';
import { TERMINAL_HEADER_CLASSES, TERMINAL_BODY_CLASSES } from '../constants';


interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  initialCommand?: string;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ title, children, initialCommand }) => {
  return (
    <div className="bg-gray-800 border border-green-700/70 shadow-2xl rounded-lg overflow-hidden my-6">
      <div className={TERMINAL_HEADER_CLASSES}>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 bg-red-500 rounded-full"></span>
          <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
        <span className="font-semibold text-sm">{title}</span>
        <div className="w-16"></div> {/* Spacer */}
      </div>
      <div className={TERMINAL_BODY_CLASSES}>
        {initialCommand && (
          <div className="mb-2">
            <span className="text-blue-400">user@np-portfolio:~$</span> <span className="text-gray-300">{initialCommand}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
