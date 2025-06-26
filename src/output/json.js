
export default function(out, timeline) {
  out.write("[");

  let prefix = "\n  ";
  for (const point of timeline) {
    out.write(prefix);
    out.write(JSON.stringify(point));
    prefix = ",\n  ";
  }

  out.write("\n]\n");
}
