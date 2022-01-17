/** @param {import("../.").NS} ns */

export async function main(ns) {
	var percent = 0.85;
	if(ns.args.length != 0){
		percent = ns.args[0];
	}
    while(true){
        var pServers=ns.getPurchasedServers();
        var x = ns.getServerMoneyAvailable("home")*percent/ns.getPurchasedServerCost(2);
        var y =Math.floor(Math.log(x)/Math.log(2));
        var ram = Math.pow(2,y);
        for (let i = 0; i < pServers.length-1; i++){
            for (let j = 0; j < pServers.length-i-1; j++){
                if (ns.getServerMaxRam(pServers[j]) > ns.getServerMaxRam(pServers[j+1])){
                    let temp = pServers[j];
                    pServers[j] = pServers[j+1];
                    pServers[j+1] = temp;
                
                }
            }  
        }
        var repeatFlag=false;
        if(ram>1048576){
            ram=1048576;
            repeatFlag=true;
        }
        if(pServers.length<25){
            ns.purchaseServer("pserv", ram);
            await ns.tprint("New Server Bought! RAM: " + ram);
        }else{
            for (let i = 0; i < pServers.length; i++){
                if (ns.getServerMaxRam(pServers[i]) < ram){
                    ns.killall(pServers[i]);
                    ns.deleteServer(pServers[i]);
                    ns.purchaseServer("pserv", ram);
                    await ns.tprint("Server Updated! RAM: " + ram);
                    break;
                }
                if(i==24){
                    repeatFlag=false;
                    ns.tprint("Servers are Maxed Out!");
                }
            }
        }
        if(repeatFlag==false){
            //await ns.exec("/distAttacks/dAttack.js", "home");
            break;
        }
    }
}
