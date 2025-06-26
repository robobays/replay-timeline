
export default class MapInfo {

  constructor(filename) {
    this.filename = filename;
  }

  async size() {
    const mapname = this.filename.replace(".SC2Map", ".json");
    const url = `https://robobays.github.io/images/map/${mapname}`;
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Failed to load map info: ${url}`);
    }
  }

}
