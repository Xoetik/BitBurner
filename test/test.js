/** @param {NS} ns **/
export async function main(ns) {
    var data=[["1","2","3"],["4","5","6"],["7","8","9"]];
    // ns.alert(data[0][0]);
    ns.alert(spiralMatrix(data));
}
function spiralMatrix(data){
    var soulution =[];
    var ptrs = [0,0,0,0];
    while(ptrs[0]+ptrs[2]<data[0].length && ptrs[0]+ptrs[2]<data[data.length-1].length && ptrs[1]+ptrs[3]<data.length){
        var ret;
        ret=sMRight(data,ptrs);
        ptrs=ret[1];
        for(var k=0;k<ret[0].length;k++){
            soulution.push(ret[0][k]);
        }
        ret=sMDown(data,ptrs);
        ptrs=ret[1];
        for(var k=0;k<ret[0].length;k++){
            soulution.push(ret[0][k]);
        }
        ret=sMLeft(data,ptrs);
        ptrs=ret[1];
        for(var k=0;k<ret[0].length;k++){
            soulution.push(ret[0][k]);
        }
        ret=sMUp(data,ptrs);
        ptrs=ret[1];
        for(var k=0;k<ret[0].length;k++){
            soulution.push(ret[0][k]);
        }
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
    for(var i=ptrs[0];i<data.length-ptrs[2];i++){
        sol.push(data[i][data[i].length-ptrs[1]]);
    }
    ptrs[1]++;
    return [sol,ptrs];
}
function sMLeft(data,ptrs){//TODO Fix
    var sol=[];
    for(var i=ptrs[3];i<data[data.length-ptrs[0]].length-ptrs[1];i++){
        sol.push(data[data.length-ptrs[0]][data]);
    }
    ptrs[1]++;
    return [sol,ptrs];
}
function sMUp(data,ptrs){
    var sol=[];
    for(var i=ptrs[2];i<data.length-ptrs[0];i++){
        sol.push(data[data.length-i][ptrs[3]]);
    }
    ptrs[3]++;
    return [sol,ptrs];
}