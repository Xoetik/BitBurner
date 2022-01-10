/** @param {NS} ns **/
export async function main(ns) {
    var i = 0;
	var pServNames = ns.getPurchasedServers();
	while (0<pServNames.length){
		ns.killall(pServNames[i]);
		ns.deleteServer(pServNames[i]);
		await ns.sleep(100);
		i++;
	}

	await ns.tprint("Servers deleted");
}
