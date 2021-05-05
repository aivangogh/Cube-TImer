import {
  viewOption,
  hideOption,
  createMinuteSpan,
  removeMinuteSpan,
} from './dom.js';

import Solve from './solve.js';

// * HTML elements
const secondElement = document.querySelector('#second');
const millisecondElement = document.querySelector('#millisecond');

// * Variables
let minute = 0;
let second = 0;
let millisecond = 0;
let clock; // * For storing temporary solve clock

let typeOfPuzzle = 3;
let solveTimer = 0; // * Store millisecond for solve timer record accuracy
                    // * This will be convert to minute, second, and millisecond

// ***** FUNCTIONS *****
// * Start timer
function startTimer() {
  timer();
  clock = setInterval(timer, 10);
}

// * Stop timer
function stopTimer() {
  clearInterval(clock);
  
  console.log(typeOfPuzzle);
  console.log(getTimestamp());
  console.log(solveTimer);

  // * Save solve time
  let newSolve = new Solve();
  newSolve.typeOfPuzzle = typeOfPuzzle;
  newSolve.timestamp = getTimestamp();
  newSolve.solve = solveTimer;
}

// * Reset timer
function resetTimer() {
  if (minute >= 1) removeMinuteSpan();
  
  minute = 0;
  second = 0;
  millisecond = 0;
  solveTimer = 0;

  secondElement.innerText = '0';
  millisecondElement.innerText = '00';
}

// * Main timer
function timer() {
  const MINUTE = 60;
  const SECOND = 1000;

  // * continue to record the time in form of millisecond
  solveTimer += 10;

  if ((millisecond += 10) == SECOND) {
    second++;
    millisecond = 0;
  }
 
  if (second == MINUTE) {
    minute++;
    second = 0;
    // * create a span if 60 seconds or 1 min exceeds
    createMinuteSpan();
  }

  if (minute > 0) {
    const minuteElement = document.querySelector('#minute');
    minuteElement.innerText = `${minute}:`;
    // * add 0 if second is less than 10
    // * this only happend if 1 min exceeds
    secondElement.innerText = formatSecond(second);
  }

  // * This statement only functions if minute is 0
  if (minute == 0) {
    secondElement.innerText = second; // * Second will not be formated
  }

  millisecondElement.innerText = formatMillisecond(millisecond);
}

// * Millisecond format from 3 digits to 2 digits and
// * placing 0 if ms is less than 100ms
function formatMillisecond(millisecond) {
  if (millisecond < 100) return `.0${(millisecond / 10).toFixed(0)}`;

  return `.${(millisecond / 10).toFixed(0)}`;
}

function formatSecond(second) {
  if (second < 10) return `0${second}`;

  return second;
}

// * Convert solve timer
function convertSolveTime(millisecond) {
  let convertedMinute = (millisecond / 1000) / 60;
  console.log(convertedMinute);
  let convertedSecond = (millisecond / 1000) % 60;;
  let convertedMillisecond;
}

// * Get timestamp
function getTimestamp() {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  return unixTimestamp * 1000;
}

// ***** Export Module *****

// * Main timer
let isSolvingClockStart = false;
export function render() {
  if (isSolvingClockStart == false) {
    hideOption();
    resetTimer();
    startTimer();
    isSolvingClockStart = true;
  } else {
    stopTimer();
    viewOption();
    isSolvingClockStart = false;
    
  }
}
