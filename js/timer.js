// * HTML elements
// const minuteElement = document.querySelector('#minute');
const secondElement = document.querySelector('#second');
const millisecondElement = document.querySelector('#millisecond');
const timerElement = document.querySelector('#timer');
const minuteSpan = document.createElement('span');

// * Variables
let minute = 0;
let second = 0;
let millisecond = 0;
let solvingClock;

// ***** FUNCTIONS *****
// * Start timer
startTimer = () => {
    timer();
    solvingClock = setInterval(timer, 10);
}

// * End timer
endTimer = () => {
    clearInterval(solvingClock);
}

// * Reset timer
resetTimer = () => {
    // minute = 0;
    second = 0;
    millisecond = 0;

    // minuteElement.innerText = '0';
    secondElement.innerText = '0';
    millisecondElement.innerText = '00';
}

// * Main timer
timer = () => {
    const MINUTE = 60;
    const SECOND = 1000;

    if((millisecond += 10) == SECOND) {
        second++;
        millisecond = 0;
    }

    if(second == MINUTE) {
        minute++; 
        second = 0;
    }
    
    millisecondElement.innerText = formatMillisecond(millisecond);
    secondElement.innerText = second;
}

// * Millisecond format from 3 digits to 2 digits and
// * placing 0 if ms is less than 100ms
formatMillisecond = millisecond => {
    if(millisecond < 100)
        return `0${(millisecond / 10).toFixed(0)}`;

    return (millisecond / 10).toFixed(0).toString();
}

// * Event listener
// * Spacebar key input 
let isSolvingClockStart = false;
document.body.onkeyup = keyInput => {
    if(keyInput.key === ' ' || keyInput.key === 'Spacebar') {
        keyInput.preventDefault();
       
        if(isSolvingClockStart == false) {
            resetTimer();
            startTimer();
            isSolvingClockStart = true;
        } else {
            endTimer(); 
            isSolvingClockStart = false;
        }
    }   
}  

