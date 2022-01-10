/** @param {import("../.").NS} ns */

export async function main(ns) {
	var serverName = "";
	var target = "home";
	if (ns.args.length == 0) {
		serverName = "home";
	}
	else {
		serverName = ns.args[0];
	}
	var hostNames = ns.scan(serverName);

	for (var i = 0; i < hostNames.length; i++) {
		await ns.sleep(100);
		var adder = ns.scan(hostNames[i]);
		for (var j = 0; j < adder.length; j++) {
			if (!hostNames.includes(adder[j])) {
				hostNames.push(adder[j]);
			}
		}
	}

	var ports = 0;

	for (var i = 0; i < hostNames.length; i++) {
		if (hostNames[i] != "home") {
			await ns.killall(hostNames[i]);
			await ns.scp("attack.js", "home", hostNames[i]);
		}
		
		if (ns.fileExists("BruteSSH.exe", "home")) {
			await ns.brutessh(hostNames[i]);
			ports++;
		}
		if (ns.fileExists("FTPCrack.exe", "home")) {
			await ns.ftpcrack(hostNames[i]);
			ports++;
		}
		if (ns.fileExists("relaySMTP.exe", "home")) {
			await ns.relaysmtp(hostNames[i]);
			ports++;
		}
		if (ns.fileExists("HTTPWorm.exe", "home")) {
			await ns.httpworm(hostNames[i]);
			ports++;
		}
		if (ns.fileExists("SQLInject.exe", "home")) {
			await ns.sqlinject(hostNames[i]);
			ports++;
		}
	}

	for (var i = 0; i < hostNames.length; i++) {
		if (ns.getServerRequiredHackingLevel(hostNames[i]) < ns.getHackingLevel()) {
			if (ns.getServerMaxMoney(hostNames[i]) > ns.getServerMaxMoney(target) && ns.getServerNumPortsRequired(hostNames[i]) <= ports) {
				target = hostNames[i];
			}
		}
	}

	for (var i = 0; i < hostNames.length; i++) {
		if (ns.hasRootAccess(hostNames[i])) {
			var threads = Math.floor(ns.getServerMaxRam(hostNames[i]) / 2.3);
			if (target == "home") {
				threads -= 14.2;
			}
			if (threads > 0) {
				await ns.exec("attack.js", hostNames[i], threads, target);
			}
		}
	}

	await ns.exec("collectMoney.js", "home", (ns.getServerMaxRam("home") / 2.1 - 15), target)
}