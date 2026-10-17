(function(){
"use strict";
const API="https://wnluofonzteaqtlfshgy.supabase.co/rest/v1/";
const KEY="sb_publishable_Ef-AXAapcwaPExEFS6kmug_tKLaulM8";
const STORAGE_KEY="easyenglish.sugerencias.votante.v1";
const get=id=>document.getElementById(id);
const form=get("suggestionForm");
if(!form)return;
const title=get("suggestionTitle");
const description=get("suggestionDescription");
const submit=get("suggestionSubmit");
const formStatus=get("suggestionFormStatus");
const listStatus=get("suggestionListStatus");
const list=get("suggestionList");
let loaded=false;

function voterId(){
let id=localStorage.getItem(STORAGE_KEY);
if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id||'')){
id=typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function'
?crypto.randomUUID()
:'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16)});
localStorage.setItem(STORAGE_KEY,id);
}
return id;
}

async function rpc(name,body){
const response=await fetch(API+"rpc/"+name,{method:"POST",headers:{apikey:KEY,Authorization:"Bearer "+KEY,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(body)});
const raw=await response.text();
let result;
try{result=raw?JSON.parse(raw):null}catch{result=raw}
if(!response.ok){
const message=result&&typeof result==="object"?result.message||result.details||result.hint:result;
throw Error(message||"Error de Supabase ("+response.status+")");
}
return result;
}

function status(element,message,error){
element.textContent=message;
element.dataset.error=String(Boolean(error));
}

function button(label,count,vote,current){
const control=document.createElement("button");
control.type="button";
control.textContent=label+" · "+Number(count||0);
control.setAttribute("aria-pressed",String(Number(current)===vote));
control.disabled=Number(current)===vote;
return control;
}

function render(items){
list.replaceChildren();
if(!items.length){
const empty=document.createElement("p");
empty.className="muted";
empty.textContent="Todavía no hay sugerencias publicadas. ¡Puedes proponer la primera!";
list.append(empty);
return;
}
for(const item of items){
const card=document.createElement("article");
card.className="suggestion-item";
const heading=document.createElement("h2");
heading.textContent=item.titulo;
const body=document.createElement("p");
body.textContent=item.descripcion;
const votes=document.createElement("div");
votes.className="suggestion-votes";
const like=button("👍 Me gusta",item.me_gusta,1,item.mi_voto);
const dislike=button("👎 No me gusta",item.no_me_gusta,-1,item.mi_voto);
like.addEventListener("click",()=>vote(item.id,1));
dislike.addEventListener("click",()=>vote(item.id,-1));
votes.append(like,dislike);
card.append(heading,body,votes);
list.append(card);
}
}

async function load(){
status(listStatus,"Cargando sugerencias…");
const rows=await rpc("listar_sugerencias",{p_votante_id:voterId()});
if(!Array.isArray(rows))throw Error("La respuesta de sugerencias no tiene el formato esperado.");
render(rows);
status(listStatus,"");
loaded=true;
}

async function vote(id,value){
const controls=list.querySelectorAll(".suggestion-votes button");
controls.forEach(control=>{control.disabled=true});
try{
await rpc("votar_sugerencia",{p_sugerencia_id:id,p_votante_id:voterId(),p_voto:value});
await load();
}catch(error){
status(listStatus,"No se pudo guardar el voto: "+error.message,true);
controls.forEach(control=>{control.disabled=false});
}
}

form.addEventListener("submit",async event=>{
event.preventDefault();
submit.disabled=true;
status(formStatus,"Enviando sugerencia…");
try{
await rpc("enviar_sugerencia",{p_titulo:title.value.trim(),p_descripcion:description.value.trim()});
form.reset();
status(formStatus,"Gracias. La sugerencia queda pendiente de revisión antes de publicarse.");
}catch(error){
status(formStatus,"No se pudo enviar la sugerencia: "+error.message,true);
}finally{
submit.disabled=false;
}
});

get("openSuggestions").addEventListener("click",async()=>{
window.show("suggestionsView");
window.scrollTo(0,0);
if(!loaded){
try{await load()}catch(error){status(listStatus,"No se pudieron cargar las sugerencias: "+error.message,true)}
}
});
get("suggestionsBack").addEventListener("click",()=>window.show("home"));
})();
