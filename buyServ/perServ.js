/** @param {NS} ns **/
export async function main(ns) {
	var curentRam = 2;
	if(ns.serverExists("pserv-0")){
		curentRam = ns.getServerMaxRam("pserv-0");
	}
	// ns.alert("Current Ram: "+curentRam);
	
	
	var x = ns.getServerMoneyAvailable("home")*0.75/ns.getPurchasedServerCost(1)/25;
    var y =Math.floor(Math.log(x)/Math.log(2));
    var ram = Math.pow(2,y);
	// ns.alert("Upgrade Ram: "+ram);

	if(curentRam < ram){
		await ns.exec("delServ.js", "home");
		while(true){
			await ns.sleep(100);
			var pServNames = ns.getPurchasedServers();
			if(pServNames.length==0){
				await ns.exec("getServ.js", "home");
				break;
			}
		}
	}
	else{
		ns.alert("Insufficient Funds for new Servers!");
	}
}
