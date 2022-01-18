/** @param {import(".").NS} ns */
export async function main(ns) {
    
   
    let factList = ns.checkFactionInvitations();
    await ns.tprint(factList);
    for(let i =0; i< factList.length; i++){
        await ns.tprint(factList[i] + " " + ns.joinFaction(factList[i]));
    }
    await ns.tprint("Factions Joined!");
}

