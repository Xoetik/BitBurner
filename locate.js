/** @param {import(".").NS} ns */

export async function main(ns) {
	var p=await recLocate(ns,ns.args[0],"home","");
	ns.tprint("Final: "+p);
}

/** @param {NS} ns **/
async function recLocate(ns,target,here,prev){
	await ns.sleep(10);
	if(here==target){
		ns.tprint("Found "+here);
		return here;
	}else{
		var nextLayer = ns.scan(here);
		var fNextLayer=[];
		for(var j=0;j<nextLayer.length;j++){
			if(nextLayer[j]!=prev){
				fNextLayer.push(nextLayer[j]);
			}
		}
		var i=0;
		for(i;i<fNextLayer.length;i++){
			var ret= await recLocate(ns,target,fNextLayer[i],here);
			if(!ret==""){
				return here+" "+ret;
			}
			await ns.sleep(10);
		}
		return "";
	}
}
