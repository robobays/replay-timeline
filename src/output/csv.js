
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
  const header = ["Game time", "Game loop"];
  for (const key in STAT_KEYS) {
    header.push(STAT_KEYS[key] + " (Player 1)");
  }
  for (const key in STAT_KEYS) {
    header.push(STAT_KEYS[key] + " (Player 2)");
  }
  out.write(header.join(","));
  out.write("\n");

  for (const point of timeline) {
    if (point.type !== "stats") continue;

    const line = [clock(point.start), point.start];

    for (const key in STAT_KEYS) {
      line.push(point.players[1].resources[key]);
    }
    for (const key in STAT_KEYS) {
      line.push(point.players[2].resources[key]);
    }

    out.write(line.join(","));
    out.write("\n");
  }
}

function clock(loop) {
  const minutes = Math.floor(loop / LOOPS_PER_MINUTE);
  const seconds = Math.floor(loop / LOOPS_PER_SECOND) % 60;
  const mm = (minutes < 10) ? "0" + minutes : minutes;
  const ss = (seconds < 10) ? "0" + seconds : seconds;

  return `${mm}:${ss}`;
}
