'use strict';

import { render } from './timer.js';

document.body.addEventListener('keyup', event => {
  if (event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
    render();
  }
});


