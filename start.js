/** @param {import(".").NS} ns */
export async function main(ns) {
    let fact = ns.getPlayer().factions;
    if(ns.getPlayer().hacking < 10){
       await ns.exec("/start/start-early.js", "home", 1);
    }
    else if(!fact.includes("BitRunners")){
        await ns.exec("/start/start-mid.js", "home", 1);
    }
   else{
    await ns.exec("/start/start-late.js", "home", 1);
    }

}