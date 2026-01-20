import React from 'react';
import { useCubeSettings } from '../hooks/useCubeSettings';
import { playMoveSound, playSuccessSound } from '../utils/sounds';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { settings, setTheme, toggleSounds, setAnimationSpeed, reset } = useCubeSettings();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-labelledby="settings-title"
      aria-modal="true"
    >
      <div
        className="bg-gray-800 rounded-lg shadow-2xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="settings-title" className="text-xl font-bold">
            ⚙️ Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        {/* Theme */}
        <div className="mb-6 pb-6 border-b border-gray-700">
          <p className="text-sm font-semibold mb-3">Theme</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setTheme('dark');
                playMoveSound();
              }}
              className={`flex-1 py-2 px-4 rounded text-sm font-semibold transition ${
                settings.theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={settings.theme === 'dark'}
            >
              🌙 Dark
            </button>
            <button
              onClick={() => {
                setTheme('light');
                playMoveSound();
              }}
              className={`flex-1 py-2 px-4 rounded text-sm font-semibold transition ${
                settings.theme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={settings.theme === 'light'}
            >
              ☀️ Light
            </button>
          </div>
        </div>

        {/* Sounds */}
        <div className="mb-6 pb-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <label htmlFor="sounds-toggle" className="text-sm font-semibold">
              🔊 Sound Effects
            </label>
            <button
              id="sounds-toggle"
              onClick={() => {
                toggleSounds();
                if (!settings.soundsEnabled) {
                  playMoveSound();
                }
              }}
              className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                settings.soundsEnabled ? 'bg-blue-600' : 'bg-gray-600'
              }`}
              role="switch"
              aria-checked={settings.soundsEnabled}
            >
              <span
                className={`inline-block h-5 w-5 transform bg-white rounded-full transition-transform ${
                  settings.soundsEnabled ? 'translate-x-5' : 'translate-x-1'
                }`}
                style={{ marginTop: '2px' }}
              />
            </button>
          </div>
        </div>

        {/* Animation Speed */}
        <div className="mb-6 pb-6 border-b border-gray-700">
          <label htmlFor="animation-speed" className="text-sm font-semibold block mb-3">
            ⚡ Animation Speed: {(settings.animationSpeed * 100).toFixed(0)}%
          </label>
          <input
            id="animation-speed"
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={settings.animationSpeed}
            onChange={(e) => {
              const speed = parseFloat(e.target.value);
              setAnimationSpeed(speed);
              if (settings.soundsEnabled) playMoveSound();
            }}
            className="w-full"
            aria-label="Adjust animation speed"
          />
          <p className="text-xs text-gray-400 mt-2">
            Lower = faster, Higher = slower
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              reset();
              if (settings.soundsEnabled) {
                playSuccessSound();
              }
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm font-semibold transition"
            aria-label="Reset settings to defaults"
          >
            Reset Defaults
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-semibold transition"
            aria-label="Close settings panel"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
