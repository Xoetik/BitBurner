/** @param {NS} ns **/
export async function main(ns) {
   
    var pServNames = ns.getPurchasedServers();
    var scriptRam=ns.getScriptRam("/distAttacks/wag.js","home");
    var maxThreadsPerServ = ns.getServerMaxRam(pServNames[0])/scriptRam;
    var prio =["n00dles","joesguns","foodnstuff","sigma-cosmetics","hong-fang-tea","harakiri-sushi","iron-gym","nectar-net","phantasy","neo-net","crush-fitness","johnson-ortho"];
    var servUsed=0;
    var servsAttacking=0;
    for(var i=0;i<prio.length;i++){
        await ns.sleep(100);
        var targetMaxThreads=(100-(ns.getServerMinSecurityLevel(prio[i])+5))/0.004;
        
        if(maxThreadsPerServ>targetMaxThreads){
            var thisPServMax=maxThreadsPerServ;
            await ns.killall(pServNames[servUsed]);
            while(thisPServMax>targetMaxThreads*.98){
                if(i>prio.length-1){
                    break;
                }
                targetMaxThreads=(100-(ns.getServerMinSecurityLevel(prio[i])+5))/0.004;
                thisPServMax-=targetMaxThreads*.98;
                await ns.scp("/distAttacks/wag.js", pServNames[servUsed]);
                await ns.exec("/distAttacks/wag.js", pServNames[servUsed], targetMaxThreads*.98, prio[i]);
                i++;
            }
            i--;
            servUsed++;
        }else{
            var numServs=Math.floor(targetMaxThreads/maxThreadsPerServ);
            for(var j=0;j<numServs;j++){
                await ns.sleep(1000);
                await ns.scp("/distAttacks/wag.js", pServNames[servUsed]);
                await ns.killall(pServNames[servUsed]);
                await ns.exec("/distAttacks/wag.js", pServNames[servUsed], maxThreadsPerServ, prio[i]);
                servUsed++;
                if(servUsed>=pServNames.length){
                    break;
                }
            }
        }
        servsAttacking=i+1;
        if(servUsed>=pServNames.length || servsAttacking>prio.length){
            break;
        }
    }
    for(var k=0;i<servsAttacking;k++){
        if(k>prio.length-1){
            break;
        }
        await ns.sleep(1000);
        var perc =(((100 - ns.getServerSecurityLevel(prio[k])) / 100)*((ns.getPlayer().hacking - ns.getServerRequiredHackingLevel(prio[k]) - 1) / ns.getPlayer().hacking)*(ns.getPlayer().hacking_money_mult)) / 240;
        var thre=.75/perc;
        await ns.kill("/distAttacks/collectMoney.js","home",prio[k]);
        await ns.exec("/distAttacks/collectMoney.js", "home", thre, prio[k]);
    }
	 
}
