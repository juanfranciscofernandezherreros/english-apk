(function () {
  const subjects = [
    {en:"I", es:"Yo", i:0}, {en:"You", es:"Tú", i:1}, {en:"He", es:"Él", i:2},
    {en:"She", es:"Ella", i:3}, {en:"We", es:"Nosotros", i:4}, {en:"They", es:"Ellos", i:5}
  ];
  const verbs = [
    {b:"study",past:"studied",pp:"studied",ing:"studying",es:"estudiar",pres:["estudio","estudias","estudia","estudia","estudiamos","estudian"],pastEs:["estudié","estudiaste","estudió","estudió","estudiamos","estudiaron"],ger:"estudiando",ppEs:"estudiado"},
    {b:"play",past:"played",pp:"played",ing:"playing",es:"jugar",pres:["juego","juegas","juega","juega","jugamos","juegan"],pastEs:["jugué","jugaste","jugó","jugó","jugamos","jugaron"],ger:"jugando",ppEs:"jugado"},
    {b:"watch",past:"watched",pp:"watched",ing:"watching",es:"ver",pres:["veo","ves","ve","ve","vemos","ven"],pastEs:["vi","viste","vio","vio","vimos","vieron"],ger:"viendo",ppEs:"visto"},
    {b:"read",past:"read",pp:"read",ing:"reading",es:"leer",pres:["leo","lees","lee","lee","leemos","leen"],pastEs:["leí","leíste","leyó","leyó","leímos","leyeron"],ger:"leyendo",ppEs:"leído"},
    {b:"learn",past:"learned",pp:"learned",ing:"learning",es:"aprender",pres:["aprendo","aprendes","aprende","aprende","aprendemos","aprenden"],pastEs:["aprendí","aprendiste","aprendió","aprendió","aprendimos","aprendieron"],ger:"aprendiendo",ppEs:"aprendido"},
    {b:"visit",past:"visited",pp:"visited",ing:"visiting",es:"visitar",pres:["visito","visitas","visita","visita","visitamos","visitan"],pastEs:["visité","visitaste","visitó","visitó","visitamos","visitaron"],ger:"visitando",ppEs:"visitado"},
    {b:"help",past:"helped",pp:"helped",ing:"helping",es:"ayudar",pres:["ayudo","ayudas","ayuda","ayuda","ayudamos","ayudan"],pastEs:["ayudé","ayudaste","ayudó","ayudó","ayudamos","ayudaron"],ger:"ayudando",ppEs:"ayudado"},
    {b:"call",past:"called",pp:"called",ing:"calling",es:"llamar",pres:["llamo","llamas","llama","llama","llamamos","llaman"],pastEs:["llamé","llamaste","llamó","llamó","llamamos","llamaron"],ger:"llamando",ppEs:"llamado"},
    {b:"use",past:"used",pp:"used",ing:"using",es:"usar",pres:["uso","usas","usa","usa","usamos","usan"],pastEs:["usé","usaste","usó","usó","usamos","usaron"],ger:"usando",ppEs:"usado"},
    {b:"practice",past:"practised",pp:"practised",ing:"practising",es:"practicar",pres:["practico","practicas","practica","practica","practicamos","practican"],pastEs:["practiqué","practicaste","practicó","practicó","practicamos","practicaron"],ger:"practicando",ppEs:"practicado"}
  ];
  const objects = [
    ["English","inglés"],["football","fútbol"],["the lesson","la lección"],["the exercise","el ejercicio"],["the vocabulary","el vocabulario"],
    ["the dialogue","el diálogo"],["the text","el texto"],["the example","el ejemplo"],["the rules","las reglas"],["the material","el material"]
  ];
  const times = [
    ["every day","cada día"],["on Mondays","los lunes"],["in the morning","por la mañana"],["after work","después del trabajo"],
    ["at weekends","los fines de semana"],["before class","antes de clase"],["today","hoy"],["this week","esta semana"]
  ];
  const adjectives = [
    ["easy","fácil"],["difficult","difícil"],["important","importante"],["interesting","interesante"],["useful","útil"],
    ["clear","claro"],["possible","posible"],["necessary","necesario"],["common","común"],["effective","eficaz"]
  ];
  const adverbs = [["usually","normalmente"],["often","a menudo"],["sometimes","a veces"],["rarely","rara vez"],["always","siempre"]];
  const be=(s)=>s.en==="I"?"am":(["He","She"].includes(s.en)?"is":"are");
  const was=(s)=>["You","We","They"].includes(s.en)?"were":"was";
  const have=(s)=>["He","She"].includes(s.en)?"has":"have";
  const doAux=(s)=>["He","She"].includes(s.en)?"does":"do";
  const third=(v)=>v.endsWith("y")?v.slice(0,-1)+"ies":(/(s|sh|ch|x|o)$/.test(v)?v+"es":v+"s");
  const estarPres=["estoy","estás","está","está","estamos","están"];
  const estarPast=["estaba","estabas","estaba","estaba","estábamos","estaban"];
  const haberPres=["he","has","ha","ha","hemos","han"];
  const irPres=["voy","vas","va","va","vamos","van"];
  const poderPres=["puedo","puedes","puede","puede","podemos","pueden"];
  const tenerPres=["tengo","tienes","tiene","tiene","tenemos","tienen"];
  const deberCond=["debería","deberías","debería","debería","deberíamos","deberían"];
  const poderCond=["podría","podrías","podría","podría","podríamos","podrían"];
  const necesitarPres=["necesito","necesitas","necesita","necesita","necesitamos","necesitan"];

  const topics = [
    ["Present Simple","A1"],["Present Continuous","A1"],["Past Simple","A1"],["Future with will","A1"],["Can / Can't","A1"],
    ["Past Continuous","A2"],["Present Perfect","A2"],["Going to","A2"],["Must / Have to","A2"],["Should / Shouldn't","A2"],
    ["Comparatives & Superlatives","B1"],["First Conditional","B1"],["Second Conditional","B1"],["Passive Voice","B1"],["Relative Clauses","B1"],
    ["Gerunds & Infinitives","B2"],["Third Conditional","B2"],["Reported Speech","B2"],["Wish / If only","B2"],["Modal Deduction","B2"],
    ["Mixed Conditionals","C1"],["Inversion","C1"],["Cleft Sentences","C1"],["Advanced Modals","C1"],["Participle Clauses","C1"]
  ];

  function sentence(topicIndex, i) {
    const [topic,level]=topics[topicIndex], s=subjects[i%subjects.length], v=verbs[(i*3+topicIndex)%verbs.length];
    const [o,oe]=objects[(i*7+topicIndex)%objects.length], [t,te]=times[(i*11+topicIndex)%times.length];
    const [adj,adje]=adjectives[(i*13+topicIndex)%adjectives.length], [adv,adve]=adverbs[(i*17+topicIndex)%adverbs.length];
    const neg=i%5===0, q=i%11===0; let en="",es="",note="";
    switch(topicIndex){
      case 0:
        if(q){en=`${doAux(s)} ${s.en.toLowerCase()} ${v.b} ${o} ${t}?`;es=`¿${s.es} ${v.pres[s.i]} ${oe} ${te}?`;}
        else if(neg){en=`${s.en} ${["He","She"].includes(s.en)?"doesn't":"don't"} ${v.b} ${o} ${t}.`;es=`${s.es} no ${v.pres[s.i]} ${oe} ${te}.`;}
        else{en=`${s.en} ${adv} ${["He","She"].includes(s.en)?third(v.b):v.b} ${o} ${t}.`;es=`${s.es} ${adve} ${v.pres[s.i]} ${oe} ${te}.`;} note="Habits, facts and routines";break;
      case 1: en=`${s.en} ${be(s)} ${v.ing} ${o} right now.`;es=`${s.es} ${estarPres[s.i]} ${v.ger} ${oe} ahora mismo.`;note="Actions happening now";break;
      case 2: en=`${s.en} ${v.past} ${o} yesterday.`;es=`${s.es} ${v.pastEs[s.i]} ${oe} ayer.`;note="Finished actions in the past";break;
      case 3: en=`${s.en} will ${v.b} ${o} tomorrow.`;es=`${s.es} ${irPres[s.i]} a ${v.es} ${oe} mañana.`;note="Predictions and spontaneous decisions";break;
      case 4: en=neg?`${s.en} can't ${v.b} ${o} today.`:`${s.en} can ${v.b} ${o} today.`;es=neg?`${s.es} no ${poderPres[s.i]} ${v.es} ${oe} hoy.`:`${s.es} ${poderPres[s.i]} ${v.es} ${oe} hoy.`;note="Ability and permission";break;
      case 5: en=`${s.en} ${was(s)} ${v.ing} ${o} when the phone rang.`;es=`${s.es} ${estarPast[s.i]} ${v.ger} ${oe} cuando sonó el teléfono.`;note="Actions in progress in the past";break;
      case 6: en=`${s.en} ${have(s)} ${v.pp} ${o} several times.`;es=`${s.es} ${haberPres[s.i]} ${v.ppEs} ${oe} varias veces.`;note="Past experience connected to the present";break;
      case 7: en=`${s.en} ${be(s)} going to ${v.b} ${o} this weekend.`;es=`${s.es} ${irPres[s.i]} a ${v.es} ${oe} este fin de semana.`;note="Plans and intentions";break;
      case 8: en=`${s.en} ${["He","She"].includes(s.en)?"has to":"have to"} ${v.b} ${o} before Friday.`;es=`${s.es} ${tenerPres[s.i]} que ${v.es} ${oe} antes del viernes.`;note="Obligation and necessity";break;
      case 9: en=neg?`${s.en} shouldn't ${v.b} ${o} so late.`:`${s.en} should ${v.b} ${o} more often.`;es=neg?`${s.es} no ${deberCond[s.i]} ${v.es} ${oe} tan tarde.`:`${s.es} ${deberCond[s.i]} ${v.es} ${oe} más a menudo.`;note="Advice and recommendations";break;
      case 10: en=i%2?`${o} is more ${adj} than the previous example.`:`${o} is the most ${adj} example in this chapter.`;es=i%2?`${oe} es más ${adje} que el ejemplo anterior.`:`${oe} es el ejemplo más ${adje} de este capítulo.`;note="Comparing people and things";break;
      case 11: en=`If ${s.en.toLowerCase()} ${["He","She"].includes(s.en)?third(v.b):v.b} ${o}, ${s.en.toLowerCase()} will improve.`;es=`Si ${s.es.toLowerCase()} ${v.pres[s.i]} ${oe}, mejorará.`;note="Real or likely future conditions";break;
      case 12: en=`If ${s.en.toLowerCase()} had more time, ${s.en.toLowerCase()} would ${v.b} ${o} every day.`;es=`Si ${s.es.toLowerCase()} tuviera más tiempo, ${v.es}ía ${oe} cada día.`;note="Hypothetical present situations";break;
      case 13: en=`${o.charAt(0).toUpperCase()+o.slice(1)} is ${v.pp} in class every week.`;es=`${oe.charAt(0).toUpperCase()+oe.slice(1)} se trabaja en clase cada semana.`;note="Passive structures";break;
      case 14: en=`The student who ${third(v.b)} ${o} regularly makes steady progress.`;es=`El estudiante que ${v.pres[2]} ${oe} con regularidad progresa de forma constante.`;note="Defining relative clauses";break;
      case 15: en=i%2?`${s.en} enjoys ${v.ing} ${o}.`:`${s.en} wants to ${v.b} ${o} today.`;es=i%2?`A ${s.es.toLowerCase()} le gusta ${v.es} ${oe}.`:`${s.es} quiere ${v.es} ${oe} hoy.`;note="Verb patterns with -ing and infinitives";break;
      case 16: en=`If ${s.en.toLowerCase()} had ${v.pp} more, ${s.en.toLowerCase()} would have made faster progress.`;es=`Si ${s.es.toLowerCase()} hubiera ${v.ppEs} más, habría progresado más rápido.`;note="Imaginary past conditions";break;
      case 17: en=`The teacher said that ${s.en.toLowerCase()} had ${v.pp} ${o} before class.`;es=`El profesor dijo que ${s.es.toLowerCase()} había ${v.ppEs} ${oe} antes de clase.`;note="Reporting past statements";break;
      case 18: en=`I wish ${s.en.toLowerCase()} had more time to ${v.b} ${o}.`;es=`Ojalá ${s.es.toLowerCase()} tuviera más tiempo para ${v.es} ${oe}.`;note="Wishes and unreal situations";break;
      case 19: en=i%2?`${s.en} must be ${adj}; the evidence is very strong.`:`${s.en} might be ${adj}; the evidence is limited.`;es=i%2?`${s.es} debe de estar ${adje}; las pruebas son muy sólidas.`:`${s.es} ${poderCond[s.i]} estar ${adje}; las pruebas son limitadas.`;note="Degrees of certainty";break;
      case 20: en=`If ${s.en.toLowerCase()} had ${v.pp} more last year, ${s.en.toLowerCase()} would be more confident now.`;es=`Si ${s.es.toLowerCase()} hubiera ${v.ppEs} más el año pasado, ahora tendría más confianza.`;note="Mixed past and present conditionals";break;
      case 21: en=`Rarely ${doAux(s)} ${s.en.toLowerCase()} ${v.b} ${o} without checking the instructions first.`;es=`Rara vez ${v.pres[s.i]} ${s.es.toLowerCase()} ${oe} sin revisar primero las instrucciones.`;note="Negative adverbial inversion";break;
      case 22: en=`What ${s.en.toLowerCase()} really needs is more time to ${v.b} ${o}.`;es=`Lo que ${s.es.toLowerCase()} realmente ${necesitarPres[s.i]} es más tiempo para ${v.es} ${oe}.`;note="Cleft sentences for emphasis";break;
      case 23: en=`${s.en} could have ${v.pp} ${o} earlier, but the opportunity was missed.`;es=`${s.es} ${poderCond[s.i]} haber ${v.ppEs} ${oe} antes, pero se perdió la oportunidad.`;note="Advanced modal perfect forms";break;
      case 24: en=`Having ${v.pp} ${o}, ${s.en.toLowerCase()} felt more prepared for the next task.`;es=`Después de haber ${v.ppEs} ${oe}, ${s.es.toLowerCase()} se sintió más preparado para la siguiente tarea.`;note="Participle clauses";break;
    }
    return {id:topicIndex*400+i+1,topic,level,english:en,spanish:es,note};
  }

  const all=[];
  for(let t=0;t<topics.length;t++) for(let i=0;i<400;i++) all.push(sentence(t,i));
  window.EASY_ENGLISH_TOPICS=topics.map((x,i)=>({name:x[0],level:x[1],count:400,index:i}));
  window.EASY_ENGLISH_PHRASES=all;
})();