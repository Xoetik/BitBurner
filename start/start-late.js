  /** @param {import("..").NS} ns */
  export async function main(ns) {

    await ns.exec("/buyServ/bServ.js", "home", 1, 1, "r");
    await ns.sleep(1000);
    await ns.tprint("Checking for RAM upgrade...");
    await ns.upgradeHomeRam();
    await ns.exec("/distAttacks/dAttack.js", "home", 1);
    await ns.sleep(1000);
    await ns.tprint("Late Start Complete!");
  }