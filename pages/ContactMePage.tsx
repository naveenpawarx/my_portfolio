
import React, { useState } from 'react';
import TerminalWindow from '../components/TerminalWindow';
import AnimatedText from '../components/AnimatedText';
import { INPUT_CLASSES, BUTTON_CLASSES, TYPING_TEXT_CYAN_CLASS, RESUME_DATA } from '../constants';

const ContactMePage: React.FC = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [isMessagePrepared, setIsMessagePrepared] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const recipientEmail = RESUME_DATA.contact.email;

  const funnyPlaceholders = [
    "Whisper your secrets here...",
    "Type your encrypted transmission...",
    "Relay your query to the Oracle...",
    "Compose your digital smoke signal...",
  ];
  const [placeholder] = useState(funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail.trim()) {
      setConfirmation("Transmission Error: Your callsign (email) is required for a reply signal!");
      setIsMessagePrepared(false);
      return;
    }
    setIsMessagePrepared(true);
    setConfirmation(`MESSAGE ENCODED:\nFrom: ${senderEmail}\nTo: ${recipientEmail}\nBody Preview: ${messageBody.substring(0,50)}...\n\nStatus: Ready for quantum entanglement. Hit 'Launch via Email Client' to dispatch.`);
  };
  
  const getMailtoLink = () => {
    const subject = `Comms Request from Portfolio Visitor: ${senderEmail}`;
    const body = `Greetings Naveen,\n\nMessage from: ${senderEmail}\n\n${messageBody}\n\n--- End of Transmission ---`;
    return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <TerminalWindow title="secure_drop.sh" initialCommand="./establish_comms.sh --channel=secure">
      <AnimatedText text="// Establish Secure Comms Channel" className={`text-2xl mb-4 ${TYPING_TEXT_CYAN_CLASS}`} speed={30} />
      <p className="text-sm text-gray-400 mb-6">Leave your digital breadcrumbs. I'll use my advanced tracking skills (my email client) to find you.</p>
      
      {!isMessagePrepared ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="senderEmail" className="block mb-1 text-sm font-medium text-green-300">Your Callsign (Email Address):</label>
            <input
              type="email"
              id="senderEmail"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className={INPUT_CLASSES}
              placeholder="agent@domain.com"
              required
              aria-label="Your Email Address"
            />
          </div>
          <div>
            <label htmlFor="messageBody" className="block mb-1 text-sm font-medium text-green-300">Encoded Message (Optional):</label>
            <textarea
              id="messageBody"
              rows={4}
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              className={INPUT_CLASSES}
              placeholder={placeholder}
              aria-label="Your Message"
            />
          </div>
          <button type="submit" className={`${BUTTON_CLASSES} w-full md:w-auto`}>
            Prepare Transmission
          </button>
        </form>
      ) : (
        <div className="space-y-4">
           <a 
            href={getMailtoLink()} 
            className={`${BUTTON_CLASSES} w-full md:w-auto text-center block`}
            onClick={() => setConfirmation("Attempting to open your default email client. If it doesn't work, you may need to configure one or copy the details manually.")}
            target="_blank" 
            rel="noopener noreferrer"
            >
            Launch via Email Client
          </a>
          <button 
            onClick={() => { setIsMessagePrepared(false); setConfirmation(null); setSenderEmail(''); setMessageBody('');}} 
            className={`${BUTTON_CLASSES} w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800`}
          >
            Reset & New Message
          </button>
        </div>
      )}

      {confirmation && (
        <div className={`mt-6 p-3 ${isMessagePrepared && senderEmail.trim() ? 'bg-blue-900/50 border-blue-700 text-blue-300' : 'bg-red-900/50 border-red-700 text-red-300'} rounded-md`} role="status">
          <pre className="whitespace-pre-wrap text-sm">{confirmation}</pre>
        </div>
      )}
       <p className="text-xs text-gray-500 mt-8">
        Note: This form uses a 'mailto:' link to open your default email application. Your message will be sent from your own email.
      </p>
    </TerminalWindow>
  );
};

export default ContactMePage;
