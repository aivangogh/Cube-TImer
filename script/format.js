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

  minuteTemplate(timestamp, minute, second, millisecond, month, day) {
    let date = this.formatDate(month, day);
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${date.month}/${date.day}</span>
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
    let date = this.formatDate(month, day);
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${date.month}/${date.day}</span>
              <div class="solve">
                <span>${this.formatSecond(second)}</span>
                <span class="millisecond">.${this.formatMillisecond(
                  millisecond
                )}</span>
              </div>
            </div>`;
  }

  dnfTemplate(timestamp, month, day) {
    let date = this.formatDate(month, day);
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${date.month}/${date.day}</span>
              <div class="solve">
                <span>DNF</span>
              </div>
            </div>`;
  }

  penaltyMinuteTemplate(timestamp, minute, second, millisecond, month, day) {
    let date = this.formatDate(month, day);
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${date.month}/${date.day}</span>
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
    let date = this.formatDate(month, day);
    return `<div data-key="${timestamp}"class="card">
              <span class="date">${date.month}/${date.day}</span>
              <div class="solve">
                <span>${this.formatSecond(second)}</span>
                <span class="millisecond">.${this.formatMillisecond(
                  millisecond
                )} +</span>
              </div>
            </div>`;
  }
}

