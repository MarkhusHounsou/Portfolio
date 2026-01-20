/**
 * Rubik's Cube Move Logic
 *
 * Standard Rubik's cube notation:
 * U/D - Up/Down face
 * L/R - Left/Right face
 * F/B - Front/Back face
 * Suffix: ' = prime (inverse), 2 = double turn
 */

/**
 * Apply a move to the cube state
 * move: string like 'U', 'U\'', 'U2', 'F', 'R2', etc.
 */
export function applyMove(cubies, move) {
  const baseMoves = {
    'U': moveU,
    'D': moveD,
    'L': moveL,
    'R': moveR,
    'F': moveF,
    'B': moveB,
  };

  // Extract base move (without ' or 2)
  let baseMove = move[0];
  let inverse = move.includes("'");
  let double = move.includes('2');

  const moveFn = baseMoves[baseMove];
  if (!moveFn) {
    console.warn(`Unknown move: ${move}`);
    return cubies;
  }

  let result = [...cubies];

  // Apply move 1, 2, or 3 times depending on prime/double
  const times = double ? 2 : inverse ? 3 : 1;
  for (let i = 0; i < times; i++) {
    result = moveFn(result);
  }

  return result;
}

/**
 * Rotate a group of cubies at specified positions
 * positions: array of indices to rotate
 * orientationShift: how much to rotate each cubie's orientation
 * positionCycle: array specifying the cyclic shift of positions
 */
function rotateCubies(cubies, positions, orientationShift, positionCycle) {
  const result = [...cubies];

  // Cycle positions
  const temp = result[positions[positionCycle[0]]];
  for (let i = 0; i < positionCycle.length - 1; i++) {
    result[positions[positionCycle[i]]] = result[positions[positionCycle[i + 1]]];
    result[positions[positionCycle[i]]].position = positions[positionCycle[i]];
  }
  result[positions[positionCycle[positionCycle.length - 1]]] = temp;
  temp.position = positions[positionCycle[positionCycle.length - 1]];

  // Update orientations
  for (let i = 0; i < positionCycle.length; i++) {
    const pos = positions[positionCycle[i]];
    result[pos].orientation = (result[pos].orientation + orientationShift[i]) % (result[pos].type === 'corner' ? 3 : 2);
  }

  return result;
}

/**
 * U move (clockwise looking down from top)
 * Affects corners 0,1,2,3 and edges 8,9,10,11
 */
function moveU(cubies) {
  // Corners: 0 -> 1 -> 2 -> 3 -> 0
  // Edges: 8 -> 9 -> 10 -> 11 -> 8
  
  let result = [...cubies];
  
  // Rotate corners
  const cornerPos = [0, 1, 2, 3];
  const cornerTemp = result[cornerPos[0]];
  for (let i = 0; i < 3; i++) {
    result[cornerPos[i]] = result[cornerPos[i + 1]];
    result[cornerPos[i]].position = cornerPos[i];
  }
  result[cornerPos[3]] = cornerTemp;
  cornerTemp.position = cornerPos[3];
  
  // Rotate edges
  const edgePos = [8, 9, 10, 11];
  const edgeTemp = result[edgePos[0]];
  for (let i = 0; i < 3; i++) {
    result[edgePos[i]] = result[edgePos[i + 1]];
    result[edgePos[i]].position = edgePos[i];
  }
  result[edgePos[3]] = edgeTemp;
  edgeTemp.position = edgePos[3];
  
  return result;
}

/**
 * D move (clockwise looking up from bottom)
 * Affects corners 4,5,6,7 and edges 12,13,14,15
 */
function moveD(cubies) {
  let result = [...cubies];
  
  // Rotate corners: 4 -> 5 -> 6 -> 7 -> 4
  const cornerPos = [4, 5, 6, 7];
  const cornerTemp = result[cornerPos[0]];
  for (let i = 0; i < 3; i++) {
    result[cornerPos[i]] = result[cornerPos[i + 1]];
    result[cornerPos[i]].position = cornerPos[i];
  }
  result[cornerPos[3]] = cornerTemp;
  cornerTemp.position = cornerPos[3];
  
  // Rotate edges: 12 -> 13 -> 14 -> 15 -> 12
  const edgePos = [12, 13, 14, 15];
  const edgeTemp = result[edgePos[0]];
  for (let i = 0; i < 3; i++) {
    result[edgePos[i]] = result[edgePos[i + 1]];
    result[edgePos[i]].position = edgePos[i];
  }
  result[edgePos[3]] = edgeTemp;
  edgeTemp.position = edgePos[3];
  
  return result;
}

/**
 * L move (clockwise looking from left)
 * Affects corners 0,3,4,7 and edges 8,11,16,19
 */
function moveL(cubies) {
  let result = [...cubies];
  
  // Corners: 0 -> 3 -> 7 -> 4 -> 0 (with orientation)
  const cornerIndices = [0, 3, 7, 4]; // positions in cubies array
  const cornerTemp = result[cornerIndices[0]];
  for (let i = 0; i < 3; i++) {
    result[cornerIndices[i]] = result[cornerIndices[i + 1]];
    result[cornerIndices[i]].position = cornerIndices[i];
    result[cornerIndices[i]].orientation = (result[cornerIndices[i]].orientation + 2) % 3;
  }
  result[cornerIndices[3]] = cornerTemp;
  cornerTemp.position = cornerIndices[3];
  cornerTemp.orientation = (cornerTemp.orientation + 1) % 3;
  
  // Edges: 8 -> 11 -> 15 -> 16 -> 8 (with orientation)
  const edgeIndices = [8, 11, 15, 16];
  const edgeTemp = result[edgeIndices[0]];
  for (let i = 0; i < 3; i++) {
    result[edgeIndices[i]] = result[edgeIndices[i + 1]];
    result[edgeIndices[i]].position = edgeIndices[i];
    result[edgeIndices[i]].orientation = 1 - result[edgeIndices[i]].orientation; // flip
  }
  result[edgeIndices[3]] = edgeTemp;
  edgeTemp.position = edgeIndices[3];
  edgeTemp.orientation = 1 - edgeTemp.orientation;
  
  return result;
}

/**
 * R move (clockwise looking from right)
 * Affects corners 1,2,6,5 and edges 9,18,17,13
 */
function moveR(cubies) {
  let result = [...cubies];
  
  // Corners
  const cornerIndices = [1, 2, 6, 5];
  const cornerTemp = result[cornerIndices[0]];
  for (let i = 0; i < 3; i++) {
    result[cornerIndices[i]] = result[cornerIndices[i + 1]];
    result[cornerIndices[i]].position = cornerIndices[i];
    result[cornerIndices[i]].orientation = (result[cornerIndices[i]].orientation + 1) % 3;
  }
  result[cornerIndices[3]] = cornerTemp;
  cornerTemp.position = cornerIndices[3];
  cornerTemp.orientation = (cornerTemp.orientation + 2) % 3;
  
  // Edges
  const edgeIndices = [9, 18, 13, 17];
  const edgeTemp = result[edgeIndices[0]];
  for (let i = 0; i < 3; i++) {
    result[edgeIndices[i]] = result[edgeIndices[i + 1]];
    result[edgeIndices[i]].position = edgeIndices[i];
    result[edgeIndices[i]].orientation = 1 - result[edgeIndices[i]].orientation;
  }
  result[edgeIndices[3]] = edgeTemp;
  edgeTemp.position = edgeIndices[3];
  edgeTemp.orientation = 1 - edgeTemp.orientation;
  
  return result;
}

/**
 * F move (clockwise looking from front)
 * Affects corners 0,1,5,4 and edges 8,17,12,16
 */
function moveF(cubies) {
  let result = [...cubies];
  
  // Corners
  const cornerIndices = [0, 1, 5, 4];
  const cornerTemp = result[cornerIndices[0]];
  for (let i = 0; i < 3; i++) {
    result[cornerIndices[i]] = result[cornerIndices[i + 1]];
    result[cornerIndices[i]].position = cornerIndices[i];
    result[cornerIndices[i]].orientation = (result[cornerIndices[i]].orientation + 2) % 3;
  }
  result[cornerIndices[3]] = cornerTemp;
  cornerTemp.position = cornerIndices[3];
  cornerTemp.orientation = (cornerTemp.orientation + 1) % 3;
  
  // Edges
  const edgeIndices = [8, 17, 12, 16];
  const edgeTemp = result[edgeIndices[0]];
  for (let i = 0; i < 3; i++) {
    result[edgeIndices[i]] = result[edgeIndices[i + 1]];
    result[edgeIndices[i]].position = edgeIndices[i];
    result[edgeIndices[i]].orientation = 1 - result[edgeIndices[i]].orientation;
  }
  result[edgeIndices[3]] = edgeTemp;
  edgeTemp.position = edgeIndices[3];
  edgeTemp.orientation = 1 - edgeTemp.orientation;
  
  return result;
}

/**
 * B move (clockwise looking from back)
 * Affects corners 2,3,7,6 and edges 10,19,14,18
 */
function moveB(cubies) {
  let result = [...cubies];
  
  // Corners
  const cornerIndices = [2, 3, 7, 6];
  const cornerTemp = result[cornerIndices[0]];
  for (let i = 0; i < 3; i++) {
    result[cornerIndices[i]] = result[cornerIndices[i + 1]];
    result[cornerIndices[i]].position = cornerIndices[i];
    result[cornerIndices[i]].orientation = (result[cornerIndices[i]].orientation + 1) % 3;
  }
  result[cornerIndices[3]] = cornerTemp;
  cornerTemp.position = cornerIndices[3];
  cornerTemp.orientation = (cornerTemp.orientation + 2) % 3;
  
  // Edges
  const edgeIndices = [10, 19, 14, 18];
  const edgeTemp = result[edgeIndices[0]];
  for (let i = 0; i < 3; i++) {
    result[edgeIndices[i]] = result[edgeIndices[i + 1]];
    result[edgeIndices[i]].position = edgeIndices[i];
    result[edgeIndices[i]].orientation = 1 - result[edgeIndices[i]].orientation;
  }
  result[edgeIndices[3]] = edgeTemp;
  edgeTemp.position = edgeIndices[3];
  edgeTemp.orientation = 1 - edgeTemp.orientation;
  
  return result;
}

/**
 * Generate a random valid sequence of moves for shuffling
 */
export function generateShuffleSequence(length = 20) {
  const moves = ['U', 'D', 'L', 'R', 'F', 'B'];
  const modifiers = ['', "'", '2'];
  const sequence = [];
  
  let lastMove = '';
  for (let i = 0; i < length; i++) {
    let move;
    do {
      const base = moves[Math.floor(Math.random() * moves.length)];
      const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
      move = base + mod;
    } while (move[0] === lastMove[0]); // Avoid consecutive same-face moves
    
    sequence.push(move);
    lastMove = move;
  }
  
  return sequence;
}
