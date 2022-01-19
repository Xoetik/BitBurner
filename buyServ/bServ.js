/** @param {import("../.").NS} ns */

export async function main(ns) {
	var percent = 0.85;
	if(ns.args.length != 0){
		percent = ns.args[0];
	}
    let cost=[];
    let i=0;
    while(Math.pow(2,i)<=1048576){
        cost.push(ns.getPurchasedServerCost(Math.pow(2,i)));
        i++;
    }
    for(let k=0;k<cost.length;k++){
        await ns.tprint(Math.pow(2,k)+":"+cost[k]);
    }
    await ns.tprint("Money:"+ns.getServerMoneyAvailable("home"));
    while(true){
        var pServers=ns.getPurchasedServers();
        var ram = 0;
        for(let k=0;k<cost.length;k++){
            if(cost[k]<=ns.getServerMoneyAvailable("home")*percent){
                ram=Math.pow(2,k);
            }else{
                break;
            }
        }
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
            if(ns.purchaseServer("pserv", ram)){
                await ns.tprint("New server bought with "+ram+" GB.");
            }else{
                await ns.tprint("New server failed to be bought");
            }
        }else{
            for (let i = 0; i < pServers.length; i++){
                if (ns.getServerMaxRam(pServers[i]) < ram){
                    ns.killall(pServers[i]);
                    ns.deleteServer(pServers[i]);
                    if(ns.purchaseServer("pserv", ram)){
                        await ns.tprint("Server updated to "+ram+" GB.");
                    }else{
                        await ns.tprint("Server Failed to update.");
                    }
                    break;
                }
                if(i==24){
                    repeatFlag=false;
                    ns.tprint("Servers are maxed out.");
                }
            }
        }
        if(repeatFlag==false){
            await ns.exec("/distAttacks/dAttack.js", "home");
            break;
        }
    }
}
