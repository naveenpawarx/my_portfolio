
import React, { useState } from 'react';
import TerminalWindow from '../components/TerminalWindow';
import AnimatedText from '../components/AnimatedText';
import { INPUT_CLASSES, BUTTON_CLASSES, TYPING_TEXT_CYAN_CLASS } from '../constants';

const HashSearchPage: React.FC = () => {
  const [hashInput, setHashInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!hashInput.trim()) {
      setError("Error: Hash input cannot be empty.");
      setResults(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Placeholder logic for hash search
    // In a real app, this would call an external API
    if (hashInput === "examplehash123_known_malicious") {
      setResults(`Hash: ${hashInput}\nStatus: MALICIOUS\nDB: Simulated Threat Intel DB\nInfo: This is a known test signature for a simulated threat.`);
    } else if (hashInput.length < 10) {
       setError(`Error: Hash '${hashInput}' too short for typical databases. Please provide a valid MD5, SHA1, or SHA256 hash.`);
    } else {
      setResults(`Hash: ${hashInput}\nStatus: UNKNOWN / NOT FOUND\nInfo: This hash was not found in the simulated public databases. This feature is a demonstration and does not query live databases.`);
    }
    setIsLoading(false);
  };

  return (
    <TerminalWindow title="hash_lookup_utility.sh" initialCommand="./hash_analyzer">
      <AnimatedText text="// Public Hash Lookup Utility" className={`text-2xl mb-4 ${TYPING_TEXT_CYAN_CLASS}`} speed={30} />
      <p className="text-sm text-gray-400 mb-4">Enter a hash (e.g., MD5, SHA1, SHA256) to query simulated public databases.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="hashInput" className="block mb-1 text-sm font-medium text-green-300">Enter Hash:</label>
          <input
            type="text"
            id="hashInput"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            className={INPUT_CLASSES}
            placeholder="e.g., d41d8cd98f00b204e9800998ecf8427e"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`${BUTTON_CLASSES} w-full md:w-auto`}
        >
          {isLoading ? 'Scanning...' : 'Search Hash'}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-md">
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}

      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-green-300 mb-2">Scan Results:</h3>
          <div className="p-4 bg-gray-700/50 border border-gray-600 rounded-md">
            <pre className="whitespace-pre-wrap text-sm text-gray-200">{results}</pre>
          </div>
        </div>
      )}
       <p className="text-xs text-gray-500 mt-8">
        Note: This is a conceptual demonstration. No actual external API calls are made for hash lookups.
        Try 'examplehash123_known_malicious' for a simulated positive result.
      </p>
    </TerminalWindow>
  );
};

export default HashSearchPage;
