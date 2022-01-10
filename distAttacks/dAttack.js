/** @param {NS} ns **/
export async function main(ns) {
    var scriptRam=ns.getScriptRam("/distAttacks/wag.js","home");
    var servUsed=0;
    var servsAttacking=0;
    var hosts=ns.getPurchasedServers();
    var targets=["n00dles","joesguns","foodnstuff","sigma-cosmetics","hong-fang-tea","harakiri-sushi","iron-gym","nectar-net","phantasy","neo-net","crush-fitness","johnson-ortho"];
    var targetServ=[];
    var hostServ=[];
    for(let i=0;i<targets.length;i++){
        let tMax=(100-(ns.getServerMinSecurityLevel(targets[servsAttacking])+5))/0.004;
        targetServ.push({name:targets[i],threads:tMax});
    }
    for(let i=0;i<hosts.length;i++){
        let tMax =ns.getServerMaxRam(hosts[servsAttacking])/scriptRam;
        hostServ.push({name:hosts[i],threads:tMax});
        await ns.scp("/distAttacks/wag.js", hosts[i]);
        await ns.killall(hosts[i]);
    }

    while(hostServ.length>servUsed&&targetServ.length>servsAttacking){
        if(targetServ[servsAttacking].threads>hostServ[servUsed].threads){
            await(ns.tprint(servsAttacking));
            targetServ[servsAttacking]={name:targetServ[servsAttacking].name,threads:targetServ[servsAttacking].threads-hostServ[servUsed].threads};
            let t =hostServ[servUsed].threads;
            await ns.scp("/distAttacks/wag.js", hosts[servUsed]);
            await ns.exec("/distAttacks/wag.js", hostServ[servUsed].name, t, targetServ[servsAttacking].name); 
            servUsed++;
        }else{
            await(ns.tprint(servsAttacking));
            hostServ[servUsed]={name:hostServ[servUsed].name,threads:hostServ[servUsed].threads-targetServ[servsAttacking].threads};
            let t=targetServ[servsAttacking].threads;
            await ns.scp("/distAttacks/wag.js", hosts[servUsed]);
            await ns.exec("/distAttacks/wag.js", hostServ[servUsed].name, t, targetServ[servsAttacking].name); 
            servsAttacking++;
        }
    }

    await(ns.tprint(servsAttacking));
    for(var k=0;k<servsAttacking+1;k++){
        await ns.sleep(100);
        let balanceFactor = 240;
        let difficultyMult = (100 - (ns.getServerMinSecurityLevel(targetServ[k].name)+5)) / 100;
        let skillMult = (ns.getPlayer().hacking - (ns.getServerRequiredHackingLevel(targetServ[k].name)- 1)) / ns.getPlayer().hacking;
        let perc = (difficultyMult * skillMult * ns.getPlayer().hacking_money_mult) / balanceFactor;
        var thre=.75/perc;
        await ns.kill("/distAttacks/collectMoney.js","home",targetServ[k].name);
        await ns.exec("/distAttacks/collectMoney.js", "home", thre, targetServ[k].name);
    }
	 
}