
export default function(replay, decoder) {
  replay.mapFileName = decoder.read()[9].toString("utf8");
}
