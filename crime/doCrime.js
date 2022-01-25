/** @param {import(".").NS} ns */
export async function main(ns) {
	await ns.tprint("Starting Crime!");
	await ns.sleep(1000);
	var crime = "";
	var money = 0;
    if (ns.args.length == 0) {
		crime = "mug";
		money = 1000000;
	}
	else {
		crime = ns.args[0];
		money = ns.args[1];
	}
    
    await ns.tprint(crime + " started!");
	while(ns.getPlayer().money < money){
		if(!ns.isBusy()){
			await ns.commitCrime(crime);
		}
		await ns.sleep(1000);
	}
	await ns.tprint("Crimes Complete!");
	await ns.exec("start.js", "home", 1);
}