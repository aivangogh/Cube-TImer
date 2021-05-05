/* 
  typeOfPuzzle, timestamp, solve, notes (or comment)
*/
import Solve from './solve.js';

let db;
let transac;
let store;
let index;

let request = window.indexedDB.open('solves-db', 1);

request.onupgradeneeded = function () {
  let db = request.result;
  let store = db.createObjectStore('solves', { keyPath: 'typeOfPuzzle' });
};

request.onerror = function (e) {
  console.log(`There was an error: ${e.target.errorCode}`);
};

request.onsuccess = function (e) {
  db = request.result;
  transac = db.transaction('solves', 'readwrite');
  store = transac.objectStore('solves');

  db.onerror = function (e) {
    console.log(`Error: ${e.target.errorCode}`);
  };

  let newSolve = new Solve();
  let typeOfPuzzle = newSolve.typeOfPuzzle;
  let timestamp = newSolve.timestamp;
  let solve = newSolve.solve;

  store.put({
    typeOfPuzzle: typeOfPuzzle,
    timestamp: timestamp,
    solve: solve,
  });
  transac.oncomplete = () => db.close();
};

// * Save solve
// * Delete solve
// * Add time
// * Save DNF solve
// * Add comment/note
// * Delete comment/note
// * Custom catergory
