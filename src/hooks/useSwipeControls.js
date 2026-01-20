/**
 * useSwipeControls Hook
 * Handles touch/swipe gestures for rotating cube faces
 */

import { useRef, useCallback, useEffect } from 'react';

/**
 * Detect swipe direction based on touch start/end positions
 * Returns: 'left', 'right', 'up', 'down', or null
 */
function getSwipeDirection(startX, startY, endX, endY) {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Minimum swipe distance (pixels)
  const MIN_DISTANCE = 30;

  if (distance < MIN_DISTANCE) return null;

  // Calculate angle
  const angle = Math.atan2(deltaY, deltaX);
  const degrees = (angle * 180) / Math.PI;

  // Normalize to 0-360
  const normalized = (degrees + 360) % 360;

  // Detect direction (with 45-degree tolerance)
  if (normalized < 45 || normalized > 315) return 'right';
  if (normalized >= 45 && normalized < 135) return 'down';
  if (normalized >= 135 && normalized < 225) return 'left';
  if (normalized >= 225 && normalized < 315) return 'up';

  return null;
}

/**
 * Map swipe direction to cube move
 * This is customizable based on device orientation
 */
const SWIPE_MOVE_MAP = {
  left: 'R',   // Swipe left rotates right face
  right: 'L',  // Swipe right rotates left face
  up: 'D',     // Swipe up rotates down face
  down: 'U',   // Swipe down rotates up face
};

export function useSwipeControls(containerRef, onMove, enabled = true) {
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  const handleTouchStart = useCallback((e) => {
    if (!enabled) return;

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
    isTouchRef.current = true;
  }, [enabled]);

  const handleTouchEnd = useCallback((e) => {
    if (!isTouchRef.current) return;

    const touch = e.changedTouches[0];
    const direction = getSwipeDirection(
      touchStartRef.current.x,
      touchStartRef.current.y,
      touch.clientX,
      touch.clientY
    );

    if (direction) {
      const move = SWIPE_MOVE_MAP[direction];
      onMove?.(move);
    }

    isTouchRef.current = false;
  }, [onMove]);

  const handleTouchCancel = useCallback(() => {
    isTouchRef.current = false;
  }, []);

  useEffect(() => {
    const element = containerRef?.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [containerRef, handleTouchStart, handleTouchEnd, handleTouchCancel]);

  return {
    swipeMoveMap: SWIPE_MOVE_MAP,
  };
}

export default useSwipeControls;
