/** @param {import("../.").NS} ns */

export async function main(ns) {
	var target = ns.args[0];
	var moneyThresh = ns.getServerMaxMoney(target) * 0.80;
    var secThresh = ns.getServerMinSecurityLevel(target) + 5;

    while(true){
        
        if(ns.getServerSecurityLevel(target) > secThresh){
            await ns.weaken(target);
        }
        else if( ns.getServerMoneyAvailable(target) < moneyThresh){
            await ns.grow(target);
        }
        else{
            await ns.sleep(1000);
        }
    }

}