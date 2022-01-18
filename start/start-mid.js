    /** @param {import("..").NS} ns */
export async function main(ns) {
    await ns.tprint("Checking for new .exe...");
    await ns.purchaseTor(); 
    await ns.purchaseProgram("BruteSSH.exe");
    await ns.purchaseProgram("FTPCrack.exe");
    await ns.purchaseProgram("relaySMTP.exe");
    await ns.purchaseProgram("HTTPWorm.exe");
    await ns.purchaseProgram("SQLInject.exe");
    await ns.exec("backdoors.js", "home", 1);
    await ns.sleep(10000);
    await ns.exec("/buyServ/bServ.js", "home", 1);
    await ns.sleep(10000);
    await ns.tprint("Checking for RAM upgrade...");
    await ns.upgradeHomeRam();
    
    var crime = "mug";
    if(ns.getCrimeChance("homicide") >= 0.75){
        crime = "homicide";
    }
    await ns.exec("/crime/doCrime.js", "home", 1, crime);
    await ns.exec("/distAttacks/dAttack.js", "home", 1);
    await ns.sleep(10000);

    await ns.tprint("Start Complete!");

}