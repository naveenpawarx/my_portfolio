
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800/50 backdrop-blur-md text-center p-4 text-sm text-green-500 border-t border-green-700/50">
      &copy; {currentYear} Naveen Pawar. All systems operational.
    </footer>
  );
};

export default Footer;
