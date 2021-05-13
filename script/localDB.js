import Format from './format.js';
import Statistics from './statistics.js';

const format = new Format();
const stat = new Statistics();

const DB_VERSION = 1;
const DB_NAME = 'Solves-DB';
const DB_STORE_NAME = 'solves';

let db;
let request = window.indexedDB.open(DB_NAME, DB_VERSION);

request.onerror = function (event) {
  console.log(`Error: ${event.onerror}`);
};

request.onsuccess = function (event) {
  db = request.result;
  console.log('success: ' + db);
  getAllSolves();
};

request.onupgradeneeded = function (event) {
  let db = event.target.result;
  let objectStore = db.createObjectStore(DB_STORE_NAME, {
    keyPath: 'timestamp',
  });
};

function makeTransaction(storeName, mode) {
  let tx = db.transaction(storeName, mode);
  tx.onerror = (err) => {
    console.warn(err);
  };
  return tx;
}

export function addSolve(solve) {
  let transaction = makeTransaction(DB_STORE_NAME, 'readwrite');
  let objectStore = transaction.objectStore(DB_STORE_NAME);
  let request = objectStore.add(solve);

  request.onsuccess = function (event) {
    console.log(solve);
  };

  request.onerror = function (event) {
    console.log(`Error: data could not add to database.`);
  };
}

export async function getAllSolves() {
  const recordElement = document.querySelector('.record');
  let transaction = makeTransaction(DB_STORE_NAME, 'readonly');
  let objectStore = transaction.objectStore(DB_STORE_NAME);
  let getRequest = objectStore.getAll();

  getRequest.onsuccess = function (event) {
    let request = event.target;
    let solveArray = [];
    request.result
      .map((solve) => {
        solveArray.push({
          timestamp: solve.timestamp,
          rawTime: solve.rawTime,
          solveTime: {
            minute: solve.solveTime.minute,
            second: solve.solveTime.second,
            millisecond: solve.solveTime.millisecond,
          },
          date: {
            year: solve.date.year,
            month: solve.date.month,
            day: solve.date.day,
          },
          dnf: solve.dnf,
          penalty: solve.penalty,
        });
      });
      solveArray.reverse();
      stat.getSolveArray(solveArray);
      stat.getTotalSolveCount();
      stat.getMean();
      recordElement.innerHTML = solveArray.map(solve => {
        return printSolves(
          solve.timestamp,
          solve.solveTime.minute,
          solve.solveTime.second,
          solve.solveTime.millisecond,
          solve.dnf,
          solve.penalty,
          solve.date.month,
          solve.date.day
        );
      }).join('');
      
  };
}

function read() {
  var transaction = db.transaction([DB_STORE_NAME]);
  var objectStore = transaction.objectStore(DB_STORE_NAME);
  var request = objectStore.get('00-03');

  request.onerror = function (event) {
    alert('Unable to retrieve daa from database!');
  };

  request.onsuccess = function (event) {
    // Do something with the request.result!
    if (request.result) {
      alert(
        'Name: ' +
          request.result.name +
          ', Age: ' +
          request.result.age +
          ', Email: ' +
          request.result.email
      );
    } else {
      alert("Kenny couldn't be found in your database!");
    }
  };
}

function remove() {
  var request = db
    .transaction(['employee'], 'readwrite')
    .objectStore('employee')
    .delete('00-03');

  request.onsuccess = function (event) {
    alert("Kenny's entry has been removed from your database.");
  };
}

function printSolves(timestamp, minute, second, millisecond, dnf, penalty, month, day) {
  if (minute > 0 && dnf === false && penalty === false) {
    return format.minuteTemplate(
      timestamp,
      minute,
      second,
      millisecond,
      month,
      day
    );
  }

  // equivalent of seconds
  if (minute === 0 && dnf === false && penalty === false) {
    return format.secondTemplate(
      timestamp,
      second,
      millisecond,
      month,
      day
    );
  }

  if (
    dnf === true &&
    minute === 0 &&
    second === 0 &&
    millisecond === 0
  ) {
    return format.dnfTemplate(timestamp, month, day);
  }

  if (penalty === true && minute > 0) {
    return format.penaltyMinuteTemplate(
      timestamp,
      minute,
      second,
      millisecond,
      month,
      day
    );
  }

  if (penalty === true && minute === 0) {
    return format.penaltySecondTemplate(
      timestamp,
      second,
      millisecond,
      month,
      day
    );
  }
}

// let db = null;
// let objectStore = null;
// let tx;
// let openRequest = indexedDB.open(DB_NAME, DB_VERSION);

// openRequest.onupgradeneeded = (event) => {
//   db = event.target.request;
//   if(!db.objectStoreNames.contains(DB_STORE_NAME)) {
//     objectStore = db.createObjectStore(DB_STORE_NAME, {
//       keyPath: 'timestamp',
//     });
//   }

// };

// openRequest.onerror = () => console.warn(`Error: ${openRequest.error}`);

// openRequest.onsuccess = (event) => {
//   db = event.target.result;
//   console.log(`success: ${db}`);
// };

// export function addSolve(solve) {
//   tx = db.transaction(DB_STORE_NAME, 'readwrite');

//   let store = tx.objectStore(DB_STORE_NAME);
//   let request = store.add(solve);

//   tx.onerror = (err) => {
//       console.warn(err);
//   };

//   request.onsuccess = (ev) => {
//     console.log('successfully added an object');
//   };

//   request.onerror = (err) => {
//     console.log('error in request to add');
//   };
// }

// export default class SolveDB {
//   constructor({ timestamp, minute, second, millisecond, dnf, penalty, note }) {
//     this.timestamp = timestamp;
//     this.minute = minute;
//     this.second = second;
//     this.millisecond = millisecond;
//     this.dnf = dnf;
//     this.penalty = penalty;
//     this.note = note;
//   }

//   // * Delete solve
//   // * Add time
//   // * Save DNF solve
//   // * Add comment/note
//   // * Delete comment/note
//   // * Custom catergory
// }
