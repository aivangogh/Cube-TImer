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
    console.log({getRequest});
    let request = event.target;
    console.log({ request });
    recordElement.innerHTML = request.result
      .map((solve) => {
        if (solve.minute > 0) {
          return minuteTemplate(
            solve.timestamp,
            solve.minute,
            solve.second,
            solve.millisecond,
            solve.month,
            solve.day
          );
        }

        // equivalent of seconds
        if (solve.minute == 0) {
          return secondTemplate(
            solve.timestamp,
            solve.second,
            solve.millisecond,
            solve.month,
            solve.day
          );
        }

        if (solve.dnf == true && solve.minute == 0 && solve.second == 0 && solve.millisecond == 0) {
          return dnfTemplate(
            solve.timestamp,
            solve.month,
            solve.day
          );
        }

        if (solve.penalty == true) {
          return penaltyMinuteTemplate(
            solve.timestamp,
            solve.minute,
            solve.second,
            solve.millisecond,
            solve.month,
            solve.day
          );
        }

        if (solve.minute == 0) {
          return penaltySecondTemplate(
            solve.timestamp,
            solve.second,
            solve.millisecond,
            solve.month,
            solve.day
          );
        }

        return `<div data-key="${solve.timestamp}"class="card">
                <span class="date">0${solve.month}/${solve.day}</span>
                <div class="solve">
                  <span>${solve.minute}:</span>
                  <span>${solve.second}</span>
                  <span class="millisecond">.${solve.millisecond}</span>
                </div>
              </div>`;
      })
      .join('');
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

// * Format date
function formatMonth(month) {
  if (month < 10) return `0${month}`;
  return month;
}

function formatDay(day) {
  if (day < 10) return `0${day}`;
  return day;
}

// * Millisecond format from 3 digits to 2 digits and
// * placing 0 if ms is less than 100ms
function formatMillisecond(millisecond) {
  if (millisecond < 100) return `0${(millisecond / 10).toFixed(0)}`;
  return `${(millisecond / 10).toFixed(0)}`;
}

// * Format second when a minute exceeds
function formatSecond(second) {
  if (second < 10) return `0${second}`;
  return second;
}

function minuteTemplate(timestamp, minute, second, millisecond, month, day) {
  return `<div data-key="${timestamp}"class="card">
            <span class="date">${formatMonth(month)}/${formatMonth(day)}</span>
            <div class="solve">
                <span>${minute}:</span>
                <span>${formatSecond(second)}</span>
                <span class="millisecond">.${formatMillisecond(
                  millisecond
                )}</span>
            </div>
          </div>`;
}

function secondTemplate(timestamp, second, millisecond, month, day) {
  return `<div data-key="${timestamp}"class="card">
            <span class="date">${formatMonth(month)}/${formatMonth(day)}</span>
            <div class="solve">
              <span>${second}</span>
              <span class="millisecond">.${formatMillisecond(
                millisecond
              )}</span>
            </div>
          </div>`;
}

function dnfTemplate(timestamp, month, day) {
  return `<div data-key="${timestamp}"class="card">
            <span class="date">${formatMonth(month)}/${formatMonth(day)}</span>
            <div class="solve">
              <span>DNF</span>
            </div>
          </div>`;
}

function penaltyMinuteTemplate(timestamp, minute, second, millisecond, month, day) {
  return `<div data-key="${timestamp}"class="card">
            <span class="date">${formatMonth(month)}/${formatMonth(day)}</span>
            <div class="solve">
              <span>${minute}:</span>
              <span>${formatSecond(second)}</span>
              <span class="millisecond">.${formatMillisecond(
                millisecond
              )} +</span>
            </div>
          </div>`;
}

function penaltySecondTemplate(timestamp, second, millisecond, month, day) {
  return `<div data-key="${timestamp}"class="card">
            <span class="date">${formatMonth(month)}/${formatMonth(day)}</span>
            <div class="solve">
              <span>${second}</span>
              <span class="millisecond">.${formatMillisecond(
                millisecond
              )} +</span>
            </div>
          </div>`;
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
