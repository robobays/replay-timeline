
export default class Upgrade {

  constructor(owner, type, loop) {
    this.owner = owner;
    this.type = type;
    this.enter = loop || 0;
  }

  toString() {
    return this.type;
  }
}
