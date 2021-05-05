export default class Solve {
  constructor(typeOfPuzzle, timestamp, solve) {
    this.typeOfPuzzle = typeOfPuzzle;
    this.timestamp = timestamp;
    this.solve = solve;
  }

  get typeOfPuzzle() {
    return this._typeOfPuzzle;
  }

  set typeOfPuzzle(typeOfPuzzle) {
    this._typeOfPuzzle = typeOfPuzzle;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(timestamp) {
    this._timestamp = timestamp;
  }

  get solve() {
    return this._solve;
  }

  set solve(solve) {
    this._solve = solve;
  }
}