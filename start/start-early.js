/** @param {import("..").NS} ns */
export async function main(ns) {

    while(true){
        if(ns.getPlayer().hacking < 10){
            await ns.universityCourse("Rothman University", "Study Computer Science");
            await ns.sleep(10000);
        }
        else{
            await ns.stopAction();
            break;
        }
    }
    await ns.exec("/distAttacks/dAttack.js", "home", 1);
    await ns.exec("/distAttacks/dAttack.js", "home", 1);
    await ns.exec("/crime/doCrime.js", "home", 1, "mug", 10000000);

    await ns.tprint("Early Start Done!");

}