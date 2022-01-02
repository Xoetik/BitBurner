/** @param {NS} ns **/
export async function main(ns) {
	var p=await recLocate(ns,ns.args[0],"home","");
	ns.alert("Final: "+p);
	// var pArr= p.split(" ");
	// ns.alert(pArr);
	// for(var k=1;k<pArr.length;k++){
	// 	ns.alert("Connect to: "+pArr[k]);
	// 	await ns.connect(pArr[k]);
	// }
}

/** @param {NS} ns **/
async function recLocate(ns,target,here,prev){
	await ns.sleep(10);
	// ns.alert("Here: "+here+" Target: "+target);
	if(here==target){
		ns.alert("Found "+here);
		return here;
	}else{
		var nextLayer = ns.scan(here);
		// ns.alert(nextLayer);
		var fNextLayer=[];
		for(var j=0;j<nextLayer.length;j++){
			if(nextLayer[j]!=prev){
				fNextLayer.push(nextLayer[j]);
			}
		}
		// ns.alert(fNextLayer);
		var i=0;
		for(i;i<fNextLayer.length;i++){
			// ns.alert("i= "+i+" "+fNextLayer[i]+"Preve: "+here);
			var ret= await recLocate(ns,target,fNextLayer[i],here);
			if(!ret==""){
				// ns.alert("Path: "+here+" "+ret);
				return here+" "+ret;
			}
			await ns.sleep(10);
		}
		// ns.alert("Dead End");
		return "";
	}
}
