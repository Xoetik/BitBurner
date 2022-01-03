/** @param {NS} ns **/
export async function main(ns) {
	var curentRam = 2;
	if(ns.serverExists("pserv-0")){
		curentRam = ns.getServerMaxRam("pserv-0")
	}
	
	
	var x = ns.getServerMoneyAvailable("home")*0.75/ns.getPurchasedServerCost(1)/25;
    var y =Math.floor(Math.log(x)/Math.log(2));
    var ram = Math.pow(2,y);

	if(curentRam < ram){
		await ns.exec("delSer.js", "home",1);
		await ns.sleep(1000);
		await ns.exec("getSer.js", "home",1);
	}
	else{
		ns.alert("Insufficient Funds for new Servers!");
	}
	
	
}
