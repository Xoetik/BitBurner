/** @param {NS} ns **/
export async function main(ns) {
	var serverName = "";
	var target = "n00dles";
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
			if (!hostNames.includes(adder[j])){
				hostNames.push(adder[j]);
			}
		}
	}

	var ports = 0;

	for (var i = 0; i < hostNames.length; i++) {
        if(hostNames != "home"){
		    await ns.exec("../EarlyHack/crack.js", "home", 1,target);
        }
	}
	
	if(ns.scriptRunning("collectMoney.js", "home")){
		await ns.scriptKill("collectMoney.js", "home");
	}

    var perc =(((100 - ns.getServerSecurityLevel(target)) / 100)*((ns.getPlayer().hacking - ns.getServerRequiredHackingLevel(target) - 1) / ns.getPlayer().hacking)*(ns.getPlayer().hacking_money_mult)) / 240;
    var thread = .75/perc;

	await ns.exec("../Find_Best_Server_to_Hack/collectMoney.js", "home", thread, target)
	ns.alert("Setup Done!");
}