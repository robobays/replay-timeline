import { MpqFile } from "@robobays/mpq-reader";
import MapInfo from "./mapinfo.js";
import Replay from "./replay/replay.js";
import output from "./output/svg.js";
import getTimeline from "./timeline/timeline.js";

async function extract() {
  try {
    const mpq = await MpqFile.load();
    const replay = new Replay(mpq);
    const mapinfo = new MapInfo(replay.mapFileName);

    for (const warning of replay.warnings) {
      console.error(warning);
    }

    await output(process.stdout, getTimeline(replay), mapinfo);
  } catch (error) {
    console.error(error.message);
    console.log(`<svg xmlns="http://www.w3.org/2000/svg"><text x="10" y="12">${error.message}</text></svg>`);
  }
}

extract();
