
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

export default function(out, timeline) {
  for (const point of timeline) {
    if (point.type === "stats") {
      clock(out, point.start);
      out.write(" ");
      stats(out, point);
      newline(out);
    }
  }
}

function clock(out, loop) {
  const minutes = Math.floor(loop / LOOPS_PER_MINUTE);
  const seconds = Math.floor(loop / LOOPS_PER_SECOND) % 60;

  if (minutes < 10) out.write("0");
  out.write(String(minutes));
  out.write(":");
  if (seconds < 10) out.write("0");
  out.write(String(seconds));
  out.write("/");
  out.write(String(loop));
}

function newline(out) {
  out.write("\n");
}

function text(out, value, width) {
  const text = String(value);

  for (let i = text.length; i < width; i++) {
    out.write(" ");
  }

  out.write(text);
}

function stats(out, point) {
  for (const key in STAT_KEYS) {
    newline(out);
    text(out, STAT_KEYS[key], 25);
    text(out, point.players[1].resources[key], 10);
    text(out, point.players[2].resources[key], 10);
  }
}
