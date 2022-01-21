/** @param {import("../.").NS} ns */

export async function main(ns) {
    let hosts=await getHosts(ns);
    let targets=await filter(hosts,ns.getPurchasedServers()); 
    targets=await sortByMoneyPerSecond(ns,targets);
    let scriptRam=ns.getScriptRam("/distAttacks/wag.js","home");
    hosts=await removeBadHosts(ns,hosts,scriptRam);
    hosts.push("home");
    await wagAlgo(ns,targets,hosts);
    await ns.tprint("dAttack.js complete!");
}

/** @param {import("../.").NS} ns */

async function getHosts(ns){
	let hosts = ns.scan("home");
    for (let i = 0; i < hosts.length; i++) {
		// await ns.sleep(100);
		let adder = ns.scan(hosts[i]);
		for (let j = 0; j < adder.length; j++) {
			if (!hosts.includes(adder[j])) {
				hosts.push(adder[j]);
			}
		}
	}
    hosts=filter(hosts,["home"]);
    return hosts;
}
/** @param {import("../.").NS} ns */

async function filter(orig,removal){
    let fin=[];
    for (let i = 0; i < orig.length; i++) {
        if (!removal.includes(orig[i])) {
            fin.push(orig[i]);
        }      
    }
    return fin;
}
/** @param {import("../.").NS} ns */

async function sortByMoneyPerSecond(ns,targets){
    let targetList=[];

    for(let i =0; i< targets.length; i++){
        let sName = targets[i];
        let hackTime = ((2.5 * ns.getServerRequiredHackingLevel(sName) * (50 +(ns.getServerMinSecurityLevel(sName)/2))+ 500) * 5 
                            / (ns.getHackingLevel()+50))/ ns.getPlayer().hacking_speed_mult;
        let maxMoney = ns.getServerMaxMoney(sName);
        if(hackTime>300){
            maxMoney=maxMoney/1000;
        }else if(hackTime>60){
            maxMoney=maxMoney/10;
        } 
        if(ns.getServerMoneyAvailable(sName)>0 && ns.hasRootAccess(sName) && ns.getServerRequiredHackingLevel(sName) <= ns.getHackingLevel()){
            targetList.push({name:sName, money:(maxMoney*0.004/hackTime)});
        }
    }
    
    for (let i = 0; i < targetList.length-1; i++){
        for (let j = 0; j < targetList.length-i-1; j++){
            if (targetList[j].money < targetList[j+1].money){
                let temp = targetList[j];
                targetList[j] = targetList[j+1];
                targetList[j+1] = temp;
            
            }
        }
  
    }
    let fin =[];
    for(let i = 0; i<targetList.length; i++){
       fin.push(targetList[i].name);
    }
    return fin;
}
/** @param {import("../.").NS} ns */

async function removeBadHosts(ns,hosts,ram){
    let fin=[];
    for (let i = 0; i < hosts.length; i++) {
        if(!ns.hasRootAccess(hosts[i])){
            await open(ns,hosts[i]);
        }
        if (ns.getServerMaxRam(hosts[i])>ram&&ns.hasRootAccess(hosts[i])) {
            fin.push(hosts[i]);
        }      
    }
    return fin;
}
/** @param {import("../.").NS} ns */

async function open(ns,target){
    let ports = 0;
	if(ns.fileExists("BruteSSH.exe", "home")){
		await ns.brutessh(target);
		ports++;
	}
	if(ns.fileExists("FTPCrack.exe", "home")){
		await ns.ftpcrack(target);
		ports++;
	}
	if(ns.fileExists("relaySMTP.exe", "home")){
		await ns.relaysmtp(target);
		ports++;
	}
	if(ns.fileExists("HTTPWorm.exe", "home")){
		await ns.httpworm(target);
		ports++;
	}
	if(ns.fileExists("SQLInject.exe", "home")){
		await ns.sqlinject(target);
		ports++;
	}
	if(ns.getServerNumPortsRequired(target)<= ports){
		await ns.nuke(target);
	}
}
/** @param {import("../.").NS} ns */

async function wagAlgo(ns,targets,hosts){
    var servUsed=0;
    var servsAttacking=0;
    var targetServ=[];
    var hostServ=[];
    for(let i=0;i<targets.length;i++){
        let rMax=(100-(ns.getServerMinSecurityLevel(targets[servsAttacking])+5))/0.004;
        rMax*=ns.getScriptRam("/distAttacks/wag.js","home");
        rMax=Math.floor(rMax);
        targetServ.push({name:targets[i],ram:rMax});
    }
    for(let i=0;i<hosts.length;i++){
        await ns.scp("/distAttacks/wag.js", hosts[i]);
        await ns.scp("/distAttacks/collectMoney.js", hosts[i]);
        await ns.scriptKill("/distAttacks/wag.js", hosts[i]);
        await ns.scriptKill("/distAttacks/collectMoney.js", hosts[i]);
        let rMax =(ns.getServerMaxRam(hosts[i])-ns.getServerUsedRam(hosts[i]));
        rMax=Math.floor(rMax);
        if(hosts[i]=="home"){
            rMax-=ns.getScriptRam("/distAttacks/dAttack.js","home")-ns.getScriptRam("/buyServ/bServ.js","home");
        }
        hostServ.push({name:hosts[i],ram:rMax});
        await ns.sleep(10);
    }
    await ns.sleep(100);

    let balanceFactor = 240;
    let difficultyMult = (100 - (ns.getServerMinSecurityLevel(targetServ[0].name)+5)) / 100;
    let skillMult = (ns.getPlayer().hacking - (ns.getServerRequiredHackingLevel(targetServ[0].name)- 1)) / ns.getPlayer().hacking;
    let perc = (difficultyMult * skillMult * ns.getPlayer().hacking_money_mult) / balanceFactor;
    let collectMoney=.75/perc;
    let t =0;
    while(hostServ.length>servUsed&&targetServ.length>servsAttacking){
        if (collectMoney>0){
            await ns.tprint("CM Host: "+hostServ[servUsed].name+" Target: "+targetServ[servsAttacking].name);
            if(collectMoney>hostServ[servUsed].ram/ns.getScriptRam("/distAttacks/collectMoney.js","home")){
                t=hostServ[servUsed].ram/ns.getScriptRam("/distAttacks/collectMoney.js","home");
            }else{
                t=collectMoney;
            }
            collectMoney-=t;
            hostServ[servUsed]={name:hostServ[servUsed].name,ram:hostServ[servUsed].ram-(ns.getScriptRam("/distAttacks/collectMoney.js","home")*t)}
            await ns.scp("/distAttacks/collectMoney.js", hostServ[servUsed].name);
            await ns.exec("/distAttacks/collectMoney.js", hostServ[servUsed].name, t, targetServ[servsAttacking].name);
            if(collectMoney>0){
                servUsed++;
            }else{
                
            }
        }else{
            await ns.tprint("WAG Host: "+hostServ[servUsed].name+" Target: "+targetServ[servsAttacking].name);
            if(targetServ[servsAttacking].ram>hostServ[servUsed].ram){
                targetServ[servsAttacking]={name:targetServ[servsAttacking].name,ram:targetServ[servsAttacking].ram-hostServ[servUsed].ram};
                let t =hostServ[servUsed].ram/ns.getScriptRam("/distAttacks/wag.js","home");
                await ns.scp("/distAttacks/wag.js", hostServ[servUsed].name);
                await ns.exec("/distAttacks/wag.js", hostServ[servUsed].name, t, targetServ[servsAttacking].name); 
                servUsed++;
            }else{
                hostServ[servUsed]={name:hostServ[servUsed].name,ram:hostServ[servUsed].ram-targetServ[servsAttacking].ram};
                let t=targetServ[servsAttacking].ram/ns.getScriptRam("/distAttacks/wag.js","home");
                await ns.scp("/distAttacks/wag.js", hostServ[servUsed].name);
                await ns.exec("/distAttacks/wag.js", hostServ[servUsed].name, t, targetServ[servsAttacking].name);
                servsAttacking++; 
                let balanceFactor = 240;
                let difficultyMult = (100 - (ns.getServerMinSecurityLevel(targetServ[servsAttacking].name)+5)) / 100;
                let skillMult = (ns.getPlayer().hacking - (ns.getServerRequiredHackingLevel(targetServ[servsAttacking].name)- 1)) / ns.getPlayer().hacking;
                let perc = (difficultyMult * skillMult * ns.getPlayer().hacking_money_mult) / balanceFactor;
                collectMoney=.75/perc;
            }
        }
    }
    // ns.scriptKill("/distAttacks/collectMoney.js","home");
    // for(let k=0;k<servsAttacking+1;k++){
    //     let availRam=ns.getServerMaxRam("home")-ns.getServerUsedRam("home");
    //     let balanceFactor = 240;
    //     let difficultyMult = (100 - (ns.getServerMinSecurityLevel(targetServ[k].name)+5)) / 100;
    //     let skillMult = (ns.getPlayer().hacking - (ns.getServerRequiredHackingLevel(targetServ[k].name)- 1)) / ns.getPlayer().hacking;
    //     let perc = (difficultyMult * skillMult * ns.getPlayer().hacking_money_mult) / balanceFactor;
    //     let thre=.75/perc;
    //     if(availRam/ns.getScriptRam("/distAttacks/collectMoney.js")>=thre){
    //         await ns.exec("/distAttacks/collectMoney.js", "home", thre, targetServ[k].name);
    //     }else{
    //         await ns.exec("/distAttacks/collectMoney.js", "home", availRam/ns.getScriptRam("/distAttacks/collectMoney.js"), targetServ[k].name);
    //         break;
    //     }
    // }
}