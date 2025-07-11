
export default class Event {

  static EndEvent = new Event("END");
  static MutedEvent = new Event("MUTED");
  static UnknownEvent = new Event("UNKNOWN");

  static Count = "count"; // A snaphost count of the subject.
  static Enter = "enter"; // The subject appears. Examples: new unit, new structure, complete upgrade.
  static Morph = "morph"; // The subject becomes something else. Examples: Gateway transforms into WarpGate.
  static Make  =  "make"; // The subject produces something. Examples: a Nexus trains a Probe.
  static Help  =  "help"; // The subject affects the target positively. Examples: a Nexus chronoboosts, a Medivac heals.
  static Harm  =  "harm"; // The subject affects the target negatively. Examples: a Zealot attacks a Zergling.
  static Exit  =  "exit"; // The subject disappears. Examples: structure is destroyed, hallucination ends.

  constructor(type, loop, pid, subject, out, target, x, y) {
    this.type = type;       // Event type
    this.loop = loop;       // Game loop
    this.pid = pid;         // Player id
    this.subject = subject;
    this.target = target;
    this.out = out;         // The output
    this.x = x;
    this.y = y;
  }

  resolve(replay) {
    if (this.subject) {
      const unit = replay.unit(this.subject);

      if (unit) {
        this.pid = unit.owner;
        this.stype = unit.type; // Subject type
        this.sid = unit.id;     // Subject instance
      } else {
        this.stype = this.subject;
        this.sid = null;
      }

      delete this.subject;
    }

    if (this.target) {
      const unit = replay.unit(this.target);

      if (unit) {
        this.ttype = unit.type; // Target type
        this.tid = unit.id;     // Target instance
      } else {
        this.ttype = this.target;
        this.tid = null;
      }

      delete this.target;
    }
  }

}
