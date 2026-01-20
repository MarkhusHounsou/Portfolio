/**
 * useKeyboardControls Hook
 * Handles keyboard input for cube moves and navigation
 */

import { useEffect, useCallback } from 'react';

/**
 * Map keyboard keys to cube moves
 * Standard QWERTY layout for easy access
 */
const KEY_MAP = {
  // Uppercase
  'U': 'U',
  'D': 'D',
  'L': 'L',
  'R': 'R',
  'F': 'F',
  'B': 'B',

  // With Shift for prime (inverse)
  'u': "U'",
  'd': "D'",
  'l': "L'",
  'r': "R'",
  'f': "F'",
  'b': "B'",

  // Number keys for double turns
  '1': 'U2',
  '2': 'D2',
  '3': 'L2',
  '4': 'R2',
  '5': 'F2',
  '6': 'B2',
};

export function useKeyboardControls(onMove, onUndo, onRedo, enabled = true) {
  const handleKeyPress = useCallback((e) => {
    if (!enabled) return;

    // Ignore if user is typing in an input field (unless it's our move input)
    const target = e.target;
    if (target.tagName === 'INPUT' && target.placeholder !== 'e.g., U, R\', F2') {
      return;
    }

    const key = e.key;

    // Control keys
    if (e.ctrlKey || e.metaKey) {
      if (key === 'z') {
        e.preventDefault();
        onUndo?.();
        return;
      }
      if (key === 'y') {
        e.preventDefault();
        onRedo?.();
        return;
      }
    }

    // Arrow keys for undo/redo
    if (key === 'ArrowLeft') {
      e.preventDefault();
      onUndo?.();
      return;
    }
    if (key === 'ArrowRight') {
      e.preventDefault();
      onRedo?.();
      return;
    }

    // Cube moves
    const move = KEY_MAP[key];
    if (move) {
      e.preventDefault();
      onMove?.(move);
    }
  }, [enabled, onMove, onUndo, onRedo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    keyMap: KEY_MAP,
  };
}

export default useKeyboardControls;
