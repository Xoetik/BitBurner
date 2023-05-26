/* eslint-disable no-redeclare */
/* eslint-disable no-constant-condition */
/** @param {import("../.").NS} ns */
export async function main(ns) {
    var serverName = "";
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
            if (!hostNames.includes(adder[j])) {
                hostNames.push(adder[j]);
            }
        }
        ns.alert("Post: " + hostNames);
        // ns.alert("Host: "+hostNames[i]+ "Array: "+hostNames);
    }
    for (var i = 0; i < hostNames.length; i++) {
        while (true) {
            var fram = await ns.getServerMaxRam("home") - ns.getServerUsedRam("home");
            if (fram > 4) {
                await ns.exec("crack.js", "home", 1, hostNames[i]);
                break;
            }
            else {
                await ns.sleep(100);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lYXJseUhhY2svZmluZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQ0FBaUM7QUFDakMsMENBQTBDO0FBQzFDLG9DQUFvQztBQUVwQyxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFFO0lBQ3pCLElBQUksVUFBVSxHQUFFLEVBQUUsQ0FBQztJQUN0QixJQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztRQUN0QixVQUFVLEdBQUcsTUFBTSxDQUFDO0tBQ3BCO1NBQ0c7UUFDSCxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QjtJQUNELElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFcEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksS0FBSyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDOUIsSUFBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQ2hDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekI7U0FDRDtRQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdCLHdEQUF3RDtLQUN4RDtJQUVELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE9BQU0sSUFBSSxFQUFDO1lBQ1YsSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxNQUFNO2FBQ0w7aUJBQ0c7Z0JBQ0gsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ25CO1NBQ0Q7S0FDRDtBQUNGLENBQUMifQ==