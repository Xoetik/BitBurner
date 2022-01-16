/** @param {import(".").NS} ns */
export async function main(ns) {
    while(ns.getPlayer().hacking < 10){
        await ns.universityCourse("Rothman University", "Study Computer Science");
        await ns.sleep(100000);
    }
    await ns.stopAction();

    await ns.tprint("Checking for new .exe...");
    await ns.purchaseTor() 
    await ns.purchaseProgram("BruteSSH.exe");
    await ns.purchaseProgram("FTPCrack.exe");
    await ns.purchaseProgram("relaySMTP.exe");
    await ns.purchaseProgram("HTTPWorm.exe");
    await ns.purchaseProgram("SQLInject.exe");
    await ns.exec("backdoors.js", "home", 1);
    await ns.sleep(10000);
    await ns.exec("/buyServ/perServ.js", "home", 1);
    await ns.sleep(10000);
    await ns.tprint("Checking for RAM upgrade...");
    await ns.upgradeHomeRam();
    await ns.exec("/distAttacks/dAttack.js", "home", 1);
    await ns.sleep(10000);
    var crime = "mug";
    if(ns.getCrimeChance("homicide") >= 0.75){
        crime = "homicide";
    }
    await ns.exec("crime.js", "home", 1, crime);

    await ns.tprint("Start Complete!");

}