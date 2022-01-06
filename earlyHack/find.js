/** @param {NS} ns **/
export async function main(ns) {
    var serverName= "";
	if(ns.args.length == 0){
		serverName = "home";
	}
	else{
		serverName = ns.args[0];
	}
	var hostNames = ns.scan(serverName);

	for(var i = 0; i<hostNames.length; i++ ){
		await ns.sleep(100);
		var adder=ns.scan(hostNames[i]);
		for(var j=0;j<adder.length;j++){
			if(!hostNames.includes(adder[j])){
				hostNames.push(adder[j]);
			}
		}
		ns.alert("Post: "+hostNames);

		// ns.alert("Host: "+hostNames[i]+ "Array: "+hostNames);
	}

	for(var i = 0; i<hostNames.length; i++ ){
		while(true){	
			var fram = await ns.getServerMaxRam("home") - ns.getServerUsedRam("home");
			if (fram > 4 ){
			await ns.exec("crack.js", "home",1,hostNames[i]);
			break;
			}
			else{
				await ns.sleep(100)
			}
		}
	}	
	 
}
