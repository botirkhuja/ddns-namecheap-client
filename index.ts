import { obtainLocalIp, performUpdateForHostOfDomain } from "./utils";

const DOMAIN = process.env.DOMAIN;
const API_KEY = process.env.API_KEY;
const HOSTS = process.env.HOSTS;
const DELAY_TIME = Number(process.env.DELAY_TIME);

if (!DOMAIN) {
  throw new Error("DOMAIN env var is required");
}

if (!API_KEY) {
  throw new Error("API_KEY env var is required");
}

if (!HOSTS) {
  throw new Error("HOSTS env var is required");
}

if (Number.isNaN(DELAY_TIME)) {
  throw new Error("DELAY_TIME env var is required");
}

const hostsList = HOSTS.split(",");

const localIpAddress = await obtainLocalIp();

let isExiting = false;

process.on("SIGINT", () => {
  console.log("Ctrl-C was pressed");
  isExiting = true;
  process.exit(0);
});

for (const host of hostsList) {
  await performUpdateForHostOfDomain(host, DOMAIN, API_KEY, localIpAddress)
}

if (DELAY_TIME === 0) {
  console.log("Finished updating IPs");
  isExiting = true;
}

while (!isExiting) {
  await new Promise(resolve => setTimeout(resolve, DELAY_TIME));
  console.log("\n------ Updating IPs again ------\n");
  for (const host of hostsList) {
    await performUpdateForHostOfDomain(host, DOMAIN, API_KEY, localIpAddress)
  }
}
