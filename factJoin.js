/** @param {import(".").NS} ns */
export async function main(ns) {
    
   
    let factList = ns.checkFactionInvitations();
    for(let i =0; i< factList; i++){
        await ns.joinFaction(factList[i]);
    }
    await ns.tprint("Factions Joined!");
}

