
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinkItem } from '../types';

interface NavbarProps {
  navLinks: NavLinkItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navLinks }) => {
  return (
    <nav className="bg-gray-800/50 backdrop-blur-md p-4 shadow-lg sticky top-0 z-50 border-b border-green-700/50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
          N_P<span className="hacker-caret"></span>
        </NavLink>
        <div className="space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-500 text-gray-900'
                    : 'text-green-300 hover:bg-gray-700 hover:text-green-200'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
