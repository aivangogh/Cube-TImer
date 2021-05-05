const afterSolveOption = document.querySelector('.hide-option');
// * Reveal options after the solve 
export function viewOption() {
  afterSolveOption.style.display = 'flex';
}

// * Hide solve options
export function hideOption() {
  afterSolveOption.style.display = 'none';
}

const minuteSpan = document.createElement('span');
const timerElement = document.querySelector('.timer');

// * Create span for minute
export function createMinuteSpan() {
  minuteSpan.id = 'minute';

  const secondElement = document.querySelector('#second');
  timerElement.insertBefore(minuteSpan, secondElement);
}

// * Remove minute span
export function removeMinuteSpan() {
  const minuteElement = document.querySelector('#minute');
  timerElement.removeChild(minuteElement);
}