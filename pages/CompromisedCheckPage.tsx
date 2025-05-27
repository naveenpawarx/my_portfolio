
import React, { useState } from 'react';
import TerminalWindow from '../components/TerminalWindow';
import AnimatedText from '../components/AnimatedText';
import { INPUT_CLASSES, BUTTON_CLASSES, TYPING_TEXT_CYAN_CLASS } from '../constants';

type DetailType = 'email' | 'phone' | 'username';

const CompromisedCheckPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [detailType, setDetailType] = useState<DetailType>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mockCompromisedData: { [key: string]: { type: DetailType, message: string } } = {
    "user@example.com": { type: 'email', message: "ALERT! This email was found in multiple simulated breaches. Consider changing passwords associated with it." },
    "test@test.com": { type: 'email', message: "STATUS: Appears in a minor simulated data exposure (low severity). Monitor for suspicious activity." },
    "1234567890": { type: 'phone', message: "WARNING! This phone number is linked to a simulated compromised account. Secure related services." },
    "hacker101": { type: 'username', message: "COMPROMISED! This username was identified in a major simulated breach. Immediate password change recommended." }
  };

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      setError("Error: Input field cannot be empty.");
      setResults(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    await new Promise(resolve => setTimeout(resolve, 1800)); // Simulate API latency

    const key = inputValue.toLowerCase();
    if (mockCompromisedData[key] && mockCompromisedData[key].type === detailType) {
      setResults(`--- SCAN REPORT ---\nInput: ${inputValue} (${detailType})\n${mockCompromisedData[key].message}`);
    } else {
      setResults(`--- SCAN REPORT ---\nInput: ${inputValue} (${detailType})\nStatus: No compromises found in simulated databases for this entry. Your digital footprint appears clean in this context.`);
    }
    setIsLoading(false);
  };

  return (
    <TerminalWindow title="breach_scanner.rb" initialCommand="ruby ./breach_scanner.rb --interactive">
      <AnimatedText text="// Breach Vector Analyzer" className={`text-2xl mb-4 ${TYPING_TEXT_CYAN_CLASS}`} speed={30} />
      <p className="text-sm text-gray-400 mb-6">Enter details to query simulated public breach databases. This is a demonstration and does not use real-time breach data.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="detailType" className="block mb-1 text-sm font-medium text-green-300">Detail Type:</label>
          <select 
            id="detailType" 
            value={detailType} 
            onChange={(e) => setDetailType(e.target.value as DetailType)}
            className={INPUT_CLASSES}
          >
            <option value="email">Email Address</option>
            <option value="phone">Phone Number</option>
            <option value="username">Username</option>
          </select>
        </div>
        <div>
          <label htmlFor="inputValue" className="block mb-1 text-sm font-medium text-green-300">Enter Detail:</label>
          <input
            type="text"
            id="inputValue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={INPUT_CLASSES}
            placeholder={
              detailType === 'email' ? "e.g., user@example.com" : 
              detailType === 'phone' ? "e.g., 1234567890" : "e.g., hacker101"
            }
            aria-label="Detail to check for compromise"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`${BUTTON_CLASSES} w-full md:w-auto`}
          aria-live="polite"
        >
          {isLoading ? 'Analyzing Vectors...' : 'Scan for Breaches'}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-md" role="alert">
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}

      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-green-300 mb-2">Analysis Result:</h3>
          <div className="p-4 bg-gray-700/50 border border-gray-600 rounded-md">
            <pre className="whitespace-pre-wrap text-sm text-gray-200">{results}</pre>
          </div>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-8">
        Disclaimer: This tool is for demonstration purposes only. It uses a predefined set of mock data and does not connect to any live breach databases or external services.
        Try 'user@example.com' (email), '1234567890' (phone), or 'hacker101' (username).
      </p>
    </TerminalWindow>
  );
};

export default CompromisedCheckPage;
