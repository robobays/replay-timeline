import UnitType from "./unit-type.js";
import UpgradeType from "./upgrade-type.js";
import Event from "../replay/event.js";

const STATS_LOOPS = 160;
const FIGHT_LOOPS = 60 * 22.4;

export default function timeline(replay) {
  const timeline = [];

  let stats = { type: "stats", start: 0, events: [], end: STATS_LOOPS };
  let fight = { type: "fight", start: 0, events: [], end: FIGHT_LOOPS, value: 0, loss: 0 };
  let end = 0;

  for (const event of replay.events) {
    if (event.loop >= stats.end) {
      timeline.push(processStats(stats));

      stats = { type: "stats", start: stats.end, events: [], end: stats.end + STATS_LOOPS };
    }

    if (event.loop >= fight.end) {
      timeline.push(processFight(replay, fight));

      fight = { type: "fight", start: fight.end, events: [], end: fight.end + FIGHT_LOOPS };
    }

    if (event.type === Event.Count) {
      stats.events.push(event);
      end = Math.max(end, event.loop);
    } else if ((event.type === Event.Enter) || (event.type === Event.Exit)) {
      fight.events.push(event);
      end = Math.max(end, event.loop);
    }
  }

  if (stats.events.length) {
    stats.end = end;
    timeline.push(processStats(stats));
  }

  if (fight.events.length) {
    fight.end = end;
    timeline.push(processFight(replay, fight));
  }

  return timeline;
}

function processStats(stats) {
  const players = {
    1: { resources: {} },
    2: { resources: {} },
  };

  for (const event of stats.events) {
    if (event.type === Event.Count) {
      players[event.pid].resources[event.stype] = event.out;
    }
  }

  stats.players = players;
  delete stats.events;

  return stats;
}

function processFight(replay, fight) {
  const players = {
    1: { bases: [], upgrades: {}, units: {}, value: 0, loss: 0, zones: [] },
    2: { bases: [], upgrades: {}, units: {}, value: 0, loss: 0, zones: [] },
  };

  for (const upgrade of replay.upgrades) {
    if ((upgrade.enter < fight.start) || (upgrade.enter >= fight.end)) continue;
    if ((upgrade.owner !== 1) && (upgrade.owner !== 2)) continue;

    const player = players[upgrade.owner];
    const type = UpgradeType[upgrade.type];

    if (!type) replay.warning(`Unknown upgrade: ${upgrade.type}`);
    if (!type) continue;

    player.upgrades[type.name] = (player.upgrades[type.name] || 0) + 1;
  }

  for (const unit of replay.units.values()) {
    if ((unit.exit < fight.start) || (unit.enter >= fight.end)) continue;
    if ((unit.owner !== 1) && (unit.owner !== 2)) continue;

    const player = players[unit.owner];
    const type = UnitType[unit.getType(fight.end)];

    if (!type) continue;

    if (!player.units[type.name]) {
      player.units[type.name] = {
        type: type.type,
        enter: replay.order[unit.owner][type.name] || 0,
        value: 0,
        count: 0,
        born: 0,
        died: 0,
        loss: 0,
      };
    }

    const data = player.units[type.name];

    data.count++;
    data.value += type.value;
    player.value += type.value;

    if (data.type === "base") {
      addZone(player.bases, unit);
    }

    if (unit.enter >= fight.start) {
      data.born++;
    }

    if (unit.exit <= fight.end) {
      if (hasDroneBuiltStructure(replay, unit)) {
        player.value -= type.value;
      } else {
        data.died++;
        data.loss += type.value;
        player.loss += type.value;
        addZone(player.zones, unit);
      }
    }
  }

  fight.players = players;
  delete fight.events;

  return fight;
}

function addZone(list, pos) {
  if (!pos) return;

  for (const one of list) {
    if ((Math.abs(one.x - pos.x) <= 10) && (Math.abs(one.y - pos.y) <= 10)) return;
  }

  list.push({ x: pos.x, y: pos.y });
}

function hasDroneBuiltStructure(replay, drone) {
  if (drone.type !== "Drone") return false;

  let out;

  for (const op of replay.events) {
    if ((op.sid === drone.id) && (op.type === Event.Make)) out = op.out;

    if ((op.type === Event.Enter) && (op.stype === out)) {
      const structure = replay.unit(op.sid);

      if ((Math.abs(drone.x - structure.x) <= 1) && (Math.abs(drone.y - structure.y) <= 1)) {
        return true;
      }
    }
  }
}
