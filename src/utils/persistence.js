/**
 * Persistence utilities for Rubik's Cube
 * Save and load cube state from localStorage
 */

const STORAGE_KEY = 'rubiksCubeState';

/**
 * Save cube state to localStorage
 */
export function saveCubeState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save cube state:', e);
  }
}

/**
 * Load cube state from localStorage
 */
export function loadCubeState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load cube state:', e);
  }
  return null;
}

/**
 * Clear saved cube state
 */
export function clearCubeState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear cube state:', e);
  }
}

/**
 * Hook to auto-save cube state
 */
import { useEffect } from 'react';

export function useCubePersistence(state) {
  useEffect(() => {
    const timer = setTimeout(() => {
      saveCubeState(state);
    }, 500); // Debounce to avoid too many writes

    return () => clearTimeout(timer);
  }, [state]);
}

export default {
  saveCubeState,
  loadCubeState,
  clearCubeState,
  useCubePersistence,
};
