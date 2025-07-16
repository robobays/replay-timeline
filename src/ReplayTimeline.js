import csv from "./output/csv.js";
import json from "./output/json.js";
import svg from "./output/svg.js";
import text from "./output/text.js";
import Replay from "./replay/replay.js";
import getTimeline from "./timeline/timeline.js";

const FORMATTER = { csv, json, svg, text };

export default class ReplayTimeline {

  async json() {
    return getTimeline(await readReplay(this.source, this.logger));
  }

  log(logger) {
    this.logger = logger;

    return this;
  }

  format(type, options) {
    this.type = type;
    this.options = options;

    return this;
  }

  from(source) {
    this.source = source;

    return this;
  }

  async to(target) {
    this.target = target;

    return await execute(this);
  }

  static log(logger) {
    return new ReplayTimeline().log(logger);
  }

  static format(type, options) {
    return new ReplayTimeline().format(type, options);
  }

  static from(source) {
    return new ReplayTimeline().from(source);
  }

  static async to(target) {
    return await new ReplayTimeline().to(target);
  }

}

async function readReplay(source, logger) {
  if (source === process.stdin) source = null;
  logger = logger || console.error;

  try {
    // Use dynamic import to allow use in Web browsers
    // The module name is as a constant to avoid issues with bundlers
    const MODULE_MPQ_READER = "@robobays/mpq-reader";
    const { MpqFile } = await import(MODULE_MPQ_READER);

    const mpq = await MpqFile.load(source);
    const replay = new Replay(mpq);

    for (const warning of replay.warnings) {
      logger.error(warning);
    }

    return replay;
  } catch (error) {
    logger(error);
    throw new Error(error.message);
  }
}

async function readTimeline(source, logger) {
  if (Array.isArray(source)) {
    return { timeline: source };
  } else {
    const replay = await readReplay(source, logger);

    return { map: replay.mapFileName, timeline: getTimeline(replay) };
  }
}

async function execute({ source, type, options, logger, target }) {
  logger = logger || console.error;

  try {
    const { timeline, map } = await readTimeline(source, logger);
    const formatter = FORMATTER[type] || FORMATTER.svg;

    options = options || {};
    if (map) options.map = map;

    const output = await formatter(timeline, options);

    if (!target || (target === process.stdout)) {
      process.stdout.write(output);
    } else if (typeof(target) === "string") {
      // Use dynamic import to allow use in Web browsers
      // The module name is as a constant to avoid issues with bundlers
      const MODULE_FS = "fs";
      const fs = await import(MODULE_FS);

      fs.writeFileSync(target, output, "utf8");
    } else if (typeof(target) === "function") {
      await target(output);
    }
  } catch (error) {
    logger(error);
    throw new Error(error.message);
  }
}
