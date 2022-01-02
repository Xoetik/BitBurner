/** @param {NS} ns **/
export async function main(ns) {
	var x = ns.getServerMoneyAvailable("home")*0.75/ns.getPurchasedServerCost(1)/25;
    var y =Math.floor(Math.log(x)/Math.log(2));
    var ram = Math.pow(2,y);
	var i = 0;
	var pServNames = ns.getPurchasedServers();
	while (0<pServNames.length){
		ns.killall(pServNames[i]);
		ns.deleteServer(pServNames[i]);
		await ns.sleep(500);
		i++;
	}

	
	if (ns.args.length != 0){
		ram = ns.args[0];
	}
	i = 0;
	var threads = Math.floor(ram/2.4);
	while (i < ns.getPurchasedServerLimit()) {

		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
			var hostname = ns.purchaseServer("pserv-" + i, ram);
			await ns.scp("infil.js", hostname);
			await ns.exec("infil.js", hostname, threads);
			++i;
		}
	}
}
