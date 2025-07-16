Translates SC2Replay file into timeline.

### Use with Docker

On Linux:
```
docker run -i robobays/relay-timeline < <path to input SC2Replay file> > <path to output SVG file>
```

On Windows:
```
cmd.exe /c "docker run -i robobays/replay-timeline < <path to input SC2Replay file> > <path to output SVG file>"
```

### Use with Node.js

Read from file and output SVG to file:
```
import ReplayTimeline from "@robobays/replay-timeline";

ReplayTimeline.from("<path to input SC2Replay file>").format("svg").to("<path to output file>");
```

If you want to wait for the translation to complete use `await`:
```
await ReplayTimeline.from("<path to input SC2Replay file>").format("svg").to("<path to output file>");
```

Supported formats are:
* csv - Produces a CSV file
* json - Produces a JSON file
* svg - Produces a SVG file
* text - Produces a TXT file

Skipping `from(...)` uses `stdin`.
Skipping `format(...)` uses `"svg"`.
Skipping `from(...)` uses `stdout`.

For example, the following code reads from `stdin` and outputs a SVG file to `stdout`:
```
ReplayTimeline.to();
```

To get the file as a string, use `"string"` in place of `path to output file`:
```
const svgText = await ReplayTimeline.from("<path to input SC2Replay file>").format("svg").to("string");
```

Get the timeline as an array:
```
import ReplayTimeline from "@robobays/replay-timeline";

const timeline = await ReplayTimeline.from("<path to input SC2Replay file>").json();
```

Use the timeline as a source:
```
import ReplayTimeline from "@robobays/replay-timeline";

const timeout = [...];

// Must provide map name as format options for SVG output
await ReplayTimeline.from(timeline).format("svg", { map: "PylonAIE.SC2Map", width: 1200 }).to("<path to output SVG file>");
```
