/** @param {import("../.").NS} ns */

export async function main(ns) {
    await ns.exec("crackAll.js", "home", 1);
	let hostNames = await getHosts(ns);
	for(let i =0; i< hostNames.length; i++){
		await ns.scp("/earlyHack/infil.js", "home", hostNames[i]);
        await ns.exec("/earlyHack/infil.js", hostNames[i],await getRam(ns, hostNames[i]));
    }

}

/** @param {import("../.").NS} ns */
async function getHosts(ns){
	let hosts = ns.scan("home");
    for (let i = 0; i < hosts.length; i++) {
		// await ns.sleep(100);
		let adder = ns.scan(hosts[i]);
		for (let j = 0; j < adder.length; j++) {
			if (!hosts.includes(adder[j])) {
				hosts.push(adder[j]);
			}
		}
	}
    return hosts;
}

/** @param {import("../.").NS} ns */
async function getRam(ns, host){
	
	let ram = (Math.floor(ns.getServerMaxRam(host) - ns.getServerUsedRam(host) )/ns.getScriptRam("/earlyHack/infil.js"));
	return ram;
}
	
	 

