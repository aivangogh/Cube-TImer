import Dom from './dom.js'
let dom = new Dom();

export default class Format {
  // * Format date
  formatMonth(month) {
    if (month < 10) return `0${month}`;
    return month;
  }

  formatDay(day) {
    if (day < 10) return `0${day}`;
    return day;
  }

  // * Millisecond format from 3 digits to 2 digits and
  // * placing 0 if ms is less than 100ms
  formatMillisecond(millisecond) {
    if (millisecond < 100) return `0${(millisecond / 10).toFixed(0)}`;
    return `${(millisecond / 10).toFixed(0)}`;
  }

  // * Format second when a minute exceeds
  formatSecond(second) {
    if (second < 10) return `0${second}`;
    return second;
  }

  // * Convert solve timer
  convertSolveTime(millisecond) {
    if(millisecond < 1000)
      console.log(`${millisecondToMillisecond(millisecond)}`);

    if(millisecond >= 1000 && millisecond < 60000)
      console.log(`${millisecondToSecond(millisecond)}`);

    if(millisecond >= 60000)
      console.log(`${millisecondToMinute()}`);
  }

  millisecondToMinute(millis) {
    let minute = Math.floor(millis / 60000);
    let second = ((millis % 60000) / 1000).toFixed(0);
    let millisecond = ((millis % 1000) * 0.1).toFixed(0);

    if(second < 10) return `${minute}:0${second}.${millisecond}`;

    return `${minute}:${second}.${millisecond}`;
  }

  millisecondToSecond(millis) {
    let second = (millis / 1000).toFixed(0);
    let millisecond = ((millis % 1000) * 0.1).toFixed(0);

    return `${second}.${millisecond}`;
  }

  millisecondToMillisecond(millis) {
    let millisecond = ((millis % 1000) * 0.1).toFixed(0);

    return `.${millisecond}`;
  }


  minuteTemplate(timestamp, minute, second, millisecond, month, day) {
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${this.formatMonth(month)}/${this.formatMonth(
      day
    )}</span>
              <div class="solve">
                  <span>${minute}:</span>
                  <span>${this.formatSecond(second)}</span>
                  <span class="millisecond">.${this.formatMillisecond(
                    millisecond
                  )}</span>
              </div>
            </div>`;
  }

  secondTemplate(timestamp, second, millisecond, month, day) {
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${this.formatMonth(month)}/${this.formatMonth(
      day
    )}</span>
              <div class="solve">
                <span>${second}</span>
                <span class="millisecond">.${this.formatMillisecond(
                  millisecond
                )}</span>
              </div>
            </div>`;
  }

  dnfTemplate(timestamp, month, day) {
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${this.formatMonth(month)}/${this.formatMonth(
      day
    )}</span>
              <div class="solve">
                <span>DNF</span>
              </div>
            </div>`;
  }

  penaltyMinuteTemplate(
    timestamp,
    minute,
    second,
    millisecond,
    month,
    day
  ) {
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${this.formatMonth(month)}/${this.formatMonth(
      day
    )}</span>
              <div class="solve">
                <span>${minute}:</span>
                <span>${this.formatSecond(second)}</span>
                <span class="millisecond">.${this.formatMillisecond(
                  millisecond
                )} +</span>
              </div>
            </div>`;
  }

  penaltySecondTemplate(timestamp, second, millisecond, month, day) {
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${this.formatMonth(month)}/${this.formatMonth(
      day
    )}</span>
              <div class="solve">
                <span>${second}</span>
                <span class="millisecond">.${this.formatMillisecond(
                  millisecond
                )} +</span>
              </div>
            </div>`;
  }
}




