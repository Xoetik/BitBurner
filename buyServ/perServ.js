/** @param {NS} ns **/
export async function main(ns) {
	var curentRam = 2;
	var percent = 0.75;
	if(ns.args.length != 0){
		percent = ns.args[0];
	}
	if(ns.serverExists("pserv-0")){
		curentRam = ns.getServerMaxRam("pserv-0");
	}
		
	var x = ns.getServerMoneyAvailable("home")*0.75/ns.getPurchasedServerCost(1)/25;
    var y =Math.floor(Math.log(x)/Math.log(2));
    var ram = Math.pow(2,y);

	if(curentRam < ram){
		await ns.exec("delServ.js", "home");
		while(true){
			await ns.sleep(100);
			if(ns.scirptRunning("delServ.js", "home")){
				await ns.exec("getServ.js", "home", percent);
				break;
			}
		}
	}
	else{
		ns.alert("Insufficient Funds for new Servers!");
	}
}
