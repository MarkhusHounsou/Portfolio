/**
 * Utility functions for CSS 3D transforms
 * Maps cube positions and orientations to 3D coordinates and transforms
 */

// Standard Rubik's cube is 3x3x3
// Positions range from -100px to +100px (cube side = 200px)
const CUBE_SIZE = 200;
const UNIT = CUBE_SIZE / 3; // 66.67px per cubie

/**
 * Map cubie type and position to 3D coordinates
 * Returns { x, y, z } in cube space
 */
export function getPositionCoords(cubie) {
  const { type, position } = cubie;

  // Corners (0-7)
  if (type === 'corner') {
    const cornerCoords = [
      { x: -1, y: 1, z: -1 },  // 0: ULF
      { x: 1, y: 1, z: -1 },   // 1: URF
      { x: 1, y: 1, z: 1 },    // 2: URB
      { x: -1, y: 1, z: 1 },   // 3: ULB
      { x: -1, y: -1, z: -1 }, // 4: DLF
      { x: 1, y: -1, z: -1 },  // 5: DRF
      { x: 1, y: -1, z: 1 },   // 6: DRB
      { x: -1, y: -1, z: 1 },  // 7: DLB
    ];
    return cornerCoords[position];
  }

  // Edges (8-19)
  if (type === 'edge') {
    const edgeCoords = [
      { x: 0, y: 1, z: -1 },   // 8: UF
      { x: 1, y: 1, z: 0 },    // 9: UR
      { x: 0, y: 1, z: 1 },    // 10: UB
      { x: -1, y: 1, z: 0 },   // 11: UL
      { x: 0, y: -1, z: -1 },  // 12: DF
      { x: 1, y: -1, z: 0 },   // 13: DR
      { x: 0, y: -1, z: 1 },   // 14: DB
      { x: -1, y: -1, z: 0 },  // 15: DL
      { x: -1, y: 0, z: -1 },  // 16: FL
      { x: 1, y: 0, z: -1 },   // 17: FR
      { x: 1, y: 0, z: 1 },    // 18: BR
      { x: -1, y: 0, z: 1 },   // 19: BL
    ];
    return edgeCoords[position - 8];
  }

  // Centers (20-25)
  if (type === 'center') {
    const centerCoords = [
      { x: 0, y: 1, z: 0 },    // 20: U
      { x: 0, y: -1, z: 0 },   // 21: D
      { x: -1, y: 0, z: 0 },   // 22: L
      { x: 1, y: 0, z: 0 },    // 23: R
      { x: 0, y: 0, z: -1 },   // 24: F
      { x: 0, y: 0, z: 1 },    // 25: B
    ];
    return centerCoords[position - 20];
  }

  return { x: 0, y: 0, z: 0 };
}

/**
 * Convert 3D coordinates to CSS translate values
 */
export function coordsToTranslate(coords) {
  return {
    x: coords.x * UNIT,
    y: -coords.y * UNIT, // Flip Y for CSS (down is positive)
    z: coords.z * UNIT,
  };
}

/**
 * Generate CSS transform string for a cubie's position and orientation
 */
export function getCubieTransform(cubie) {
  const coords = getPositionCoords(cubie);
  const translate = coordsToTranslate(coords);

  // Basic translation to cube position
  let transform = `translateZ(${cubie.z || 0}px) translateX(${translate.x}px) translateY(${translate.y}px) translateZ(${translate.z}px)`;

  return transform;
}

/**
 * Get face indices for a cubie based on its type and position
 * Returns object with face directions (U, D, L, R, F, B) and their color indices
 */
export function getCubieFaces(cubie) {
  const { type, position, colors } = cubie;
  const faces = {};

  if (type === 'corner') {
    // Corner cubies have 3 visible faces
    // Map based on position in the standard corner positions
    const faceMap = [
      { U: colors[0], L: colors[1], F: colors[2] },     // 0: ULF
      { U: colors[0], F: colors[1], R: colors[2] },     // 1: URF
      { U: colors[0], R: colors[1], B: colors[2] },     // 2: URB
      { U: colors[0], B: colors[1], L: colors[2] },     // 3: ULB
      { D: colors[0], F: colors[1], L: colors[2] },     // 4: DLF
      { D: colors[0], R: colors[1], F: colors[2] },     // 5: DRF
      { D: colors[0], B: colors[1], R: colors[2] },     // 6: DRB
      { D: colors[0], L: colors[1], B: colors[2] },     // 7: DLB
    ];
    return faceMap[position];
  }

  if (type === 'edge') {
    // Edge cubies have 2 visible faces
    const faceMap = [
      { U: colors[0], F: colors[1] },     // 8: UF
      { U: colors[0], R: colors[1] },     // 9: UR
      { U: colors[0], B: colors[1] },     // 10: UB
      { U: colors[0], L: colors[1] },     // 11: UL
      { D: colors[0], F: colors[1] },     // 12: DF
      { D: colors[0], R: colors[1] },     // 13: DR
      { D: colors[0], B: colors[1] },     // 14: DB
      { D: colors[0], L: colors[1] },     // 15: DL
      { F: colors[0], L: colors[1] },     // 16: FL
      { F: colors[0], R: colors[1] },     // 17: FR
      { B: colors[0], R: colors[1] },     // 18: BR
      { B: colors[0], L: colors[1] },     // 19: BL
    ];
    return faceMap[position - 8];
  }

  if (type === 'center') {
    // Center cubies have 1 visible face
    const faceMap = [
      { U: colors[0] },    // 20: U
      { D: colors[0] },    // 21: D
      { L: colors[0] },    // 22: L
      { R: colors[0] },    // 23: R
      { F: colors[0] },    // 24: F
      { B: colors[0] },    // 25: B
    ];
    return faceMap[position - 20];
  }

  return faces;
}

/**
 * Map face direction to CSS rotation angle
 */
export const FACE_ROTATIONS = {
  U: { rotateX: 0, rotateY: 0, rotateZ: 0 },
  D: { rotateX: 180, rotateY: 0, rotateZ: 0 },
  L: { rotateX: 0, rotateY: 90, rotateZ: 0 },
  R: { rotateX: 0, rotateY: -90, rotateZ: 0 },
  F: { rotateX: 0, rotateY: 0, rotateZ: 0 },
  B: { rotateX: 0, rotateY: 180, rotateZ: 0 },
};

export const CUBE_SIZE_PX = CUBE_SIZE;
