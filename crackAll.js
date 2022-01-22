/** @param {import(".").NS} ns */

export async function main(ns) {
    let hostNames = getHosts;
    for(let i =0; i< hostNames.length; i++){
        crack(hostNames[i]);
    }
    await ns.tprint("Crack All Complete!")
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
    hosts=filter(hosts,["home"]);
    return hosts;
}

/** @param {import("../.").NS} ns */
async function filter(orig,removal){
    let fin=[];
    for (let i = 0; i < orig.length; i++) {
        if (!removal.includes(orig[i])) {
            fin.push(orig[i]);
        }      
    }
    return fin;
}

/** @param {import("../.").NS} ns */
async function crack(ns,target){
    if(ns.fileExists("BruteSSH.exe", "home")){
        await ns.brutessh(target);
    }
    if(ns.fileExists("FTPCrack.exe", "home")){
        await ns.ftpcrack(target);
    }
    if(ns.fileExists("relaySMTP.exe", "home")){
        await ns.relaysmtp(target);
    }
    if(ns.fileExists("HTTPWorm.exe", "home")){
        await ns.httpworm(target);
    }
    if(ns.fileExists("SQLInject.exe", "home")){
        await ns.sqlinject(target);
    }
}