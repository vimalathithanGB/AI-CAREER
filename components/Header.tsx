
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 text-center bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                AI Career Path Suggester
            </span>
        </h1>
        <p className="text-slate-400 mt-2">Discover Your Professional Future</p>
    </header>
  );
};

export default Header;
