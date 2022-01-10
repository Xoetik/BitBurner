/** @param {import("../.").NS} ns */

export async function main(ns) {
    var percent = 0.75;
	if(ns.args.length != 0){
		percent = ns.args[0];
	}
	var i = 0;
	var x = ns.getServerMoneyAvailable("home")*percent/ns.getPurchasedServerCost(1)/25;
    var y =Math.floor(Math.log(x)/Math.log(2));
    var ram = Math.pow(2,y);
	
	i = 0;
	var threads = Math.floor(ram/2.4);
	while (i < ns.getPurchasedServerLimit()) {

		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
			var hostname = ns.purchaseServer("pserv-" + i, ram);
			++i;
			await ns.sleep(10);
		}
	}
	await ns.tprint("Server bought");
	await ns.exec("/distAttacks/dAttack.js", "home");
}
