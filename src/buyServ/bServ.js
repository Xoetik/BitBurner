/* eslint-disable no-constant-condition */
/** @param {import("../.").NS} ns */

export async function main(ns) {
	var percent = 0.85;
    var repeatFlag=false;
    var dFlag=false;
    if(ns.args.length>0 && typeof ns.args[0]==='number'){
		percent = ns.args[0];
	}
    if(ns.args.length>1&&ns.args[1]== "r"){
        repeatFlag=true;
    }
    if(ns.args.length>2&&ns.args[2]=="a"){
        dFlag=true;
    }
    let cost=[];
    let i=0;
    while(Math.pow(2,i)<=1048576){
        cost.push(ns.getPurchasedServerCost(Math.pow(2,i)));
        i++;
    }
    // for(let k=0;k<cost.length;k++){ //Debug code
    //     await ns.tprint(Math.pow(2,k)+":"+cost[k]);
    // }
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
        
        if(ram>1048576){
            ram=1048576;
            repeatFlag=true;
        }
        await ns.sleep(100);
        if(pServers.length<25){
            if(ns.purchaseServer("pserv", ram)){
                await ns.tprint("New server bought with "+ram+" GB.");
            }else if(ns.getServerMoneyAvailable("home")<cost[0]){
                await ns.tprint("New server failed to be bought. Ending loop.");
                break;
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
            if(dFlag){
                await ns.exec("/distAttacks/dAttack.js", "home");
            }
            await ns.sleep(100);
            break;
        }
    }
}
