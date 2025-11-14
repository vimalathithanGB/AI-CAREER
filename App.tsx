
import React, { useState, useCallback } from 'react';
import { getCareerSuggestions } from './services/geminiService';
import { CareerSuggestion } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import CareerCard from './components/CareerCard';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [interests, setInterests] = useState<string>('');
  const [personality, setPersonality] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState<number>(50);
  const [suggestions, setSuggestions] = useState<CareerSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSkillLevelDescription = (level: number): string => {
    if (level < 33) return 'Beginner / Entry-Level';
    if (level < 66) return 'Intermediate / Some Experience';
    return 'Advanced / Expert';
  };

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!interests || !personality) {
      setError('Please fill out both interests and personality fields.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const result = await getCareerSuggestions(interests, personality, skillLevel);
      setSuggestions(result);
    } catch (err) {
      setError('Failed to get career suggestions. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [interests, personality, skillLevel]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-900 text-slate-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 w-full max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 ring-1 ring-white/10">
          <p className="text-lg text-slate-300 mb-6 text-center">
            Tell us about yourself, and our AI will generate personalized career paths for you.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-sky-300 mb-2">
                Your Interests
              </label>
              <textarea
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., technology, creative writing, hiking, video games, data analysis"
                className="w-full h-24 p-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none"
              />
            </div>
            <div>
              <label htmlFor="personality" className="block text-sm font-medium text-sky-300 mb-2">
                Your Personality
              </label>
              <textarea
                id="personality"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="e.g., introverted, analytical, enjoys teamwork, creative problem-solver"
                className="w-full h-24 p-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none"
              />
            </div>
            <div>
              <label htmlFor="skill-level" className="block text-sm font-medium text-sky-300 mb-2">
                Current Skill Level: <span className="font-bold text-white">{getSkillLevelDescription(skillLevel)}</span>
              </label>
              <input
                id="skill-level"
                type="range"
                min="0"
                max="100"
                value={skillLevel}
                onChange={(e) => setSkillLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-500 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
            >
              {isLoading ? <LoadingSpinner /> : 'Suggest Careers'}
            </button>
          </form>
        </div>

        <div className="mt-10">
          {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg text-center">{error}</div>}
          {isLoading && (
             <div className="text-center text-slate-400">
                <p>AI is analyzing your profile... this may take a moment.</p>
             </div>
          )}
          {!isLoading && suggestions.length === 0 && !error && (
            <div className="text-center text-slate-500 py-10">
              <p>Your future career suggestions will appear here.</p>
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.map((suggestion, index) => (
                <CareerCard key={index} suggestion={suggestion} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
