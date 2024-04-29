import { resolve4 } from "node:dns/promises";

export const obtainLocalIp = async () => {
  const response = await fetch('http://checkip.amazonaws.com');
  if (!response.ok) {
    throw new Error("Failed to obtain local IP");
  }
  const localIpAddress = await response.text();
  return localIpAddress.trim();
}

export const updateIp = async (host: string, domain: string, apiKey: string, ip: string) => {
  try {
    console.log(`Updating IP for ${host}.${domain} to ${ip}`);
    await fetch(`https://dynamicdns.park-your-domain.com/update?host=${host}&domain=${domain}&password=${apiKey}&ip=${ip}`);
    console.log(`Successfully updated IP. \n`);
  } catch (error) {
    console.error(`Failed to update IP for ${host}.${domain}: ${error}\n`);
  }
}

export const getIpForHost = async (host: string, domain: string) => {
  try {
    const records = await resolve4(`${host}.${domain}`);
    return records[0];
  } catch (error) {
    console.error(`Failed to get IP for ${host}.${domain}: ${error}\n`);
    return null;
  }
}

export const performUpdateForHostOfDomain = async (
  host: string,
  domain: string,
  apiKey: string,
  localIpAddress: string 
) => {
  const ipForHost = await getIpForHost(host, domain);

  if (!ipForHost) {
    console.error(`Failed to get IP for ${host}.${domain}`);
    return;
  }

  console.log(`Current IP for ${host} is ${ipForHost}`);

  if (ipForHost === localIpAddress) {
    console.log(`It is already up to date\n`);
    return;
  }

  updateIp(host, domain, apiKey, localIpAddress);
}