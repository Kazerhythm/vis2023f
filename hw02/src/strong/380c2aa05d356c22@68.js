function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _Constellations(data){return(
data.map(item => item.Constellation)
)}

function _Starmane(){return(
new Map([
  [0,"牡羊座"],
  [1,"金牛座"],
  [2,"雙子座"],
  [3,"巨蟹座"],
  [4,"獅子座"],
  [5,"處女座"],
  [6,"天秤座"],
  [7,"天蠍座"],
  [8,"射手座"],
  [9,"摩羯座"],
  [10,"水瓶座"],
  [11,"雙魚座"],
  [12,""]
])
)}

function _6(yCounts,Constellations,Starmane,data)
{
  yCounts.length = 0; //將yCounts清空
  var minConstellation = Math.min(...Constellations); //最早出生年
  var maxConstellation = Math.max(...Constellations); //最晚出生年
  for (var y=minConstellation; y<=maxConstellation; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({Constellation:Starmane.get(y), gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({Constellation:Starmane.get(y), gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation-minConstellation)*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return yCounts
}


function _7(Plot,Starmane,yCounts){return(
Plot.plot({  
  grid: true,
  y: {label: "count"},
  x:{domain: Array.from(Starmane.values()).slice(0,12)},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

function _8(Plot,Starmane,data){return(
Plot.plot({  
	y: {grid: true, label: "count"},
  x:{transform:(n)=>Starmane.get(n),domain: Array.from(Starmane.values())},
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true })),    
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 })
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("./files/2259824662fb612853b8873b8814ace51e8cbac39ba881850d66e26df63f1897b01d1bd3459af6529669fd912da9dd607a30666a93278d7fdfa10bbe22b8913d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("Constellations")).define("Constellations", ["data"], _Constellations);
  main.variable(observer("Starmane")).define("Starmane", _Starmane);
  main.variable(observer()).define(["yCounts","Constellations","Starmane","data"], _6);
  main.variable(observer()).define(["Plot","Starmane","yCounts"], _7);
  main.variable(observer()).define(["Plot","Starmane","data"], _8);
  return main;
}
