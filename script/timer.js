import Format from './format.js';
import Dom from './dom.js';
import { addSolve, getAllSolves } from './localDatabase.js';

// * DOM Elements
const minuteElement = document.querySelector('#minute');
const secondElement = document.querySelector('#second');
const millisecondElement = document.querySelector('#millisecond');
let addNoteInput = document.querySelector('#add-note-input');

// * Timer Variables
let minute = 0;
let second = 0;
let millisecond = 0;
let tempMinute = 0;
let tempSecond = 0;
let tempMillisecond = 0;
let timerInterval;

let isDnf = false;
let havePenalty = false;
let isSpecialActionUsed = false;
let typeOfPuzzle = '3x3'; // * Default type of puzzle

let isSolveSave = false;
const dom = new Dom(); // * Instance of Dom
const format = new Format();

class Timer {
  // * Main timer
  mainTimer() {
    const MINUTE = 60;
    const SECOND = 1000;

    if ((millisecond += 10) == SECOND) {
      second++;
      millisecond = 0;
    }

    if (second == MINUTE) {
      minute++;
      second = 0;
      dom.showMinute(); // * create a span if 60 seconds or 1 min exceeds
    }

    if (minute > 0) {
      minuteElement.innerText = `${minute}`;
      secondElement.innerText = format.formatSecond(second); // * add 0 if second is less than 10
    } // * this only happend if 1 min exceeds

    // * This statement only functions if minute is 0
    if (minute == 0) {
      secondElement.innerText = second; // * Second will not be formated
    }
    millisecondElement.innerText = format.formatMillisecond(millisecond);
  }

  // * Start timer
  timerStart() {
    dom.hideElements();
    dom.timerRunning();
    timerInterval = setInterval(this.mainTimer.bind(this), 10);
  }

  timerStop() {
    clearInterval(timerInterval);
    isSolveSave = true;
    dom.timerEnd();
    dom.showHideElements();
    dom.showActions();
    getAllSolves();
  }

  timerReset() {
    if(isSolveSave === true) {
      saveSolve();
    }
    
    dom.hideActions();

    minute = 0;
    second = 0;
    millisecond = 0;
    addNoteInput.value = null;

    if (isDnf == true || havePenalty == true) {
      dom.hideDnfSpan() || dom.hidePenaltySpan();
      dom.hideUndoButton();
      showFormatedTime();
      isDnf = false;
      havePenalty = false;
    }
    dom.hideMinute();
    secondElement.innerText = '0';
    millisecondElement.innerText = '00';
  }

}

// ***** Export Module *****
// * Main timer
let isTimerRunning = false;
export function render() {
  const timer = new Timer();
  if (isTimerRunning == false) {
    timer.timerReset();
    timer.timerStart();
    isTimerRunning = true;
  } else {
    timer.timerStop();
    isTimerRunning = false;
  }
}

// * Save Note
function saveSolve() {
  const date = new Date();
  let solve = {
    timestamp: getTimestamp(),
    minute,
    second,
    millisecond,
    dnf: isDnf,
    penalty: havePenalty,
    note: getInputString(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
  };

  addSolve(solve);
}

// * Get Solves
function getSolves() {
  let solvesArray = [{}];
}

// * Testing Function
export function testLog(messege) {
  console.log(`Log: ${messege}`);
  console.log(`${minute} ${second} ${format.formatMillisecond(millisecond)}`);
}

// ***** FUNCTIONS *****

// * Show formated time
function showFormatedTime() {
  if (minute === 0) {
    secondElement.innerText = second;
    millisecondElement.innerText = format.formatMillisecond(millisecond);
    dom.showTimer(minute);
  }

  if (minute > 0) {
    minuteElement.innerText = minute;
    secondElement.innerText = format.formatSecond(second);
    millisecondElement.innerText = format.formatMillisecond(millisecond);
    dom.showTimer(minute);
  }
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

// * Actions buttons elements
const removeSolveButton = document.querySelector('#remove-solve');
const dnfButton = document.querySelector('#dnf');
const penaltyButton = document.querySelector('#add-penalty');
const addNoteButton = document.querySelector('#add-note');
const undoButton = document.querySelector('#undo-button');
// * Modal elements
const removeCancelButton = document.querySelector(
  '#remove-solve-modal .cancel-button'
);
const removeRemoveButton = document.querySelector('.remove-button');
const addNoteCancelButton = document.querySelector(
  '#add-note-modal .cancel-button'
);
const addNoteDoneButton = document.querySelector(
  '#add-note-modal .done-button'
);

//***** Actions buttons and functions *****/
// * Remove solve action button
removeSolveButton.addEventListener('click', () => {
  dom.showRemoveModal();
});

// * Remove solve
function removeSolve() {
  minute = 0;
  second = 0;
  millisecond = 0;

  dom.removeSolve(minute);
  dom.hideActions();
}

// ! FOR REMOVE SOLVE MODAL
removeCancelButton.addEventListener('click', () => {
  testLog('solve not removed');
  dom.hideRemoveModal();
  
});

removeRemoveButton.addEventListener('click', () => {
  dom.removeSolve(minute);
  removeSolve();
  testLog('solve removed');
  dom.hideRemoveModal();
  isSolveSave = false;
});

// * DNF action button
dnfButton.addEventListener('click', () => {
  if (minute === 0 && second === 0 && millisecond === 0) return;
  isDnf = true;
  isSpecialActionUsed = true;
  isSolveSave = true;

  dnfSolve();
  dom.undoAction(isSpecialActionUsed);
  isSpecialActionUsed = false;
  testLog(`dnf: ${isDnf}`);
});

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

// * Penalty action button
penaltyButton.addEventListener('click', () => {
  if (minute === 0 && second === 0 && millisecond === 0) return;
  havePenalty = true;
  isSpecialActionUsed = true;
  isSolveSave = true;

  addPenalty();
  dom.undoAction(isSpecialActionUsed);
  isSpecialActionUsed = false;
  testLog(`have penalty: ${havePenalty}`);
});

// * Add penalty solve
function addPenalty() {
  tempMinute = minute;
  tempSecond = second;
  tempMillisecond = millisecond;

  const addTwoSecondsPenalty = 2;
  second = second + addTwoSecondsPenalty;

  dom.hideTimer();
  dom.showPenaltySpan();

  if (minute === 0) {
    dom.addPenalty(minute, second, format.formatMillisecond(millisecond));
    return;
  }

  dom.addPenalty(
    minute,
    format.formatSecond(second),
    format.formatMillisecond(millisecond)
  );
}

// * Add note action button
addNoteButton.addEventListener('click', () => {
  dom.showAddNote();
});

// * Get Inuput String
function getInputString() {
  return addNoteInput.value;
}

// ! FOR ADD NOTE MODAL
addNoteCancelButton.addEventListener('click', () => {
  dom.hideAddNote();
});

addNoteDoneButton.addEventListener('click', () => {
  dom.hideAddNote();
  getInputString();
  isSolveSave = true;
});

// * Undo action button
undoButton.addEventListener('click', () => {
  dom.hideDnfSpan() || dom.hidePenaltySpan();
  undoAction();
  dom.undoAction(isSpecialActionUsed);
  isSpecialActionUsed = true;
});

// * Undo action
function undoAction() {
  minute = tempMinute;
  second = tempSecond;
  millisecond = tempMillisecond;
  showFormatedTime();

  testLog('Undo action');
}
