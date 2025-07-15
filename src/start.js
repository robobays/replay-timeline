import ReplayTimeline from "./ReplayTimeline.js";

async function start() {
  try {
    await ReplayTimeline.format("svg").to();
  } catch (error) {
    console.log(`<svg xmlns="http://www.w3.org/2000/svg"><text x="10" y="12">${error.message}</text></svg>`);
  }
}

start();
