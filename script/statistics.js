import Format from './format.js'

let solveArray = [];
const format = new Format();

const meanElement = document.querySelector('#mean')

export default class Statistics {
  getSolveArray(array) {
    solveArray = array;
    console.log(solveArray)
  }

  getTotalSolveCount() {
    document.querySelector('.solve-count').innerText = solveArray.length;
  }

  getMean() {
    let mean = calculateMean();

    if (mean > 0 && mean < 1000) 
      meanElement.innerText = format.millisecondToMillisecond(mean);

    if (mean >= 1000 && mean < 60000)
      meanElement.innerText = format.millisecondToSecond(mean);

    if (mean >= 60000)
      meanElement.innerText = format.millisecondToMinute(mean);
  }
}

function calculateMean() {
  let time = 0;
  let total = 0;
  let mean = 0;
  solveArray.map((solve) => {
    time = solve.rawTime;
    total = total + time;
    mean = total / solveArray.length;
  });
  return parseInt(mean.toFixed(0));
}



