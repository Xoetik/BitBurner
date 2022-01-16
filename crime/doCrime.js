/** @param {import(".").NS} ns */
export async function main(ns) {
	var crime = "";
    if (ns.args.length == 0) {
		crime = "mug";
	}
	else {
		crime = ns.args[0];
	}
    
    await ns.tprint("mugging some people started!");
	while(ns.getPlayer().money < 100000000){
		if(!ns.isBusy()){
			await ns.commitCrime(crime);//homicide
		}
		await ns.sleep(1000);
	}
	await ns.tprint("crime someone complete");
}