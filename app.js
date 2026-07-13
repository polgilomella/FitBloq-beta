const state = JSON.parse(localStorage.getItem('fitblocks-state') || 'null') || {
  calories: 2000,
  meals: [],
  workoutLogs: [],
  runWeek: 1,
  weight: 78.4
};

const meals = [
  { id:'oats', type:'Desayuno', name:'Avena proteica con frutos rojos', kcal:445, p:32, c:58, f:10, time:'8 min' },
  { id:'toast', type:'Desayuno', name:'Tostadas, aguacate y huevos', kcal:510, p:27, c:44, f:25, time:'12 min' },
  { id:'yogurt_bowl', type:'Desayuno', name:'Bol de yogur, granola y kiwi', kcal:390, p:28, c:52, f:8, time:'5 min' },
  { id:'pancakes', type:'Desayuno', name:'Tortitas proteicas de plátano', kcal:475, p:35, c:61, f:10, time:'15 min' },
  { id:'omelette', type:'Desayuno', name:'Tortilla de claras, pavo y pan', kcal:365, p:41, c:35, f:7, time:'10 min' },
  { id:'chia', type:'Desayuno', name:'Pudin de chía, mango y skyr', kcal:420, p:27, c:49, f:13, time:'5 min' },
  { id:'bagel', type:'Desayuno', name:'Bagel de salmón y queso fresco', kcal:530, p:36, c:57, f:18, time:'8 min' },
  { id:'porridge', type:'Desayuno', name:'Porridge de manzana y canela', kcal:405, p:25, c:64, f:7, time:'9 min' },
  { id:'burrito', type:'Desayuno', name:'Burrito de huevo, pollo y verduras', kcal:555, p:43, c:48, f:21, time:'15 min' },
  { id:'smoothie_bowl', type:'Desayuno', name:'Smoothie bowl de frutos rojos', kcal:435, p:30, c:63, f:8, time:'7 min' },
  { id:'chicken', type:'Comida', name:'Pollo, arroz y verduras', kcal:685, p:52, c:79, f:16, time:'25 min' },
  { id:'salmon', type:'Comida', name:'Salmón con patata asada', kcal:720, p:45, c:67, f:29, time:'30 min' },
  { id:'beef_pasta', type:'Comida', name:'Pasta con ternera y tomate', kcal:760, p:51, c:92, f:21, time:'25 min' },
  { id:'turkey_rice', type:'Comida', name:'Pavo al curry con arroz basmati', kcal:650, p:50, c:78, f:15, time:'25 min' },
  { id:'lentils', type:'Comida', name:'Lentejas con verduras y huevo', kcal:610, p:34, c:78, f:18, time:'35 min' },
  { id:'poke', type:'Comida', name:'Poke de atún, arroz y edamame', kcal:690, p:46, c:84, f:19, time:'20 min' },
  { id:'fajitas', type:'Comida', name:'Fajitas de pollo y guacamole', kcal:735, p:49, c:71, f:28, time:'25 min' },
  { id:'cod', type:'Comida', name:'Bacalao con patata y pisto', kcal:590, p:47, c:63, f:15, time:'30 min' },
  { id:'chickpea', type:'Comida', name:'Ensalada de garbanzos y atún', kcal:625, p:42, c:65, f:22, time:'12 min' },
  { id:'risotto', type:'Comida', name:'Risotto ligero de pollo y setas', kcal:705, p:48, c:88, f:18, time:'30 min' },
  { id:'yogurt', type:'Merienda', name:'Yogur, plátano y almendras', kcal:285, p:20, c:34, f:8, time:'3 min' },
  { id:'shake', type:'Merienda', name:'Batido de cacao y avena', kcal:360, p:29, c:49, f:7, time:'4 min' },
  { id:'cottage', type:'Merienda', name:'Queso fresco, miel y nueces', kcal:310, p:24, c:27, f:12, time:'3 min' },
  { id:'hummus', type:'Merienda', name:'Hummus con zanahoria y crackers', kcal:275, p:10, c:37, f:10, time:'5 min' },
  { id:'sandwich', type:'Merienda', name:'Sándwich integral de pavo', kcal:330, p:28, c:39, f:8, time:'6 min' },
  { id:'protein_mousse', type:'Merienda', name:'Mousse proteica de chocolate', kcal:235, p:27, c:22, f:5, time:'8 min' },
  { id:'rice_cakes', type:'Merienda', name:'Tortitas de arroz, crema y plátano', kcal:345, p:14, c:52, f:10, time:'4 min' },
  { id:'fruit_skyr', type:'Merienda', name:'Skyr con fruta y chocolate negro', kcal:255, p:23, c:31, f:6, time:'3 min' },
  { id:'tuna_toast', type:'Merienda', name:'Tostada de atún y tomate', kcal:295, p:26, c:32, f:7, time:'7 min' },
  { id:'energy_balls', type:'Merienda', name:'Bolas de avena y proteína', kcal:320, p:21, c:38, f:10, time:'12 min' },
  { id:'tortilla', type:'Cena', name:'Tortilla y ensalada completa', kcal:540, p:39, c:31, f:29, time:'18 min' },
  { id:'turkey', type:'Cena', name:'Pavo con cuscús mediterráneo', kcal:595, p:48, c:65, f:15, time:'20 min' },
  { id:'hake', type:'Cena', name:'Merluza con verduras y boniato', kcal:505, p:44, c:53, f:13, time:'25 min' },
  { id:'chicken_wrap', type:'Cena', name:'Wrap integral de pollo y yogur', kcal:565, p:47, c:58, f:17, time:'15 min' },
  { id:'tofu', type:'Cena', name:'Tofu salteado con arroz y verduras', kcal:550, p:31, c:68, f:18, time:'20 min' },
  { id:'burger', type:'Cena', name:'Hamburguesa casera con patatas', kcal:690, p:49, c:66, f:25, time:'30 min' },
  { id:'tuna_omelette', type:'Cena', name:'Tortilla de atún con pan y tomate', kcal:485, p:45, c:37, f:18, time:'15 min' },
  { id:'shrimp', type:'Cena', name:'Wok de gambas y noodles', kcal:610, p:42, c:78, f:14, time:'20 min' },
  { id:'chicken_salad', type:'Cena', name:'Ensalada César ligera con pollo', kcal:520, p:46, c:32, f:23, time:'15 min' },
  { id:'pizza', type:'Cena', name:'Pizza proteica casera', kcal:650, p:52, c:69, f:18, time:'25 min' }
];

const strengthPlans = [
  {name:'Volumen · Torso/Pierna', meta:'4 días · Intermedio', pct:38, tag:'VOLUMEN'},
  {name:'Definición · Full body', meta:'3 días + cardio · Intermedio', pct:66, tag:'DEFINICIÓN'},
  {name:'Primeros pasos', meta:'3 días · Principiante', pct:20, tag:'INICIACIÓN'},
  {name:'Push Pull Legs', meta:'6 días · Intermedio', pct:0, tag:'VOLUMEN'},
  {name:'Fuerza 5 × 5', meta:'3 días · Intermedio', pct:0, tag:'FUERZA'},
  {name:'Hipertrofia 5 días', meta:'5 días · Avanzado', pct:0, tag:'VOLUMEN'},
  {name:'Definición express', meta:'4 días · Circuitos + cardio', pct:0, tag:'DEFINICIÓN'},
  {name:'Casa con mancuernas', meta:'3 días · Todos los niveles', pct:0, tag:'EN CASA'}
];

const dietPlans = [
  { id:'d1800', goal:'Definición', target:1800, name:'Definición equilibrada', items:['yogurt_bowl','chickpea','hummus','hake'] },
  { id:'d1900', goal:'Definición', target:1900, name:'Definición alta en proteína', items:['oats','lentils','yogurt','chicken_wrap'] },
  { id:'d2000', goal:'Definición', target:2000, name:'Definición flexible', items:['oats','chicken','cottage','chicken_wrap'] },
  { id:'v2300', goal:'Volumen', target:2300, name:'Volumen limpio', items:['pancakes','beef_pasta','shake','burger'] },
  { id:'v2500', goal:'Volumen', target:2500, name:'Volumen equilibrado', items:['bagel','salmon','shake','pizza','protein_mousse'] },
  { id:'v2700', goal:'Volumen', target:2700, name:'Volumen alto en energía', items:['burrito','beef_pasta','shake','burger','energy_balls'] }
];

const runningPlans = [
  {name:'De cero a 5 km', meta:'8 semanas · CaCo', pct:25, detail:'Corre 2 min · Camina 1 min · ×8'},
  {name:'De 5 km a 10 km', meta:'10 semanas · Progresivo', pct:0, detail:'Base, tirada larga y ritmo cómodo'},
  {name:'10 km más rápido', meta:'8 semanas · Intermedio', pct:0, detail:'Series, tempo y recuperación'}
];

const app = document.querySelector('#app');
const title = document.querySelector('#pageTitle');
document.querySelector('#todayLabel').textContent = new Intl.DateTimeFormat('es-ES',{weekday:'long',day:'numeric',month:'long'}).format(new Date()).toUpperCase();

function save(){ localStorage.setItem('fitblocks-state', JSON.stringify(state)); }
function totals(){ return state.meals.map(id=>meals.find(m=>m.id===id)).filter(Boolean).reduce((a,m)=>({kcal:a.kcal+m.kcal,p:a.p+m.p,c:a.c+m.c,f:a.f+m.f}),{kcal:0,p:0,c:0,f:0}); }
function macroPanel(){ const t=totals(); const pct=Math.min(100,Math.round(t.kcal/state.calories*100)); return `<div class="card macro-card"><div class="ring-row"><div class="ring" style="--pct:${pct}%"><div style="text-align:center"><strong>${t.kcal}</strong><br><small>DE ${state.calories} KCAL</small></div></div><div class="macro-lines"><div class="macro-line"><span>Proteína</span><b>${t.p} / 150 g</b></div><div class="macro-line"><span>Carbohidratos</span><b>${t.c} / 220 g</b></div><div class="macro-line"><span>Grasas</span><b>${t.f} / 65 g</b></div></div></div></div>`; }

function home(){ title.textContent='Hola, atleta'; app.innerHTML=`
  <section class="hero"><p class="eyebrow">TU PRÓXIMO PASO</p><h2>Hoy cuenta.</h2><p>Continúa tu semana con una sesión de torso o sal a completar tu CaCo.</p><button class="button" data-go="training">Empezar ahora</button></section>
  <div class="section-head"><h2>Resumen diario</h2></div>${macroPanel()}
  <div class="section-head"><h2>Elige tu actividad</h2></div><div class="grid">
    <article class="card clickable" data-action="quick-strength"><div class="icon violet">◆</div><h3>Fuerza</h3><p>Torso · 6 ejercicios</p></article>
    <article class="card clickable" data-action="quick-run"><div class="icon green-text">➜</div><h3>Running</h3><p>Semana ${state.runWeek} · CaCo</p></article>
  </div>
  <div class="section-head"><h2>Tu constancia</h2></div><div class="grid"><div class="card"><span class="orange">RACHA</span><div class="metric">4 días</div><p>Mejor: 8 días</p></div><div class="card"><span class="blue">SEMANA</span><div class="metric">3 / 5</div><p>actividades</p></div></div>`; bind(); }

function training(tab='strength'){ title.textContent='Entrenamiento'; app.innerHTML=`
  <div class="tabs"><button class="tab ${tab==='strength'?'active':''}" data-train-tab="strength">Fuerza</button><button class="tab ${tab==='running'?'active':''}" data-train-tab="running">Running</button><button class="tab ${tab==='history'?'active':''}" data-train-tab="history">Historial</button></div>
  ${tab==='strength'?strengthView():tab==='running'?runningView():historyView()}`; bind(); }
function strengthView(){ return `<section class="hero"><p class="eyebrow">ENTRENO DE HOY</p><h2>Torso A</h2><p>Press banca · Remo · Press militar y 3 ejercicios más.</p><button class="button" data-action="quick-strength">Iniciar sesión</button></section><div class="section-head"><h2>Planes preparados</h2><button>Ver todos</button></div>${strengthPlans.map(p=>planCard(p)).join('')}<div class="section-head"><h2>Mis bloques</h2></div><button class="button secondary wide" data-action="create-routine">＋ Crear rutina por bloques</button>`; }
function runningView(){ return `<section class="hero" style="background:linear-gradient(135deg,#087e50,#43d17a)"><p class="eyebrow">SALIR A CORRER</p><h2>Running libre</h2><p>Registra ruta, distancia, tiempo, ritmo y parciales con el GPS.</p><button class="button" data-action="quick-run">Iniciar carrera</button></section><div class="section-head"><h2>Planes guiados</h2></div>${runningPlans.map(p=>planCard(p,true)).join('')}<p class="notice">Los planes se pueden repetir o adaptar. La progresión debe ser gradual y ajustarse a tu estado de salud y sensaciones.</p>`; }
function historyView(){ const logs=state.workoutLogs; return `<div class="section-head"><h2>Actividad reciente</h2></div>${logs.length?logs.slice().reverse().map(x=>`<div class="card workout-row"><div class="icon ${x.type==='Running'?'green-text':'violet'}">${x.type==='Running'?'➜':'◆'}</div><div class="row-main"><h3>${x.name}</h3><p>${x.date} · ${x.detail}</p></div></div>`).join(''):`<div class="card"><h3>Aún no hay sesiones</h3><p>Tu primera sesión completada aparecerá aquí.</p></div>`}`; }
function planCard(p,run=false){ return `<article class="card plan-card clickable" ${run?'data-action="run-plan"':`data-strength-plan="${p.name}"`}><div class="plan-top"><div><span class="pill">${p.tag||'RUNNING'}</span><h3 style="margin-top:12px">${p.name}</h3><p>${p.meta}${p.detail?' · '+p.detail:''}</p></div><strong>${p.pct}%</strong></div><div class="progress-bar"><i style="width:${p.pct}%"></i></div></article>`; }

function nutrition(filter='Todos', view='Mi día'){ title.textContent='Nutrición'; app.innerHTML=`
  <div class="tabs">${['Mi día','Definición','Volumen'].map(x=>`<button class="tab ${view===x?'active':''}" data-diet-view="${x}">${x}</button>`).join('')}</div>
  ${view==='Mi día'?nutritionDay(filter):dietPlanView(view)}`; bind(); }
function nutritionDay(filter){ return `
  ${macroPanel()}<div class="section-head"><h2>Mi dieta por bloques</h2><button data-action="calories">${state.calories} kcal ✎</button></div>
  ${['Desayuno','Comida','Merienda','Cena'].map(type=>mealSlot(type)).join('')}
  <div class="section-head"><h2>Explorar recetas</h2></div><div class="tabs">${['Todos','Desayuno','Comida','Merienda','Cena'].map(x=>`<button class="tab ${filter===x?'active':''}" data-meal-filter="${x}">${x}</button>`).join('')}</div>
  ${(filter==='Todos'?meals:meals.filter(m=>m.type===filter)).map(mealCard).join('')}`; }
function dietPlanView(goal){ const plans=dietPlans.filter(p=>p.goal===goal); return `<section class="hero" style="background:${goal==='Volumen'?'linear-gradient(135deg,#b76312,#ff9f43)':'linear-gradient(135deg,#087e50,#43d17a)'}"><p class="eyebrow">PLANES PREPARADOS</p><h2>${goal}</h2><p>Días completos con alimentos, calorías y macros ya combinados. Puedes aplicarlos y después cambiar cualquier bloque.</p></section>${plans.map(dietPlanCard).join('')}<p class="notice">Los valores son estimaciones nutricionales y pueden variar según marcas, cantidades exactas y preparación.</p>`; }
function dietPlanCard(plan){ const selected=plan.items.map(id=>meals.find(m=>m.id===id)).filter(Boolean); const t=selected.reduce((a,m)=>({kcal:a.kcal+m.kcal,p:a.p+m.p,c:a.c+m.c,f:a.f+m.f}),{kcal:0,p:0,c:0,f:0}); return `<article class="card plan-card"><div class="plan-top"><div><span class="pill">${plan.target} KCAL</span><h3 style="margin-top:12px">${plan.name}</h3><p>${selected.length} bloques · ${t.kcal} kcal reales</p></div><strong>${t.p} g<small> prot.</small></strong></div><div class="meal-summary"><div><strong>${t.kcal}</strong><small>KCAL</small></div><div><strong>${t.p} g</strong><small>PROTEÍNA</small></div><div><strong>${t.c} g</strong><small>CARBOS</small></div><div><strong>${t.f} g</strong><small>GRASA</small></div></div><button class="button green wide" data-apply-plan="${plan.id}">Añadir a mi dieta</button></article>`; }
function mealSlot(type){ const selected=state.meals.map(id=>meals.find(m=>m.id===id)).filter(m=>m?.type===type); return selected.length?selected.map((m,i)=>`<article class="card meal-row"><div class="icon green-text">●</div><div class="row-main"><h3>${type}${i?` extra ${i}`:''}</h3><p>${m.name} · ${m.kcal} kcal</p></div><button class="tab" data-remove-meal="${m.id}">×</button></article>`).join(''):`<article class="card meal-row empty-slot clickable" data-add-type="${type}"><div class="icon">＋</div><div class="row-main"><h3>${type}</h3><p>Añade un bloque a tu dieta</p></div></article>`; }
function mealCard(m){ return `<article class="card plan-card clickable" data-meal="${m.id}"><div class="plan-top"><div><span class="pill">${m.type.toUpperCase()}</span><h3 style="margin-top:12px">${m.name}</h3><p>${m.time}</p></div><strong>${m.kcal}<small> kcal</small></strong></div><div class="meal-summary"><div><strong>${m.p} g</strong><small>PROTEÍNA</small></div><div><strong>${m.c} g</strong><small>CARBOS</small></div><div><strong>${m.f} g</strong><small>GRASA</small></div><div><strong>1</strong><small>RACIÓN</small></div></div></article>`; }

function progress(){ title.textContent='Tu progreso'; app.innerHTML=`<div class="grid"><div class="card"><span class="green-text">PESO ACTUAL</span><div class="metric">${state.weight} kg</div><p>−1,2 kg este mes</p></div><div class="card"><span class="violet">ENTRENOS</span><div class="metric">${state.workoutLogs.length}</div><p>completados</p></div></div><div class="section-head"><h2>Evolución</h2></div><div class="card"><h3>Peso corporal</h3><div style="height:150px;display:flex;align-items:flex-end;gap:12px;padding-top:20px">${[78,60,66,48,53,34,40].map((h,i)=>`<i style="display:block;flex:1;height:${h+30}px;border-radius:8px 8px 2px 2px;background:${i===6?'var(--green)':'#343a48'}"></i>`).join('')}</div><p style="margin-top:12px">Últimas 7 semanas</p></div><div class="section-head"><h2>Récords</h2></div><div class="card"><div class="macro-line"><span>Press de banca</span><b>80 kg</b></div><div class="macro-line"><span>5 kilómetros</span><b>—</b></div><div class="macro-line"><span>10 kilómetros</span><b>—</b></div></div>`; bind(); }

function modal(html){ document.querySelector('#modalRoot').innerHTML=`<div class="modal-backdrop"><section class="modal"><div class="modal-head"><h2>FitBlocks</h2><button data-close>×</button></div>${html}</section></div>`; document.querySelector('[data-close]').onclick=closeModal; document.querySelector('.modal-backdrop').onclick=e=>{if(e.target===e.currentTarget)closeModal()}; }
function closeModal(){ document.querySelector('#modalRoot').innerHTML=''; }
function startStrength(){ modal(`<span class="pill">FUERZA</span><h2 style="margin-top:14px">Torso A</h2><div class="card"><div class="macro-line"><span>Press banca</span><b>4 × 8 · 70 kg</b></div><div class="macro-line"><span>Remo con barra</span><b>4 × 10 · 55 kg</b></div><div class="macro-line"><span>Press militar</span><b>3 × 10 · 35 kg</b></div><div class="macro-line"><span>Jalón al pecho</span><b>3 × 12 · 50 kg</b></div></div><button class="button green wide" id="finishWorkout">Completar sesión</button>`); document.querySelector('#finishWorkout').onclick=()=>{state.workoutLogs.push({type:'Fuerza',name:'Torso A',date:new Date().toLocaleDateString('es-ES'),detail:'6 ejercicios'});save();closeModal();training('history');}; }
function startRun(){ modal(`<span class="pill">RUNNING</span><h2 style="margin-top:14px">CaCo · Semana ${state.runWeek}</h2><div class="metric" style="text-align:center;margin:30px">02:00</div><p style="text-align:center;color:var(--green);font-weight:800">CORRER</p><div class="card"><div class="macro-line"><span>Después</span><b>Caminar 1:00</b></div><div class="macro-line"><span>Repeticiones</span><b>8</b></div><div class="macro-line"><span>GPS</span><b class="green-text">Preparado</b></div></div><button class="button green wide" id="finishRun">Simular carrera completada</button>`); document.querySelector('#finishRun').onclick=()=>{state.workoutLogs.push({type:'Running',name:'CaCo · Semana '+state.runWeek,date:new Date().toLocaleDateString('es-ES'),detail:'24 min'});state.runWeek=Math.min(8,state.runWeek+1);save();closeModal();training('history');}; }
function setCalories(){ modal(`<h2>Objetivo diario</h2><label>Calorías<select id="calorieSelect">${[1800,1900,2000,2100,2200,2300,2400,2500,2600,2800,3000].map(x=>`<option ${x===state.calories?'selected':''}>${x}</option>`).join('')}</select></label><button class="button green wide" id="saveCalories">Guardar objetivo</button>`); document.querySelector('#saveCalories').onclick=()=>{state.calories=Number(document.querySelector('#calorieSelect').value);save();closeModal();nutrition();}; }
function showStrengthPlan(name){ const plan=strengthPlans.find(p=>p.name===name); const days=name.includes('Push')?['Push · Pecho, hombro y tríceps','Pull · Espalda y bíceps','Pierna · Cuádriceps y femoral']:name.includes('Torso')?['Torso A · Empuje dominante','Pierna A · Cuádriceps','Torso B · Tirón dominante','Pierna B · Cadena posterior']:name.includes('5 × 5')?['Día A · Sentadilla, banca y remo','Día B · Sentadilla, militar y peso muerto','Día A · Progresión de cargas']:name.includes('Full')||name.includes('Primeros')||name.includes('Casa')?['Full body A','Full body B','Full body C']:['Pecho y tríceps','Espalda y bíceps','Pierna','Hombro y abdomen','Torso completo']; modal(`<span class="pill">${plan?.tag||'RUTINA'}</span><h2 style="margin-top:14px">${name}</h2>${days.map((d,i)=>`<div class="card workout-row"><div class="icon violet">${i+1}</div><div class="row-main"><h3>${d}</h3><p>5–7 ejercicios · Series y repeticiones configuradas</p></div></div>`).join('')}<button class="button green wide" data-close-plan>Usar esta rutina</button>`); document.querySelector('[data-close-plan]').onclick=()=>{closeModal();startStrength();}; }
function bind(){
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>navigate(b.dataset.go));
  document.querySelectorAll('[data-train-tab]').forEach(b=>b.onclick=()=>training(b.dataset.trainTab));
  document.querySelectorAll('[data-meal-filter]').forEach(b=>b.onclick=()=>nutrition(b.dataset.mealFilter));
  document.querySelectorAll('[data-diet-view]').forEach(b=>b.onclick=()=>nutrition('Todos',b.dataset.dietView));
  document.querySelectorAll('[data-apply-plan]').forEach(b=>b.onclick=()=>{const p=dietPlans.find(x=>x.id===b.dataset.applyPlan);state.meals=[...p.items];state.calories=p.target;save();nutrition();});
  document.querySelectorAll('[data-meal]').forEach(b=>b.onclick=()=>{const m=meals.find(x=>x.id===b.dataset.meal); state.meals=state.meals.filter(id=>meals.find(x=>x.id===id)?.type!==m.type);state.meals.push(m.id);save();nutrition(m.type);});
  document.querySelectorAll('[data-remove-meal]').forEach(b=>b.onclick=()=>{state.meals=state.meals.filter(x=>x!==b.dataset.removeMeal);save();nutrition();});
  document.querySelectorAll('[data-add-type]').forEach(b=>b.onclick=()=>nutrition(b.dataset.addType));
  document.querySelectorAll('[data-action="quick-strength"]').forEach(b=>b.onclick=startStrength);
  document.querySelectorAll('[data-action="quick-run"],[data-action="run-plan"]').forEach(b=>b.onclick=startRun);
  document.querySelectorAll('[data-strength-plan]').forEach(b=>b.onclick=()=>showStrengthPlan(b.dataset.strengthPlan));
  document.querySelectorAll('[data-action="calories"]').forEach(b=>b.onclick=setCalories);
  document.querySelectorAll('[data-action="create-routine"]').forEach(b=>b.onclick=()=>modal(`<h2>Constructor de rutina</h2><p>Esta pantalla permitirá elegir ejercicios, ordenarlos y definir series, repeticiones, peso y descanso.</p><div class="notice">El constructor completo se incorporará en la siguiente iteración.</div>`));
}
function navigate(page){ document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.page===page)); ({home,training,nutrition,progress}[page]||home)(); window.scrollTo(0,0); }
document.querySelectorAll('.nav-item').forEach(b=>b.onclick=()=>navigate(b.dataset.page));
home();
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
