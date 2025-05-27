
import React, { useState, useCallback } from 'react';
import TerminalWindow from '../components/TerminalWindow';
import AnimatedText from '../components/AnimatedText';
import { INPUT_CLASSES, BUTTON_CLASSES, TYPING_TEXT_CYAN_CLASS } from '../constants';

type Base = 'binary' | 'octal' | 'decimal' | 'hexadecimal';
const bases: { value: Base; label: string; radix: number, pattern: RegExp }[] = [
  { value: 'binary', label: 'Binary (Base 2)', radix: 2, pattern: /^[01]+$/ },
  { value: 'octal', label: 'Octal (Base 8)', radix: 8, pattern: /^[0-7]+$/ },
  { value: 'decimal', label: 'Decimal (Base 10)', radix: 10, pattern: /^[0-9]+$/ },
  { value: 'hexadecimal', label: 'Hexadecimal (Base 16)', radix: 16, pattern: /^[0-9a-fA-F]+$/ },
];

const NumberConverterPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromBase, setFromBase] = useState<Base>('decimal');
  const [toBase, setToBase] = useState<Base>('binary');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInput = useCallback((value: string, base: Base): boolean => {
    if (!value) return true; // Allow empty input
    const selectedBase = bases.find(b => b.value === base);
    return selectedBase ? selectedBase.pattern.test(value) : false;
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (!validateInput(value, fromBase)) {
      setError(`Invalid characters for ${fromBase} base.`);
    } else {
      setError(null);
    }
    setResult(null); 
  };
  
  const handleFromBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBase = e.target.value as Base;
    setFromBase(newBase);
    if (!validateInput(inputValue, newBase)) {
      setError(`Current input '${inputValue}' is invalid for ${newBase} base.`);
    } else {
      setError(null);
    }
    setResult(null);
  };


  const handleConvert = () => {
    if (!inputValue.trim()) {
      setError("Input value cannot be empty.");
      setResult(null);
      return;
    }
    if (!validateInput(inputValue, fromBase)) {
      setError(`Invalid input '${inputValue}' for ${fromBase} base.`);
      setResult(null);
      return;
    }
    setError(null);

    try {
      const fromRadix = bases.find(b => b.value === fromBase)?.radix;
      const toRadix = bases.find(b => b.value === toBase)?.radix;

      if (fromRadix === undefined || toRadix === undefined) {
        throw new Error("Invalid base selection.");
      }

      const decimalValue = parseInt(inputValue, fromRadix);
      if (isNaN(decimalValue)) {
        throw new Error("Failed to parse input value.");
      }
      setResult(decimalValue.toString(toRadix).toUpperCase());
    } catch (e: any) {
      setError(`Conversion Error: ${e.message}`);
      setResult(null);
    }
  };

  return (
    <TerminalWindow title="base_converter_tool.py" initialCommand="python ./base_converter.py --interactive">
      <AnimatedText text="// Universal Base Converter" className={`text-2xl mb-4 ${TYPING_TEXT_CYAN_CLASS}`} speed={30} />
      <p className="text-sm text-gray-400 mb-6">Convert numbers between Binary, Octal, Decimal, and Hexadecimal.</p>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fromBase" className="block mb-1 text-sm font-medium text-green-300">From Base:</label>
            <select id="fromBase" value={fromBase} onChange={handleFromBaseChange} className={INPUT_CLASSES}>
              {bases.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="toBase" className="block mb-1 text-sm font-medium text-green-300">To Base:</label>
            <select id="toBase" value={toBase} onChange={(e) => setToBase(e.target.value as Base)} className={INPUT_CLASSES}>
              {bases.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="inputValue" className="block mb-1 text-sm font-medium text-green-300">Number to Convert:</label>
          <input
            type="text"
            id="inputValue"
            value={inputValue}
            onChange={handleInputChange}
            className={INPUT_CLASSES}
            placeholder={`Enter ${fromBase} number`}
          />
        </div>

        <button onClick={handleConvert} className={`${BUTTON_CLASSES} w-full`}>
          Convert
        </button>

        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-md">
            <pre className="whitespace-pre-wrap text-sm">{error}</pre>
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-green-300 mb-2">Conversion Result:</h3>
            <div className="p-4 bg-gray-700/50 border border-gray-600 rounded-md text-2xl text-center text-yellow-400 font-bold">
              {result}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {inputValue} ({fromBase}) = {result} ({toBase})
            </p>
          </div>
        )}
      </div>
    </TerminalWindow>
  );
};

export default NumberConverterPage;
