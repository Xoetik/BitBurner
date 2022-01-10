/** @param {import("../.").NS} ns */

export async function main(ns) {
	var target = ns.args[0];

	await ns.scp("infil.js", "home",target);
	var ports = 0;
	if(ns.fileExists("BruteSSH.exe", "home")){
		await ns.brutessh(target);
		ports++;
	}
	if(ns.fileExists("FTPCrack.exe", "home")){
		await ns.ftpcrack(target);
		ports++;
	}
	if(ns.fileExists("relaySMTP.exe", "home")){
		await ns.relaysmtp(target);
		ports++;
	}
	if(ns.fileExists("HTTPWorm.exe", "home")){
		await ns.httpworm(target);
		ports++;
	}
	if(ns.fileExists("SQLInject.exe", "home")){
		await ns.sqlinject(target);
		ports++;
	}
	

	if(ns.getServerNumPortsRequired(target)<= ports){
		await ns.nuke(target);
	}
	
	if(ns.hasRootAccess(target)){
		var threads = Math.floor(ns.getServerMaxRam(target)/2.4);
		if(target == "home"){
			threads-=14.2;
		}
			if(threads > 0){
				await ns.exec("infil.js", target, threads);
			}
	}	
	

}
