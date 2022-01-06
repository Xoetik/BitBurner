/** @param {NS} ns **/
export async function main(ns) {
   
    var pServNames = ns.getPurchasedServers();
    var scriptRam=ns.getScriptRam("/distAttacks/wag.js","home");
    var maxThreadsPerServ = ns.getServerMaxRam(pServNames[0])/scriptRam;
    var prio =["crush-fitness","iron-gym","phantasy","neo-net","johnson-ortho"];
    var servUsed=0;
    var servsAttacking=0;
    for(var i=0;i<prio.length;i++){
        await ns.sleep(100);
        var targetMaxThreads=(100-(ns.getServerMinSecurityLevel(prio[i])+5))/0.004;
        
        if(maxThreadsPerServ>targetMaxThreads){
            //TODO: Servers with vast ram
        }else{
            var numServs=Math.floor(targetMaxThreads/maxThreadsPerServ);
            for(var j=0;j<numServs;j++){
                await ns.sleep(1000);
                await ns.scp("/distAttacks/wag.js", pServNames[servUsed]);
                await ns.killall(pServNames[servUsed]);
                await ns.exec("/distAttacks/wag.js", pServNames[servUsed], maxThreadsPerServ, prio[i]);
                servUsed++;
                if(servUsed>=25){
                    break;
                }
            }
        }
        servsAttacking=i+1;
        if(servUsed>=25){
            break;
        }
    }
    for(var i=0;i<servsAttacking;i++){
        await ns.sleep(1000);
        var perc =(((100 - ns.getServerSecurityLevel(prio[i])) / 100)*((ns.getPlayer().hacking - ns.getServerRequiredHackingLevel(prio[i]) - 1) / ns.getPlayer().hacking)*(ns.getPlayer().hacking_money_mult)) / 240;
        var thre=.75/perc;
        await ns.kill("/distAttacks/collectMoney.js","home",prio[i]);
        await ns.exec("/distAttacks/collectMoney.js", "home", thre, prio[i]);
    }
	 
}