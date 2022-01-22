/** @param {import(".").NS} ns */
export async function main(ns) {
   if(ns.getPlayer().hacking < 10){
       await ns.exec("/start/start-early.js", "home", 1);
   }
   else{
       await ns.exec("/start/start-mid.js", "home", 1);
   }

}