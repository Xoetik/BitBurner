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
                var data=await ns.codingcontract.getData(ccts[k],hostNames[j]);
                // await ns.write("ccts.txt",hostNames[j]+": "+ty+":\n"+data+"\n","a")
                ns.alert(data);

            }
            servsWithFile.push(hostNames[j]);
        }
    }
    ns.alert(servsWithFile);
}





function largestPrimeFactor(){

}
function totalWaysSum(){

}
function spiralMatrix(ns,data){
    var soulution =[];
    var ptrs = [0,0,0,0];
    while(ptrs[0]+ptrs[2]<data[0].length&&ptrs[0]+ptrs[2]<data[-1].length&&ptrs[1]+ptrs[3]<data.length){
        var ret;
        ret=sMRight(data,ptrs);
        ptrs=ret[1];
        ret=sMDown(data,ptrs);
        ptrs=ret[1];
        ret=sMLeft(data,ptrs);
        ptrs=ret[1];
        ret=sMUp(data,ptrs);
        ptrs=ret[1];
    }
}

function sMRight(data,ptrs){
    var sol=[];
    for(var i=ptrs[3];i<data[ptrs[0]].length-ptrs[1];i++){
        sol.push(data[ptrs[0]][i]);
    }
    ptrs[0]++;
    return [sol,ptrs];
}
function sMDown(data,ptrs){
    var sol=[];
    for(var i=ptrs[0];i<data.length-ptr[2];i++){
        sol.push(data[i][-ptr[1]]);
    }
    ptrs[1]++;
    return [sol,ptrs];
}
function sMLeft(data,ptrs){
    var sol=[];
    for(var i=ptrs[3];i<data[-ptrs[2]].length-ptrs[1];i++){
        sol.push(data[ptrs[1]][-i]);
    }
    ptrs[1]++;
    return [sol,ptrs];
}
function sMUp(data,ptrs){
    var sol=[];
    for(var i=ptrs[2];i<data.length-ptr[0];i++){
        sol.push(data[-i][ptr[3]]);
    }
    ptrs[3]++;
    return [sol,ptrs];
}



function arrayJumping(){

}
function mergeIntervals(){

}
function generateIP(){

}
function algoStock1(){

}
function algoStock2(){

}
function algoStock3(){

}
function algoStock4(){

}
function minPathTriangle(){

}
function uniquePath1(){

}
function uniquePath2(){

}
function sanatizeExpr(){

}function validMathExpr(){

}

