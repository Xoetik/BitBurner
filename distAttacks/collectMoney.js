/** @param {NS} ns **/
export async function main(ns) {
    var target = ns.args[0];
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

    while(true){
        if(ns.getServerMoneyAvailable(target) > moneyThresh){
            await ns.hack(target); 
            
        }else{
            await ns.sleep(1000);
        }
    }
}