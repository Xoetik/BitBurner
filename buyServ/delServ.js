/** @param {NS} ns **/
export async function main(ns) {
	var pServNames = ns.getPurchasedServers();
	while (pServNames.length>0){
		var servDeleting=pServNames.pop();
		ns.killall(servDeleting);
		ns.deleteServer(servDeleting);
		await ns.sleep(100);
	}
	await ns.tprint("Servers deleted");
}
