export default class {
  constructor(status, key, value) {
    this.status = status;
    this.key = key;
    this.value = value;
  }
  toString() {
    return `${this.status}${this.key}: ${this.value}`;
  }
}
