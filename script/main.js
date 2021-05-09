import { render } from './timer.js';

// * Spacebar key input
document.body.onkeyup = (e) => {
  if (e.key === ' ' || e.key === 'Spacebar') {
    e.preventDefault();
    render();
  }
};

