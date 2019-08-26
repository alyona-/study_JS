let b = [1,0,0,0];

let m1=[1,3];
let m2 =[2,3];

for(let i=0,j=1;i<b.length;i++,j++) {
    if(b[i]===1){
        if(m1.indexOf(j)!==-1) m1=null;
        if(m2.indexOf(j)!==-1) m2=null;
        break;
    }
}

if(m1===null && m2===null){
    console.log("Яд в 3 бутылке");
}else if(m1!==null && m2!==null) {
    console.log("Яд в 4 бутылке");
}else if(m1===null && m2!==null){
    console.log("Яд в 1 бутылке");
}else if(m1===null && m2!==null){
    console.log("Яд в 2 бутылке");
}
