import { render } from './timer.js';

// ***** Event listener *****
// * Spacebar key input
document.body.onkeyup = (e) => {
  if (e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault();
    render();
  }
};

// * Test runs
// if (!('indexedDB' in window)) {
//   console.log("This browser doesn't support IndexedDB");
//   return;
// }