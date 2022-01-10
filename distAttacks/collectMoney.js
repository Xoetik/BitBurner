/** @param {import("../.").NS} ns */

export async function main(ns) {
    var target = ns.args[0];
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

    while(true){
        var perc =(((100 - ns.getServerSecurityLevel(target)) / 100)*((ns.getPlayer().hacking - ns.getServerRequiredHackingLevel(target) - 1) / ns.getPlayer().hacking)*(ns.getPlayer().hacking_money_mult)) / 240;
        var thre=.75/perc;
        if(ns.getServerMoneyAvailable(target) > moneyThresh){
            if(thre < ns.getRunningScript("/distAttacks/collectMoney.js","home",target).threads){
                await ns.hack(target,{threads:thre}); 
            }else{
                await ns.hack(target); 
            }      
        }else{
            await ns.sleep(1000);
        }
    }
}