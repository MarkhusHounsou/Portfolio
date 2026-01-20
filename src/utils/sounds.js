/**
 * Sound effects utilities for Rubik's cube
 * Creates simple audio context-based beeps and sounds
 */

/**
 * Play a simple beep sound using Web Audio API
 * frequency: Hz
 * duration: ms
 * volume: 0-1
 */
export function playBeep(frequency = 800, duration = 100, volume = 0.1) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (e) {
    console.warn('Audio context not available:', e);
  }
}

/**
 * Play a move sound (positive beep)
 */
export function playMoveSound() {
  playBeep(600, 80, 0.08);
}

/**
 * Play a shuffle sound (series of beeps)
 */
export function playShuffleSound() {
  playBeep(700, 50, 0.06);
  setTimeout(() => playBeep(650, 50, 0.06), 60);
}

/**
 * Play a reset sound (low beep)
 */
export function playResetSound() {
  playBeep(400, 100, 0.08);
}

/**
 * Play an error sound
 */
export function playErrorSound() {
  playBeep(300, 150, 0.08);
}

/**
 * Play success sound (ascending tones)
 */
export function playSuccessSound() {
  playBeep(600, 100, 0.07);
  setTimeout(() => playBeep(800, 100, 0.07), 110);
  setTimeout(() => playBeep(1000, 100, 0.07), 220);
}

export default {
  playBeep,
  playMoveSound,
  playShuffleSound,
  playResetSound,
  playErrorSound,
  playSuccessSound,
};
