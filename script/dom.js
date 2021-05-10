import { testLog } from './timer.js';

const minuteElement = document.querySelector('#minute');
const colonElement = document.querySelector('#colon');
const secondElement = document.querySelector('#second');
const decimalElement = document.querySelector('#decimal');
const millisecondElement = document.querySelector('#millisecond');
const timerElement = document.querySelector('#timer');

const actionsElements = document.querySelector('#actions-wrapper');
const dnfSpanElement = document.querySelector('#dnf-span');
const undoButtonElement = document.querySelector('#undo-button');
const addPenaltySpanElement = document.querySelector('#add-penalty-span');

const removeSolveButton = document.querySelector('#remove-solve-modal');
const addNoteButton = document.querySelector('#add-note-modal');
const overlayElement = document.querySelector('#overlay');

const hideElements = document.querySelectorAll('.hide');

export default class Dom {
  timerRunning() {
    timerElement.style.transform = 'scale(1.20)';
    timerElement.style.transition = '300ms ease-in';
  }

  timerEnd() {
    timerElement.style.transform = 'scale(1)';
  }

  // * Hide Timer
  hideTimer() {
    minuteElement.style.display = 'none';
    colonElement.style.display = 'none';
    second.style.display = 'none';
    decimalElement.style.display = 'none';
    millisecondElement.style.display = 'none';
  }

  // * Show Timer
  showTimer(minute) {
    if (minute === 0) {
      second.style.display = 'flex';
      decimalElement.style.display = 'flex';
      millisecondElement.style.display = 'flex';
      return;
    }

    minuteElement.style.display = 'flex';
    colonElement.style.display = 'flex';
    second.style.display = 'flex';
    decimalElement.style.display = 'flex';
    millisecondElement.style.display = 'flex';
  }

  // * Show minute
  showMinute() {
    minuteElement.style.display = 'flex';
    colonElement.style.display = 'flex';
  }

  // * Hide minute
  hideMinute() {
    minuteElement.style.display = 'none';
    colonElement.style.display = 'none';
  }

  // * Show options after the solve
  showActions() {
    actionsElements.style.display = 'flex';
    actionsElements.style.transition = '300ms ease-in';
  }

  // * Hide solve options
  hideActions() {
    actionsElements.style.display = 'none';
    actionsElements.style.transition = '300ms ease-in';
    undoButtonElement.style.display = 'none';
  }

  // * Undo action
  undoAction(isSpecialActionUsed) {
    if (isSpecialActionUsed === true) this.showUndoButton();

    if (isSpecialActionUsed === false) this.hideUndoButton();
  }

  showUndoButton() {
    this.hideActions();
    undoButtonElement.style.display = 'flex';
  }

  hideUndoButton() {
    this.showActions();
    undoButtonElement.style.display = 'none';
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

  showPenaltySpan() {
    addPenaltySpanElement.style.display = 'flex';
  }

  hidePenaltySpan() {
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
    removeSolveButton.style.display = 'flex';
    overlayElement.classList.add('active');
  }

  hideRemoveModal() {
    removeSolveButton.style.display = 'none';
    overlayElement.classList.remove('active');
  }
  // * Add note
  showAddNote() {
    addNoteButton.style.display = 'flex';
    overlayElement.classList.add('active');
  }

  hideAddNote() {
    addNoteButton.style.display = 'none';
    overlayElement.classList.remove('active');
  }
}
