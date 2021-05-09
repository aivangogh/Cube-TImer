import Dom from './dom.js';

// * HTML elements
const minuteElement = document.querySelector('#minute');
const secondElement = document.querySelector('#second');
const millisecondElement = document.querySelector('#millisecond');

// * Variables
let minute = 0;
let second = 0;
let millisecond = 0;

let tempMinute = 0;
let tempSecond = 0;
let tempMillisecond = 0;

let clock; // * For storing temporary solve clock

let typeOfPuzzle = '3x3'; // * Default type of puzzle
let solveTimer = 0; // * Store millisecond for solve timer record accuracy

const dom = new Dom(); // * Instance of Dom

// ***** Export Module *****
// * Main timer
let isSolvingClockStart = false;
export function render() {
  if (isSolvingClockStart == false) {
    resetTimer();
    startTimer();
    dom.hideElements();
    isSolvingClockStart = true;
  } else {
    stopTimer();
    dom.showHideElements();
    isSolvingClockStart = false;
  }
}

// * Testing Function
export function testLog(messege) {
  console.log(`Log: ${messege}`);
  console.log(`${minute} ${second} ${formatMillisecond(millisecond)}`);
}

// ***** FUNCTIONS *****
// * Start timer
function startTimer() {
  timer();  
  dom.timerStart();
  clock = setInterval(timer, 10);
}

// * Stop timer
function stopTimer() {
  clearInterval(clock);
  dom.timerEnd();
  dom.showOption();

  //* Test log
  console.log(
    `Type of puzzle: ${typeOfPuzzle} Timestamp: ${getTimestamp()} SolveTimer: ${solveTimer}`
  );
}

// * Reset timer
function resetTimer() {
  dom.hideOption();

  second = 0;
  millisecond = 0;
  solveTimer = 0;

  if (minute >= 1) {
    minute = 0;
    dom.hideMinute();
  }

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
    dom.showMinute();
  }

  if (minute > 0) {
    const minuteElement = document.querySelector('#minute');
    minuteElement.innerText = `${minute}`;
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
  if (millisecond < 100) return `0${(millisecond / 10).toFixed(0)}`;

  return `${(millisecond / 10).toFixed(0)}`;
}

function formatSecond(second) {
  if (second < 10) return `0${second}`;

  return second;
}

// * Convert solve timer
function convertSolveTime(millisecond) {
  let convertedMinute = millisecond / 1000 / 60;
  console.log(convertedMinute);
  let convertedSecond = (millisecond / 1000) % 60;
  let convertedMillisecond;
}

// * Get timestamp
function getTimestamp() {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  return unixTimestamp * 1000;
}

//***** Options *****/
let undoActionState = true;

// * Remove solve
function removeSolve() {
  minute = 0;
  second = 0;
  millisecond = 0;

  dom.removeSolve(minute);
  dom.hideOption();
}

// * DNF solve
function dnfSolve() {
  tempMinute = minute;
  tempSecond = second;
  tempMillisecond = millisecond;

  minute = 0;
  second = 0;
  millisecond = 0;

  dom.hideTimer();
  dom.showDnfSpan();
}

// * Add penalty solve
function addPenalty() {
  tempMinute = minute;
  tempSecond = second;
  tempMillisecond = millisecond;

  const addTwoSecond = 2;
  second = second + addTwoSecond;

  dom.hideTimer();
  dom.showAddPenaltySpan();

  if (minute === 0) {
    dom.addPenalty(minute, second, formatMillisecond(millisecond));
    return;
  }

  dom.addPenalty(minute, formatSecond(second), formatMillisecond(millisecond));
}

// * Add note
function addNote(note) {
  // code here
}

// * Undo action
function undoAction() {
  minute = tempMinute;
  second = tempSecond;
  millisecond = tempMillisecond;

  if (minute === 0) {
    secondElement.innerText = second;
    millisecondElement.innerText = formatMillisecond(millisecond);
    dom.showTimer(minute);
  }

  if (minute > 0) {
    minuteElement.innerText = minute;
    secondElement.innerText = formatSecond(second);
    millisecondElement.innerText = formatMillisecond(millisecond);
    dom.showTimer(minute);
  }

  testLog('Undo action');
}

// * Save solve
function saveSolve() {
  // // * Save solve time
  // let newSolve = new Solve();
  // newSolve.typeOfPuzzle = typeOfPuzzle;
  // newSolve.timestamp = getTimestamp();
  // newSolve.solve = solveTimer;
}

// ***** EVENT LISTENER *****
const removeSolveButton = document.querySelector('#remove-solve');
const dnfButton = document.querySelector('#dnf');
const addPenaltyButton = document.querySelector('#add-penalty');
const addNoteButton = document.querySelector('#add-note');
const undoButtonButton = document.querySelector('#undo-button');

const cancelSolveButton = document.querySelector(
  '#remove-solve-modal .cancel-button'
);
const removeButton = document.querySelector('.remove-button');

removeSolveButton.addEventListener('click', () => {
  dom.showRemoveModal();
});

cancelSolveButton.addEventListener('click', () => {
  testLog('solve not removed');
  dom.hideRemoveModal();
}); 

removeButton.addEventListener('click', () => {
  dom.removeSolve(minute);
  removeSolve();
  testLog('remove solved');
  dom.hideRemoveModal();
});

dnfButton.addEventListener('click', () => {
  if (minute === 0 && second === 0 && millisecond === 0) return;

  dnfSolve();
  dom.undoAction(undoActionState);
  undoActionState = false;

  testLog('dnf');
});

addPenaltyButton.addEventListener('click', () => {
  if (minute === 0 && second === 0 && millisecond === 0) return;

  testLog('add penalty');
  addPenalty();
  dom.undoAction(undoActionState);
  undoActionState = false;
});

addNoteButton.addEventListener('click', () => {
  dom.undoAction();
});

undoButtonButton.addEventListener('click', () => {
  dom.hideDnfSpan() || dom.hideAddPenaltySpan();

  undoAction();
  dom.undoAction(undoActionState);
  undoActionState = true;
});
