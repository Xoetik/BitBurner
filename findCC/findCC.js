/** @param {NS} ns **/
export async function main(ns) {
    var hostNames = ns.scan("home");
	for(var i = 0; i<hostNames.length; i++ ){
		await ns.sleep(100);
		var adder=ns.scan(hostNames[i]);
		for(var j=0;j<adder.length;j++){
			if(!hostNames.includes(adder[j])){
				hostNames.push(adder[j]);
			}
		}
	}
    var servsWithFile=[];
    for(var j=0;j<hostNames.length;j++){
        var ccts= ns.ls(hostNames[j],".cct");
        if(ccts.length>0){
            for(var k=0;k<ccts.length;k++){
                var ty=await ns.codingcontract.getContractType(ccts[k],hostNames[j]);
                ns.alert(ty);
            }
            servsWithFile.push(hostNames[j]);
        }
    }
    ns.alert(servsWithFile);
}

