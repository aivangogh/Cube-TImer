const minuteElement = document.querySelector('#minute');
const minuteColonElement = document.querySelector('#minute-colon');
const secondElement = document.querySelector('#second');
const millisecondPeriodElement = document.querySelector('#millisecond-period');
const millisecondElement = document.querySelector('#millisecond');
const timerElement = document.querySelector('#timer');

const optionsElement = document.querySelector('#options-wrapper');
const dnfSpanElement = document.querySelector('#dnf-span');
const undoButtonElement = document.querySelector('#undo-button');
const addPenaltySpanElement = document.querySelector('#add-penalty-span');

const removeSolveButton = document.querySelector('#remove-solve-modal');
const overlayElement = document.querySelector('#overlay');

const hideElements = document.querySelectorAll('.hide');

import { testLog } from './timer.js';

export default class Dom {
  timerStart() {
    timerElement.style.transform = 'scale(1.20)';
    timerElement.style.transition = '300ms ease-in';
  }

  timerEnd() {
    timerElement.style.transform = 'scale(1)';
  }

  // * Hide Timer
  hideTimer() {
    minuteElement.style.display = 'none';
    minuteColonElement.style.display = 'none';
    second.style.display = 'none';
    millisecondPeriodElement.style.display = 'none';
    millisecondElement.style.display = 'none';
  }

  // * Show Timer
  showTimer(minute) {
    if (minute === 0) {
      second.style.display = 'flex';
      millisecondPeriodElement.style.display = 'flex';
      millisecondElement.style.display = 'flex';
      return;
    }

    minuteElement.style.display = 'flex';
    minuteColonElement.style.display = 'flex';
    second.style.display = 'flex';
    millisecondPeriodElement.style.display = 'flex';
    millisecondElement.style.display = 'flex';
  }

  // * Show minute
  showMinute() {
    minuteElement.style.display = 'flex';
    minuteColonElement.style.display = 'flex';
  }

  // * Hide minute
  hideMinute() {
    minuteElement.style.display = 'none';
    minuteColonElement.style.display = 'none';
  }

  // * Show options after the solve
  showOption() {
    optionsElement.style.display = 'flex';
    optionsElement.style.transition = '300ms ease-in';
  }

  // * Hide solve options
  hideOption() {
    optionsElement.style.display = 'none';
    optionsElement.style.transition = '300ms ease-in';
    undoButtonElement.style.display = 'none';
  }

  // * Undo action
  undoAction(undoActionState) {
    if (undoActionState === true) {
      this.hideOption();
      undoButtonElement.style.display = 'flex';
    }

    if (undoActionState === false) {
      this.showOption();
      undoButtonElement.style.display = 'none';
    }
  }

  // * Remove solve
  removeSolve(minute) {
    if (minute == 0) {
      secondElement.innerText = '0';
      millisecondElement.innerText = '00';
    }

    if (minute > 0) {
      this.hideMinute();
      secondElement.innerText = '0';
      millisecondElement.innerText = '00';
    }
  }

  // * DNF solve
  showDnfSpan() {
    dnfSpanElement.style.display = 'flex';
  }

  hideDnfSpan() {
    dnfSpanElement.style.display = 'none';
  }

  // * Add penalty
  addPenalty(minute, second, millisecond) {
    testLog('dom add penalty');
    const millisecondTemplate = `<span style='font-size: 8.5rem;'>.${millisecond} +</span>`;
    const secondTemplate = `<span style='display: flex; justify-content: center; align-items: baseline;'>${second}${millisecondTemplate}</span>`;
    const minuteTemplate = `<span style='display: flex; justify-content: center; align-items: baseline;'>${minute}:${second}${millisecondTemplate}</span>`;

    if (minute === 0) {
      addPenaltySpanElement.innerHTML = secondTemplate;
    }

    if (minute > 0) {
      addPenaltySpanElement.innerHTML = minuteTemplate;
    }
  }

  showAddPenaltySpan() {
    addPenaltySpanElement.style.display = 'flex';
  }

  hideAddPenaltySpan() {
    addPenaltySpanElement.style.display = 'none';
  }

  

  hideElements() {
    hideElements.forEach((element) => {
      element.style.opacity = '0';
    });
  }

  showHideElements() {
    hideElements.forEach((element) => {
      element.style.opacity = '1';
    });
  }

  // ***** MODAL
  showRemoveModal() {
    removeSolveButton.classList.add('active');
    overlayElement.classList.add('active');
  }

  hideRemoveModal() {
    removeSolveButton.classList.remove('active');
    overlayElement.classList.remove('active');
  }
  // * Add note
  addNote(note) {
    // code here
  }
}
