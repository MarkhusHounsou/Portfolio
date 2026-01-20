/**
 * useAutoPlay Hook
 * Handles demo/autoplay mode with step-by-step move playback and animations
 */

import { useReducer, useCallback, useRef, useEffect } from 'react';

const ACTIONS = {
  START: 'START',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  STEP: 'STEP',
  FINISH: 'FINISH',
  RESET: 'RESET',
};

const INITIAL_STATE = {
  isRunning: false,
  currentStep: 0,
  moves: [],
  speed: 500, // ms per move
};

function autoPlayReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START:
      return {
        ...state,
        isRunning: true,
        currentStep: 0,
        moves: action.payload.moves || [],
        speed: action.payload.speed || 500,
      };

    case ACTIONS.PAUSE:
      return { ...state, isRunning: false };

    case ACTIONS.RESUME:
      return { ...state, isRunning: true };

    case ACTIONS.STEP:
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.moves.length),
      };

    case ACTIONS.FINISH:
      return { ...state, isRunning: false, currentStep: state.moves.length };

    case ACTIONS.RESET:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export function useAutoPlay(onMove) {
  const [state, dispatch] = useReducer(autoPlayReducer, INITIAL_STATE);
  const timerRef = useRef(null);

  // Auto-advance through moves
  useEffect(() => {
    if (!state.isRunning || state.currentStep >= state.moves.length) {
      return;
    }

    timerRef.current = setTimeout(() => {
      const move = state.moves[state.currentStep];
      onMove(move);
      dispatch({ type: ACTIONS.STEP });
    }, state.speed);

    return () => clearTimeout(timerRef.current);
  }, [state.isRunning, state.currentStep, state.moves, state.speed, onMove]);

  const start = useCallback((moves, speed = 500) => {
    dispatch({
      type: ACTIONS.START,
      payload: { moves, speed },
    });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: ACTIONS.RESUME });
  }, []);

  const stepForward = useCallback(() => {
    if (state.currentStep < state.moves.length) {
      const move = state.moves[state.currentStep];
      onMove(move);
      dispatch({ type: ACTIONS.STEP });
    }
  }, [state.currentStep, state.moves, onMove]);

  const stop = useCallback(() => {
    dispatch({ type: ACTIONS.FINISH });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  return {
    // State
    isRunning: state.isRunning,
    currentStep: state.currentStep,
    totalSteps: state.moves.length,
    progress: state.moves.length > 0 ? (state.currentStep / state.moves.length) * 100 : 0,
    currentMove: state.moves[state.currentStep] || null,

    // Controls
    start,
    pause,
    resume,
    stop,
    stepForward,
    reset,

    // Settings
    setSpeed: (speed) => {
      dispatch({
        type: ACTIONS.START,
        payload: { moves: state.moves, speed },
      });
    },
  };
}

export { ACTIONS };
