import React, { useState } from 'react';
import TerminalWindow from '../components/TerminalWindow';
import AnimatedText from '../components/AnimatedText';
import { INPUT_CLASSES, BUTTON_CLASSES, TYPING_TEXT_CYAN_CLASS } from '../constants';

// Added by Naveen on May 28, 2025
// Updated by Naveen on May 29, 2025: Switched to local mock data generation for report simulation.
const OSINTPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateMockReport = () => {
    let report = "--- SIMULATED OSINT REPORT (Local Generation) ---\n\n";
    report += `Timestamp: ${new Date().toISOString()}\n`;
    report += `Target Identifiers Provided:\n`;
    report += `  Username: ${username || "Not Provided"}\n`;
    report += `  Email: ${email || "Not Provided"}\n`;
    report += `  Full Name: ${fullName || "Not Provided"}\n`;
    report += `  Keywords: ${keywords || "Not Provided"}\n\n`;

    let foundData = false;

    if (username) {
      foundData = true;
      report += "Fictional Online Presence (Simulated):\n";
      report += `  - @${username}_ConnectSphere (ConnectSphere Profile - Fictional)\n`;
      report += `  - ${username}Dev (PixelVerse Gaming Alias - Fictional)\n`;
      report += `  - User '${username}ForumPro' on DevNetDiscussions (Forum - Fictional)\n\n`;
    }

    if (email) {
      foundData = true;
      report += "Fictional Email Check (Simulated):\n";
      if (email.includes("test") || email.includes("example")) {
        report += `  - Email '${email}' found in 0 simulated breaches.\n\n`;
      } else {
        report += `  - ALERT! Email '${email}' potentially found in 'FictionalDataLeak2023' (Simulated).\n`;
        report += `    Details: Exposed email, hashed password (simulated).\n\n`;
      }
    }

    if (fullName) {
      foundData = true;
      report += "Fictional Public Mentions (Simulated):\n";
      report += `  - Name '${fullName}' matches a fictional entry in 'NeoCity Gazette Archives' (Local Newspaper Simulation) related to a community tech fair.\n\n`;
    }

    if (keywords) {
      foundData = true;
      report += "Fictional Inferred Interests (Based on Keywords - Simulated):\n";
      report += `  - Keywords provided ('${keywords}') suggest potential fictional interests in these areas.\n\n`;
    }

    if (!foundData) {
      report += "No specific fictional data points could be generated based on the provided input. The simulation requires at least one identifier.\n\n";
    }

    report += "--- End of Simulated Report ---\n";
    report += "Disclaimer: All information presented is ENTIRELY FICTIONAL and generated locally for this demonstration. No real data was accessed or processed.";
    return report;
  };


  const handleAnalyze = async () => {
    if (!username.trim() && !email.trim() && !fullName.trim() && !keywords.trim()) {
      setError("Error: At least one input field must be filled to start the analysis.");
      setResults(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const mockReport = generateMockReport();
      setResults(mockReport);
    } catch (e: any) {
      console.error("Mock report generation failed:", e);
      setError(`Error: OSINT analysis simulation failed. ${e.message || "An unknown error occurred."}`);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setUsername('');
    setEmail('');
    setFullName('');
    setKeywords('');
    setResults(null);
    setError(null);
  };

  return (
    <TerminalWindow title="osint_analyzer_local.sh" initialCommand="./launch_osint_module --simulated --local">
      <AnimatedText text="// Open Source Intelligence (OSINT) Simulator" className={`text-2xl mb-4 ${TYPING_TEXT_CYAN_CLASS}`} speed={30} />
      <p className="text-sm text-gray-400 mb-2">
        Enter any known (fictional) identifiers for the target. This tool generates a <strong className="text-yellow-400">locally simulated and entirely fictional</strong> OSINT report.
      </p>
      <p className="text-xs text-red-400 mb-6">
        DISCLAIMER: This is a demonstration tool. No real OSINT activities are performed. All generated data is fictional, created locally, and for illustrative purposes only. Do not enter real sensitive information.
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 text-sm font-medium text-green-300">Target Username (Optional):</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={INPUT_CLASSES}
            placeholder="e.g., ShadowRunnerX91"
            aria-label="Target Username"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-green-300">Target Email (Optional):</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={INPUT_CLASSES}
            placeholder="e.g., user@example.com"
            aria-label="Target Email"
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-green-300">Target Full Name (Optional):</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={INPUT_CLASSES}
            placeholder="e.g., Alex Mercer"
            aria-label="Target Full Name"
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block mb-1 text-sm font-medium text-green-300">Additional Keywords/Info (Optional):</label>
          <textarea
            id="keywords"
            rows={3}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className={INPUT_CLASSES}
            placeholder="e.g., interested in retro gaming, lives in Neo-Kyoto, works at OmniCorp"
            aria-label="Additional Keywords or Information"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`${BUTTON_CLASSES} w-full sm:w-auto flex-grow`}
            aria-live="polite"
          >
            {isLoading ? 'Analyzing Fictional Traces...' : 'Initiate OSINT Scan (Simulated)'}
          </button>
          <button
            onClick={clearForm}
            disabled={isLoading}
            className={`${BUTTON_CLASSES} w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800`}
          >
            Clear Inputs
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-md" role="alert">
          <h3 className="font-semibold mb-1">Analysis Error:</h3>
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}

      {results && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-green-300 mb-2">Simulated OSINT Report:</h3>
          <div className="p-4 bg-gray-700/60 border border-gray-600 rounded-md max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-200">{results}</pre>
          </div>
        </div>
      )}
       <p className="text-xs text-gray-500 mt-8">
        Reminder: All information displayed above is locally generated, entirely fictional, and for demonstration purposes only. No real data is accessed or processed.
      </p>
    </TerminalWindow>
  );
};

export default OSINTPage;