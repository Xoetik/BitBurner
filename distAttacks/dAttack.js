/** @param {NS} ns **/
export async function main(ns) {
    var serverName = "";
	var target = "home";
	if (ns.args.length == 0) {
		serverName = "home";
	}
	else {
		serverName = ns.args[0];
	}
	var hostNames = ns.scan(serverName);

	for (var i = 0; i < hostNames.length; i++) {
		await ns.sleep(100);
		var adder = ns.scan(hostNames[i]);
		for (var j = 0; j < adder.length; j++) {
			if (!hostNames.includes(adder[j])) {
				hostNames.push(adder[j]);
			}
		}
	}
   
    var targetList= [];
    for(var i =0; i< hostNames.length; i++){
        var name = hostNames[i];
        var hackTime = ((2.5 * ns.getServerRequiredHackingLevel(hostNames[i]) * (50 +(ns.getServerMinSecurityLevel(hostNames[i])/2))+ 500) * 5 
                            / (ns.getHackingLevel()+50))/ ns.getPlayer().hacking_speed_mult;
        var maxMoney = ns.getServerMaxMoney(hostNames[i]);

        var hackpoints = Math.floor(hackTime / 0.5) * 100000000;
        var moneyPoints = maxMoney/ 1000000;
        var score = hackpoints - moneyPoints;
        if(ns.getServerMoneyAvailable(hostNames[i])<=0 || !ns.hasRootAccess(hostNames[i] || hostNames[i] == "home")){
            continue;
        }
        targetList.push([name, score]);
    }        

    for (i = 0; i < targetList.length-1; i++){
        for (j = 0; j < targetList.length-i-1; j++){
            if (targetList[j][1] > targetList[j+1][1]){

                var temp = targetList[j];
                targetList[j] = targetList[j+1];
                targetList[j+1] = temp;
            
            }
        }
    }

    var prio =[];

    for(i = 0; i<targetList.length; i++){
        prio.push(targetList[i][0]);
    }

    var pServNames = ns.getPurchasedServers();
    var scriptRam=ns.getScriptRam("/distAttacks/wag.js","home");
    var maxThreadsPerServ = ns.getServerMaxRam(pServNames[0])/scriptRam;
    

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
