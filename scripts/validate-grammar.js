const fs=require("fs");
const path=require("path");

const levels=["a1","a2","b1","b2","c1"];
let all=[];

for(const level of levels){
  const file=path.join(__dirname,"..","www","data",level+".json");
  if(!fs.existsSync(file)) throw new Error("Missing "+file);
  const rows=JSON.parse(fs.readFileSync(file,"utf8"));
  if(!Array.isArray(rows)) throw new Error(level+".json must contain an array");
  if(rows.length!==2000) throw new Error(level+".json must contain 2,000 questions, got "+rows.length);
  for(const q of rows){
    if(!q.id||!q.level||!q.topic||!q.english||!q.spanish){
      throw new Error("Invalid question in "+level+".json: "+JSON.stringify(q));
    }
  }
  all=all.concat(rows);
}

if(all.length!==10000) throw new Error("Expected 10,000 questions, got "+all.length);
const ids=new Set(all.map(q=>q.id));
if(ids.size!==10000) throw new Error("Question IDs are not unique");

console.log("✓ 10,000 JSON questions");
console.log("✓ 2,000 questions per level");
console.log("✓ Levels A1, A2, B1, B2 and C1");
