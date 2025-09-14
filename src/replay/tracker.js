import Event from "./event.js";
import Unit from "./unit.js";
import Upgrade from "./upgrade.js";

export default function readTrackerEvents(events, replay, decoder) {
  try {
    let loop = 0;

    while (decoder.seek((a, b) => (a === 0x03) && ((b === 0x00) || (b === 0x02)), 2)) {
      decoder.skip(2); // 03 00

      loop += decoder.read();

      const type = decoder.read();
      const data = decoder.read();

      readTrackerEvent(events, replay, loop, type, data);
    }
  } finally {
    events(Event.EndEvent);
  }
}

function readTrackerEvent(events, replay, loop, type, data) {
  switch (type) {
    case 0: return readPlayerStatsEvent(events, loop, data);
    case 1: return readUnitBornEvent(events, replay, loop, data);
    case 2: return readUnitDiedEvent(events, replay, loop, data);
    case 3: return readUnitOwnerChangeEvent();
    case 4: return readUnitTypeChangeEvent(events, replay, loop, data);
    case 5: return readUpgradeCompleteEvent(events, replay, loop, data);
    case 6: return readUnitInitEvent(replay, loop, data);
    case 7: return readUnitDoneEvent(events, replay, loop, data);
    case 8: return readUnitPositionsEvent();
    case 9: return readPlayerSetupEvent();
  }
}

function readPlayerStatsEvent(events, loop, data) {
  const player = data["0"];
  const stats = data["1"];
  const minerals = Math.max(stats["0"], 0);
  const vespene = Math.max(stats["1"], 0);
  const foodUsed = Math.max(stats["29"], 0) / 4096.0;
  const foodMade = Math.max(stats["30"], 0) / 4096.0;
  const activeWorkers = Math.max(stats["4"], 0);
  const activeForces = Math.max(stats["31"], 0) + Math.max(stats["32"], 0);
  const valueKilled = Math.max(stats["23"], 0) + Math.max(stats["24"], 0) + Math.max(stats["25"], 0) + Math.max(stats["26"], 0) + Math.max(stats["27"], 0) + Math.max(stats["28"], 0);

  let totalValue = minerals + vespene;
  for (let i = 5; i <= 22; i++) {
    totalValue += Math.max(stats[i], 0);
  }
  
  events(new Event(Event.Count, loop, player, "minerals", minerals));
  events(new Event(Event.Count, loop, player, "vespene", vespene));
  events(new Event(Event.Count, loop, player, "foodUsed", foodUsed));
  events(new Event(Event.Count, loop, player, "foodMade", foodMade));
  events(new Event(Event.Count, loop, player, "activeWorkers", activeWorkers));
  events(new Event(Event.Count, loop, player, "totalValue", totalValue));
  events(new Event(Event.Count, loop, player, "activeForces", activeForces));
  events(new Event(Event.Count, loop, player, "valueKilled", valueKilled));
}

function readUnitBornEvent(events, replay, loop, data) {
  const owner = data["3"];
  const type = data["2"].toString("utf8");
  const unitTag = data["0"] << 18 | data["1"];
  const x = data["5"];
  const y = data["6"];
  const origin = data["9"] ? data["9"].toString("utf8") : null;

  if (type.startsWith("Beacon")) return;
  if (origin && origin.startsWith("Hallucination")) return;

  replay.units.set(unitTag, new Unit(owner, type, unitTag, loop, x, y));

  if ((owner === 1) || (owner === 2)) {
    events(new Event(Event.Enter, loop, owner, unitTag, null, null, x, y));
  }
}

function readUnitDiedEvent(events, replay, loop, data) {
  const unitTag = data["0"] << 18 | data["1"];
  const x = data["3"];
  const y = data["4"];
  const unit = replay.unit(unitTag);

  if (unit && ((unit.owner === 1) || (unit.owner === 2))) {
    if (unit.type === "Larva") return;

    unit.exit = loop,
    unit.x = x;
    unit.y = y;

    events(new Event(Event.Exit, loop, unit.owner, unitTag, null, null, x, y));
  }
}

function readUnitOwnerChangeEvent() {
}

function readUnitTypeChangeEvent(events, replay, loop, data) {
  const unitTag = data["0"] << 18 | data["1"];
  const type = data["2"].toString("utf8");
  const unit = replay.unit(unitTag);

  if (unit) {
    unit.morph(loop, type);

    events(new Event(Event.Morph, loop, unit.owner, unitTag));
  }
}

function readUpgradeCompleteEvent(events, replay, loop, data) {
  const player = data["0"];
  const upgrade = data["1"].toString("utf8");

  if (upgrade === "SprayProtoss") return;
  if (upgrade === "SprayTerran") return;
  if (upgrade === "SprayZerg") return;

  replay.upgrades.add(new Upgrade(player, upgrade, loop));

  events(new Event(Event.Enter, loop, player, upgrade));
}

function readUnitInitEvent(replay, loop, data) {
  const owner = data["3"];
  const type = data["2"].toString("utf8");
  const id = data["0"] << 18 | data["1"];
  const x = data["5"];
  const y = data["6"];

  replay.units.set(id, new Unit(owner, type, id, loop, x, y));
}

function readUnitDoneEvent(events, replay, loop, data) {
  const unitTag = data["0"] << 18 | data["1"];
  const unit = replay.unit(unitTag);
  const x = unit ? unit.x : null;
  const y = unit ? unit.y : null;

  events(new Event(Event.Enter, loop, null, unitTag, null, null, x, y));
}

function readUnitPositionsEvent() {
}

function readPlayerSetupEvent() {
  // Player setup in AI Arena is always the same
}
