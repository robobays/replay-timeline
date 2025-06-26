import Event from "./event.js";
import readMapDetails from "./map.js";
import readTrackerEvents from "./tracker.js";

export default class Replay {

  bases = { player1: null, player2: null };
  order = { 1: {}, 2: {} };
  events = [];
  units = new Map();
  warnings = new Set();

  constructor(mpq) {
    readMapDetails(this, mpq.read("replay.details"));
    readTrackerEvents(event => collect(this, event), this, mpq.read("replay.tracker.events"));

    if (this.bases && this.bases.player1 && this.bases.player2) {
      this.side = (this.bases.player1.x < this.bases.player2.x) ? 1 : 2;
    } else {
      this.side = 0;
    }
  }

  unit(tag) {
    return this.units.get(tag);
  }

  warning(log) {
    this.warnings.add(log);
  }

}

function collect(replay, event) {
  if (!event) return;
  if (event === Event.MutedEvent) return;
  if (event === Event.UnknownEvent) return;

  event.resolve(replay);

  if (event.loop && event.stype && (event.type === Event.Enter) && ((event.pid === 1) || (event.pid === 2)) && !replay.order[event.pid][event.stype]) {
    replay.order[event.pid][event.stype] = event.loop;
  }

  if (!replay.bases.player1 && (event.type === Event.Enter) && (event.pid === 1)) replay.bases.player1 = replay.unit(event.sid);
  if (!replay.bases.player2 && (event.type === Event.Enter) && (event.pid === 2)) replay.bases.player2 = replay.unit(event.sid);

  replay.events.push(event);
}
