const fs = require("fs");
const vm = require("vm");

const code = fs.readFileSync("www/grammar-data.js","utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const phrases = sandbox.window.EASY_ENGLISH_PHRASES;
const topics = sandbox.window.EASY_ENGLISH_TOPICS;

if (!Array.isArray(phrases)) throw new Error("Phrase corpus was not created.");
if (phrases.length !== 10000) throw new Error("Expected 10,000 phrases, got " + phrases.length);
if (!Array.isArray(topics) || topics.length !== 25) throw new Error("Expected 25 grammar chapters.");
for (const topic of topics) {
  const count = phrases.filter(p => p.topic === topic.name).length;
  if (count !== 400) throw new Error(topic.name + " should contain 400 phrases, got " + count);
}
for (const p of phrases) {
  if (!p.english || !p.spanish || !p.level || !p.topic) throw new Error("Incomplete phrase: " + JSON.stringify(p));
}
const levels = [...new Set(phrases.map(p=>p.level))].sort();
if (levels.join(",") !== "A1,A2,B1,B2,C1") throw new Error("Unexpected levels: " + levels.join(","));

console.log("✓ 10,000 bilingual grammar phrases");
console.log("✓ 25 chapters × 400 phrases");
console.log("✓ Levels A1, A2, B1, B2 and C1");
