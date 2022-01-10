/** @param {NS} ns **/
export async function main(ns) {
    let hosts=await getHosts(ns);
    let targets=await filter(hosts,ns.getPurchasedServers()); 
    targets=await sortByMoneyPerSecond(ns,targets);
    let scriptRam=ns.getScriptRam("/distAttacks/wag.js","home");
    hosts=await removeBadHosts(ns,hosts,scriptRam);
    await wagAlgo(ns,targets,hosts,scriptRam);
    await ns.tprint("dAttack.js complete!");
}


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

async function filter(orig,removal){
    let fin=[];
    for (let i = 0; i < orig.length; i++) {
        if (!removal.includes(orig[i])) {
            fin.push(orig[i]);
        }      
    }
    return fin;
}

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
async function wagAlgo(ns,targets,hosts,ram){
    var servUsed=0;
    var servsAttacking=0;
    var targetServ=[];
    var hostServ=[];
    for(let i=0;i<targets.length;i++){
        let tMax=(100-(ns.getServerMinSecurityLevel(targets[servsAttacking])+5))/0.004;
        targetServ.push({name:targets[i],threads:tMax});
    }
    for(let i=0;i<hosts.length;i++){
        let tMax =ns.getServerMaxRam(hosts[i])/ram;

        hostServ.push({name:hosts[i],threads:tMax});
        await ns.scp("/distAttacks/wag.js", hosts[i]);
        await ns.killall(hosts[i]);
        await ns.sleep(10);
    }
    await ns.sleep(1000);
    while(hostServ.length>servUsed&&targetServ.length>servsAttacking){
        if(targetServ[servsAttacking].threads>hostServ[servUsed].threads){
            targetServ[servsAttacking]={name:targetServ[servsAttacking].name,threads:targetServ[servsAttacking].threads-hostServ[servUsed].threads};
            let t =hostServ[servUsed].threads;
            await ns.scp("/distAttacks/wag.js", hostServ[servUsed].name);
            await ns.exec("/distAttacks/wag.js", hostServ[servUsed].name, t, targetServ[servsAttacking].name); 
            servUsed++;
        }else{
            hostServ[servUsed]={name:hostServ[servUsed].name,threads:hostServ[servUsed].threads-targetServ[servsAttacking].threads};
            let t=targetServ[servsAttacking].threads;
            await ns.scp("/distAttacks/wag.js", hostServ[servUsed].name);
            await ns.exec("/distAttacks/wag.js", hostServ[servUsed].name, t, targetServ[servsAttacking].name); 
            servsAttacking++;
        }
    }
    ns.scriptKill("/distAttacks/collectMoney.js","home");
    for(let k=0;k<servsAttacking+1;k++){
        let [totalRam, ramUsed] = ns.getServerRam("home");
        let availRam=totalRam-ramUsed;
        let balanceFactor = 240;
        let difficultyMult = (100 - (ns.getServerMinSecurityLevel(targetServ[k].name)+5)) / 100;
        let skillMult = (ns.getPlayer().hacking - (ns.getServerRequiredHackingLevel(targetServ[k].name)- 1)) / ns.getPlayer().hacking;
        let perc = (difficultyMult * skillMult * ns.getPlayer().hacking_money_mult) / balanceFactor;
        let thre=.75/perc;
        if(availRam>=thre){
            await ns.exec("/distAttacks/collectMoney.js", "home", thre, targetServ[k].name);
        }else{
            await ns.exec("/distAttacks/collectMoney.js", "home", availRam, targetServ[k].name);
            break;
        }
    }
}