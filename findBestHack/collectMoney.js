/** @param {NS} ns **/
export async function main(ns) {
    var target = ns.args[0];

    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var secThresh = ns.getServerMinSecurityLevel(target) + 5;
    
    while(true){
        if(ns.getServerSecurityLevel(target) > secThresh || ns.getServerMoneyAvailable(target) < moneyThresh){
            await ns.sleep(10000);
        }
        else{
            await ns.hack(target); 
        }
    }
}