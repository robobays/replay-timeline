
const LOOPS_PER_SECOND = 22.4;
const LOOPS_PER_MINUTE = LOOPS_PER_SECOND * 60;
const STAT_KEYS = {
  minerals: "Minerals",
  vespene: "Vespene",
  foodUsed: "Food used",
  foodMade: "Food made",
  activeWorkers: "Active workers",
  totalValue: "Total value",
  activeForces: "Active forces",
  valueKilled: "Value killed",
};

export default function(timeline) {
  const out = [];

  for (const point of timeline) {
    if (point.type === "stats") {
      out.push(clock(point.start));

      for (const key in STAT_KEYS) {
        out.push(stats(point, key));
      }
    }
  }

  return out.join("\n");
}

function clock(loop) {
  const line = [];
  const minutes = Math.floor(loop / LOOPS_PER_MINUTE);
  const seconds = Math.floor(loop / LOOPS_PER_SECOND) % 60;

  if (minutes < 10) line.push("0");
  line.push(minutes);
  line.push(":");
  if (seconds < 10) line.push("0");
  line.push(seconds);
  line.push("/");
  line.push(loop);

  return line.join("");
}

function text(line, value, width) {
  const text = String(value);

  for (let i = text.length; i < width; i++) {
    line.push(" ");
  }

  line.push(text);
}

function stats(point, key) {
  const line = [];

  text(line, STAT_KEYS[key], 25);
  text(line, point.players[1].resources[key], 10);
  text(line, point.players[2].resources[key], 10);

  return line.join("");
}
