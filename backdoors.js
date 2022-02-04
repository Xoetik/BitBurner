/** @param {import(".").NS} ns */
export async function main(ns) {

	await ns.exec("crackAll.js", "home", 1);

    let hostNames = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z", "fulcrumassets", "w0r1d_d43m0n"];//"w0r1d_d43m0n"
    let jumpList = [];

    for(let i = 0; i< hostNames.length; i++){
        if(ns.getPlayer().hacking > ns.getServerRequiredHackingLevel(hostNames[i]) && ns.hasRootAccess(hostNames[i])){
           let temp = await recLocate(ns, hostNames[i],"home","");
		   jumpList = temp.split(" ");
		   await ns.tprint("Backdooring: "+ jumpList);
		   for(let j = 0; j < jumpList.length; j++){
				await ns.connect(jumpList[j]);
				await ns.sleep(1000);
				if(hostNames[i] == jumpList[j]){
					await ns.installBackdoor();
					await ns.sleep(100);
					await ns.connect("home");
				}
        	}
        }
		await ns.sleep(1000);
    }
	await ns.tprint("Backdooring Complete!");
	await ns.sleep(10000);
	await ns.exec("factJoin.js", "home", 1);
}

/** @param {import("../.").NS} ns */

async function recLocate(ns,target,here,prev){
	await ns.sleep(10);
	if(here==target){
		return here;
	}else{
		let nextLayer = ns.scan(here);
		let fNextLayer=[];
		for(let j=0;j<nextLayer.length;j++){
			if(nextLayer[j]!=prev){
				fNextLayer.push(nextLayer[j]);
			}
		}
		let i=0;
		for(i;i<fNextLayer.length;i++){
			let ret= await recLocate(ns,target,fNextLayer[i],here);
			if(!ret==""){
				return here+" "+ret;
			}
			await ns.sleep(10);
		}
		return "";
	}
}
