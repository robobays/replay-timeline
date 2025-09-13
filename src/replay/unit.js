
export default class Unit {

  constructor(owner, type, id, loop, x, y) {
    this.owner = owner;
    this.types = [];
    this.type = type;
    this.id = id;
    this.enter = loop || 0;
    this.x = x;
    this.y = y;
    this.exit = Infinity;
  }

  morph(loop, type) {
    this.types.push({ loop, type: this.type });
    this.type = type;
  }

  getType(loop) {
    for (const morph of this.types) {
      if (loop < morph.loop) return morph.type;
    }

    return this.type;
  }

  toString() {
    return this.type + " " + this.id;
  }
}
