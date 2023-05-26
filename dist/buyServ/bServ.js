/* eslint-disable no-constant-condition */
/** @param {import("../.").NS} ns */
export async function main(ns) {
    var percent = 0.85;
    var repeatFlag = false;
    var dFlag = false;
    if (ns.args.length > 0 && typeof ns.args[0] === 'number') {
        percent = ns.args[0];
    }
    if (ns.args.length > 1 && ns.args[1] == "r") {
        repeatFlag = true;
    }
    if (ns.args.length > 2 && ns.args[2] == "a") {
        dFlag = true;
    }
    let cost = [];
    let i = 0;
    while (Math.pow(2, i) <= 1048576) {
        cost.push(ns.getPurchasedServerCost(Math.pow(2, i)));
        i++;
    }
    // for(let k=0;k<cost.length;k++){ //Debug code
    //     await ns.tprint(Math.pow(2,k)+":"+cost[k]);
    // }
    await ns.tprint("Money:" + ns.getServerMoneyAvailable("home"));
    while (true) {
        var pServers = ns.getPurchasedServers();
        var ram = 0;
        for (let k = 0; k < cost.length; k++) {
            if (cost[k] <= ns.getServerMoneyAvailable("home") * percent) {
                ram = Math.pow(2, k);
            }
            else {
                break;
            }
        }
        for (let i = 0; i < pServers.length - 1; i++) {
            for (let j = 0; j < pServers.length - i - 1; j++) {
                if (ns.getServerMaxRam(pServers[j]) > ns.getServerMaxRam(pServers[j + 1])) {
                    let temp = pServers[j];
                    pServers[j] = pServers[j + 1];
                    pServers[j + 1] = temp;
                }
            }
        }
        if (ram > 1048576) {
            ram = 1048576;
            repeatFlag = true;
        }
        await ns.sleep(100);
        if (pServers.length < 25) {
            if (ns.purchaseServer("pserv", ram)) {
                await ns.tprint("New server bought with " + ram + " GB.");
            }
            else if (ns.getServerMoneyAvailable("home") < cost[0]) {
                await ns.tprint("New server failed to be bought. Ending loop.");
                break;
            }
            else {
                await ns.tprint("New server failed to be bought");
            }
        }
        else {
            for (let i = 0; i < pServers.length; i++) {
                if (ns.getServerMaxRam(pServers[i]) < ram) {
                    ns.killall(pServers[i]);
                    ns.deleteServer(pServers[i]);
                    if (ns.purchaseServer("pserv", ram)) {
                        await ns.tprint("Server updated to " + ram + " GB.");
                    }
                    else {
                        await ns.tprint("Server Failed to update.");
                    }
                    break;
                }
                if (i == 24) {
                    repeatFlag = false;
                    ns.tprint("Servers are maxed out.");
                }
            }
        }
        if (repeatFlag == false) {
            if (dFlag) {
                await ns.exec("/distAttacks/dAttack.js", "home");
            }
            await ns.sleep(100);
            break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYlNlcnYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYnV5U2Vydi9iU2Vydi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQ0FBMEM7QUFDMUMsb0NBQW9DO0FBRXBDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQUU7SUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLElBQUksVUFBVSxHQUFDLEtBQUssQ0FBQztJQUNyQixJQUFJLEtBQUssR0FBQyxLQUFLLENBQUM7SUFDaEIsSUFBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUksT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFHLFFBQVEsRUFBQztRQUN0RCxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQjtJQUNFLElBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUcsR0FBRyxFQUFDO1FBQ2xDLFVBQVUsR0FBQyxJQUFJLENBQUM7S0FDbkI7SUFDRCxJQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQztRQUNqQyxLQUFLLEdBQUMsSUFBSSxDQUFDO0tBQ2Q7SUFDRCxJQUFJLElBQUksR0FBQyxFQUFFLENBQUM7SUFDWixJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7SUFDUixPQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLE9BQU8sRUFBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUFFLENBQUM7S0FDUDtJQUNELCtDQUErQztJQUMvQyxrREFBa0Q7SUFDbEQsSUFBSTtJQUNKLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsT0FBTSxJQUFJLEVBQUM7UUFDUCxJQUFJLFFBQVEsR0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUMxQixJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEdBQUMsT0FBTyxFQUFDO2dCQUNuRCxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7aUJBQUk7Z0JBQ0QsTUFBTTthQUNUO1NBQ0o7UUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDekMsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO29CQUNwRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFFeEI7YUFDSjtTQUNKO1FBRUQsSUFBRyxHQUFHLEdBQUMsT0FBTyxFQUFDO1lBQ1gsR0FBRyxHQUFDLE9BQU8sQ0FBQztZQUNaLFVBQVUsR0FBQyxJQUFJLENBQUM7U0FDbkI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBRyxRQUFRLENBQUMsTUFBTSxHQUFDLEVBQUUsRUFBQztZQUNsQixJQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFDO2dCQUMvQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLEdBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pEO2lCQUFLLElBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDaEQsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQ2hFLE1BQU07YUFDVDtpQkFBSTtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzthQUNyRDtTQUNKO2FBQUk7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDckMsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBQztvQkFDdEMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBQzt3QkFDL0IsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLG9CQUFvQixHQUFDLEdBQUcsR0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDcEQ7eUJBQUk7d0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7cUJBQy9DO29CQUNELE1BQU07aUJBQ1Q7Z0JBQ0QsSUFBRyxDQUFDLElBQUUsRUFBRSxFQUFDO29CQUNMLFVBQVUsR0FBQyxLQUFLLENBQUM7b0JBQ2pCLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztpQkFDdkM7YUFDSjtTQUNKO1FBQ0QsSUFBRyxVQUFVLElBQUUsS0FBSyxFQUFDO1lBQ2pCLElBQUcsS0FBSyxFQUFDO2dCQUNMLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNwRDtZQUNELE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixNQUFNO1NBQ1Q7S0FDSjtBQUNMLENBQUMifQ==