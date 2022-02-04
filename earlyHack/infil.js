/** @param {import("../.").NS} ns */
let target;
export async function main(ns) {
    if (ns.args.length == 0) {
		target = "foodnstuff";
	}
	else {
		target = ns.args[0];
	}

    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var secThresh = ns.getServerMinSecurityLevel(target) + 5;

    while(true){
        
        if(ns.getServerSecurityLevel(target) > secThresh){
            await ns.weaken(target);
        

        }
        else if( ns.getServerMoneyAvailable(target) < moneyThresh){
            await ns.grow(target);
        }
        else{
            await ns.hack(target);
        }
    }
}
