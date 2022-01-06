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
            if(ns.getHackingLevel() > 1000){
                if(ns.getServerSecurityLevel(target) == 100 || ns.getServerMoneyAvailable(target) == 0){
                    await ns.exec("../Find_Best_Server_to_Hack/search.js", "home", 1);
                }
            }
        }
    }
}