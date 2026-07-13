// FitBloq: capa funcional avanzada sobre el prototipo inicial.
state.profile ||= { name:'', age:30, height:175, sex:'hombre', goal:'Definición', level:'Intermedio', days:4, configured:false };
state.weightHistory ||= [{date:new Date().toLocaleDateString('es-ES'), value:state.weight}];
state.favorites ||= [];
state.personalRecords ||= { bench:80, run5:null, run10:null };
state.settings ||= { voice:true, vibration:true };
const weekDays=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
state.weekPlan ||= Object.fromEntries(weekDays.map(d=>[d,[]]));
state.customMeals ||= [];
state.customMeals.forEach(m=>{if(!meals.some(x=>x.id===m.id))meals.push(m);});
state.supplements ||= [];
state.trainingSchedule ||= {Lunes:'Espalda',Martes:'Pecho',Miércoles:'Pierna',Jueves:'Descanso',Viernes:'Hombro',Sábado:'Full body',Domingo:'Descanso'};
save();

const exerciseSessions = {
  'Torso A': [
    {name:'Press de banca',sets:4,reps:8,weight:70,rest:90},
    {name:'Remo con barra',sets:4,reps:10,weight:55,rest:90},
    {name:'Press militar',sets:3,reps:10,weight:35,rest:75},
    {name:'Jalón al pecho',sets:3,reps:12,weight:50,rest:75},
    {name:'Elevaciones laterales',sets:3,reps:15,weight:8,rest:60},
    {name:'Curl y extensión de tríceps',sets:3,reps:12,weight:15,rest:60}
  ],
  'Pierna A': [
    {name:'Sentadilla',sets:4,reps:8,weight:80,rest:120},
    {name:'Peso muerto rumano',sets:4,reps:10,weight:70,rest:90},
    {name:'Prensa',sets:3,reps:12,weight:120,rest:90},
    {name:'Curl femoral',sets:3,reps:12,weight:35,rest:60},
    {name:'Gemelos',sets:4,reps:15,weight:50,rest:60}
  ]
};

const exerciseLibrary = {
  'Pecho':[
    ['Press de banca con barra','Barra','Básico'],['Press inclinado con mancuernas','Mancuernas','Básico'],['Press en máquina','Máquina','Básico'],['Aperturas en polea','Polea','Básico'],['Flexiones','Peso corporal','Básico'],['Fondos inclinados','Peso corporal','Intermedio'],['Press declinado','Barra','Intermedio'],['Press unilateral en polea','Polea','Avanzado']
  ],
  'Espalda':[
    ['Dominadas','Peso corporal','Básico'],['Jalón al pecho','Polea','Básico'],['Remo con barra','Barra','Básico'],['Remo sentado','Polea','Básico'],['Remo con mancuerna','Mancuerna','Básico'],['Pullover en polea','Polea','Intermedio'],['Remo T','Máquina','Intermedio'],['Dominada neutra lastrada','Peso corporal','Avanzado']
  ],
  'Hombro':[
    ['Press militar','Barra','Básico'],['Press con mancuernas','Mancuernas','Básico'],['Elevaciones laterales','Mancuernas','Básico'],['Pájaros','Mancuernas','Básico'],['Face pull','Polea','Básico'],['Elevación lateral en polea','Polea','Intermedio'],['Press Arnold','Mancuernas','Intermedio'],['Remo al mentón amplio','Polea','Intermedio']
  ],
  'Bíceps':[
    ['Curl con barra EZ','Barra','Básico'],['Curl alterno','Mancuernas','Básico'],['Curl martillo','Mancuernas','Básico'],['Curl en polea','Polea','Básico'],['Curl predicador','Máquina','Básico'],['Curl inclinado','Mancuernas','Intermedio'],['Curl bayesian','Polea','Intermedio'],['Curl araña','Barra','Intermedio']
  ],
  'Tríceps':[
    ['Extensión con cuerda','Polea','Básico'],['Press francés','Barra','Básico'],['Fondos','Peso corporal','Básico'],['Extensión sobre cabeza','Polea','Básico'],['Press banca cerrado','Barra','Intermedio'],['Extensión unilateral','Polea','Intermedio'],['Skull crushers','Barra','Intermedio'],['JM press','Barra','Avanzado']
  ],
  'Cuádriceps':[
    ['Sentadilla trasera','Barra','Básico'],['Prensa de piernas','Máquina','Básico'],['Extensión de cuádriceps','Máquina','Básico'],['Zancadas','Mancuernas','Básico'],['Sentadilla goblet','Mancuerna','Básico'],['Sentadilla búlgara','Mancuernas','Intermedio'],['Hack squat','Máquina','Intermedio'],['Sentadilla frontal','Barra','Avanzado']
  ],
  'Femoral':[
    ['Peso muerto rumano','Barra','Básico'],['Curl femoral tumbado','Máquina','Básico'],['Curl femoral sentado','Máquina','Básico'],['Buenos días','Barra','Intermedio'],['Peso muerto rumano unilateral','Mancuerna','Intermedio'],['Nordic curl','Peso corporal','Avanzado'],['Pull through','Polea','Intermedio'],['Glute ham raise','Máquina','Avanzado']
  ],
  'Glúteo':[
    ['Hip thrust','Barra','Básico'],['Puente de glúteo','Peso corporal','Básico'],['Patada de glúteo','Polea','Básico'],['Abducción de cadera','Máquina','Básico'],['Sentadilla búlgara','Mancuernas','Intermedio'],['Step up','Mancuernas','Intermedio'],['Peso muerto sumo','Barra','Intermedio'],['Hiperextensión enfocada a glúteo','Máquina','Intermedio']
  ],
  'Gemelo':[
    ['Elevación de talones de pie','Máquina','Básico'],['Elevación sentado','Máquina','Básico'],['Gemelo en prensa','Máquina','Básico'],['Elevación unilateral','Peso corporal','Básico'],['Donkey calf raise','Máquina','Intermedio'],['Elevación con pausa','Mancuernas','Intermedio']
  ],
  'Core':[
    ['Plancha frontal','Peso corporal','Básico'],['Crunch en polea','Polea','Básico'],['Elevación de piernas','Peso corporal','Básico'],['Dead bug','Peso corporal','Básico'],['Pallof press','Polea','Básico'],['Rueda abdominal','Rueda','Intermedio'],['Plancha lateral','Peso corporal','Intermedio'],['Farmer walk','Mancuernas','Intermedio']
  ]
};

const exerciseMedia = {
  'Press de banca con barra':'Barbell_Bench_Press_-_Medium_Grip','Press inclinado con mancuernas':'Incline_Dumbbell_Press','Press en máquina':'Machine_Bench_Press','Aperturas en polea':'Cable_Crossover','Flexiones':'Pushups','Fondos inclinados':'Dips_-_Chest_Version','Press declinado':'Decline_Barbell_Bench_Press','Press unilateral en polea':'One_Arm_Dumbbell_Bench_Press',
  'Dominadas':'Pullups','Jalón al pecho':'Wide-Grip_Lat_Pulldown','Remo con barra':'Bent_Over_Barbell_Row','Remo sentado':'Seated_Cable_Rows','Remo con mancuerna':'One-Arm_Dumbbell_Row','Pullover en polea':'Straight-Arm_Pulldown','Remo T':'T-Bar_Row_with_Handle','Dominada neutra lastrada':'Chin-Up',
  'Press militar':'Standing_Military_Press','Press con mancuernas':'Dumbbell_Shoulder_Press','Elevaciones laterales':'Side_Lateral_Raise','Pájaros':'Reverse_Flyes','Face pull':'Face_Pull','Elevación lateral en polea':'Cable_Seated_Lateral_Raise','Press Arnold':'Arnold_Dumbbell_Press','Remo al mentón amplio':'Upright_Cable_Row',
  'Curl con barra EZ':'EZ-Bar_Curl','Curl alterno':'Alternate_Incline_Dumbbell_Curl','Curl martillo':'Hammer_Curls','Curl en polea':'Standing_Biceps_Cable_Curl','Curl predicador':'Preacher_Curl','Curl inclinado':'Incline_Dumbbell_Curl','Curl bayesian':'High_Cable_Curls','Curl araña':'Spider_Curl',
  'Extensión con cuerda':'Triceps_Pushdown_-_Rope_Attachment','Press francés':'Lying_Triceps_Press','Fondos':'Dips_-_Triceps_Version','Extensión sobre cabeza':'Cable_Rope_Overhead_Triceps_Extension','Press banca cerrado':'Close-Grip_Barbell_Bench_Press','Extensión unilateral':'One_Arm_Supinated_Dumbbell_Triceps_Extension','Skull crushers':'Lying_Triceps_Press','JM press':'JM_Press',
  'Sentadilla trasera':'Barbell_Squat','Prensa de piernas':'Leg_Press','Extensión de cuádriceps':'Leg_Extensions','Zancadas':'Dumbbell_Lunges','Sentadilla goblet':'Goblet_Squat','Sentadilla búlgara':'Smith_Single-Leg_Split_Squat','Hack squat':'Hack_Squat','Sentadilla frontal':'Front_Barbell_Squat',
  'Peso muerto rumano':'Romanian_Deadlift','Curl femoral tumbado':'Lying_Leg_Curls','Curl femoral sentado':'Seated_Leg_Curl','Buenos días':'Good_Morning','Peso muerto rumano unilateral':'Kettlebell_One-Legged_Deadlift','Nordic curl':'Natural_Glute_Ham_Raise','Pull through':'Pull_Through','Glute ham raise':'Glute_Ham_Raise',
  'Hip thrust':'Barbell_Hip_Thrust','Puente de glúteo':'Butt_Lift_Bridge','Patada de glúteo':'Glute_Kickback','Abducción de cadera':'Thigh_Abductor','Step up':'Dumbbell_Step_Ups','Peso muerto sumo':'Sumo_Deadlift','Hiperextensión enfocada a glúteo':'Hyperextensions_Back_Extensions',
  'Elevación de talones de pie':'Standing_Calf_Raises','Elevación sentado':'Seated_Calf_Raise','Gemelo en prensa':'Calf_Press_On_The_Leg_Press_Machine','Elevación unilateral':'Rocking_Standing_Calf_Raise','Donkey calf raise':'Donkey_Calf_Raises','Elevación con pausa':'Standing_Dumbbell_Calf_Raise',
  'Plancha frontal':'Plank','Crunch en polea':'Cable_Crunch','Elevación de piernas':'Hanging_Leg_Raise','Dead bug':'Dead_Bug','Pallof press':'Pallof_Press','Rueda abdominal':'Ab_Roller','Plancha lateral':'Side_Bridge','Farmer walk':'Farmers_Walk'
};
function exerciseImagePaths(name){const id=exerciseMedia[name];return id?[`assets/free-exercise-db/exercises/${id}/0.jpg`,`assets/free-exercise-db/exercises/${id}/1.jpg`]:null;}

function exerciseLibraryModal(group='Pecho'){
  modal(`<span class="pill">BIBLIOTECA</span><h2 style="margin-top:14px">Ejercicios</h2><label>Buscar<input id="exerciseSearch" placeholder="Press, remo, curl..."></label><div class="tabs muscle-tabs">${Object.keys(exerciseLibrary).map(g=>`<button class="tab ${g===group?'active':''}" data-muscle="${g}">${g}</button>`).join('')}</div><div id="exerciseResults">${exerciseCards(group)}</div>`);
  document.querySelectorAll('[data-muscle]').forEach(b=>b.onclick=()=>{closeModal();exerciseLibraryModal(b.dataset.muscle);});
  document.querySelector('#exerciseSearch').oninput=e=>{const q=e.target.value.toLowerCase();const all=Object.entries(exerciseLibrary).flatMap(([g,xs])=>xs.map(x=>[...x,g])).filter(x=>x[0].toLowerCase().includes(q));document.querySelector('#exerciseResults').innerHTML=q?exerciseCardsFromList(all):exerciseCards(group);bindExerciseAdds();};
  bindExerciseAdds();
}
function exerciseCards(group){return exerciseCardsFromList(exerciseLibrary[group].map(x=>[...x,group]));}
function exerciseCardsFromList(list){return list.map(([name,equipment,level,group])=>`<article class="card exercise-option clickable" data-view-exercise="${name}" data-exercise-meta="${equipment}|${level}|${group}"><div class="demo-thumb">▶</div><div class="row-main"><span class="pill">${group.toUpperCase()}</span><h3>${name}</h3><p>${equipment} · ${level} · Ver demostración</p></div><button class="set-check" data-add-exercise="${name}">＋</button></article>`).join('')||'<p class="notice">No se encontraron ejercicios.</p>';}
function exerciseMotion(name){const n=name.toLowerCase();if(n.includes('sentadilla')||n.includes('prensa')||n.includes('zancada')||n.includes('step'))return'squat';if(n.includes('peso muerto')||n.includes('rumano')||n.includes('buenos días')||n.includes('hip thrust')||n.includes('puente'))return'hinge';if(n.includes('remo')||n.includes('jalón')||n.includes('dominada')||n.includes('face pull')||n.includes('pullover'))return'pull';if(n.includes('curl'))return'curl';if(n.includes('plancha')||n.includes('crunch')||n.includes('abdominal')||n.includes('dead bug')||n.includes('pallof'))return'core';if(n.includes('elevación lateral')||n.includes('pájaros'))return'lateral';return'press';}
function exerciseScene(name,equipment){const n=name.toLowerCase();if(n.includes('inclinado'))return'incline';if(n.includes('banca')||n.includes('skull')||n.includes('francés')||n.includes('pullover'))return'bench';if(n.includes('dominada')||n.includes('elevación de piernas'))return'hanging';if(n.includes('flexiones')||n.includes('plancha')||n.includes('dead bug')||n.includes('puente'))return'floor';if(n.includes('fondos'))return'dips';if(n.includes('sentado')||n.includes('sentada')||n.includes('predicador')||n.includes('prensa'))return'seated';if(equipment==='Máquina')return'machine';if(equipment==='Polea')return'cable';return'standing';}
function mannequinSvg(motion,name,equipment){
  const scene=exerciseScene(name,equipment);const floor='<rect x="20" y="190" width="220" height="4" rx="2" fill="#303746"/>';
  const standing=`<g class="body"><circle class="head" cx="130" cy="48" r="16"/><line class="torso" x1="130" y1="65" x2="130" y2="125"/><g class="arms"><line x1="130" y1="78" x2="94" y2="104"/><line x1="94" y1="104" x2="72" y2="82"/><line x1="130" y1="78" x2="166" y2="104"/><line x1="166" y1="104" x2="188" y2="82"/></g><g class="legs"><line x1="130" y1="125" x2="102" y2="158"/><line x1="102" y1="158" x2="92" y2="190"/><line x1="130" y1="125" x2="158" y2="158"/><line x1="158" y1="158" x2="168" y2="190"/></g></g>`;
  const lying=`<g class="apparatus"><rect x="55" y="142" width="150" height="10" rx="4"/><line x1="75" y1="152" x2="65" y2="190"/><line x1="185" y1="152" x2="195" y2="190"/></g><g class="body lying-body"><circle class="head" cx="73" cy="121" r="14"/><line class="torso" x1="88" y1="126" x2="145" y2="136"/><g class="arms"><line x1="105" y1="129" x2="105" y2="92"/><line x1="105" y1="92" x2="90" y2="72"/><line x1="125" y1="132" x2="125" y2="92"/><line x1="125" y1="92" x2="140" y2="72"/></g><g class="legs"><line x1="145" y1="136" x2="175" y2="153"/><line x1="175" y1="153" x2="178" y2="190"/></g></g><g class="weight lying-weight"><line x1="65" y1="70" x2="165" y2="70"/><rect x="58" y="58" width="7" height="24"/><rect x="165" y="58" width="7" height="24"/></g>`;
  const seated=`<g class="apparatus"><rect x="95" y="135" width="72" height="9" rx="4"/><line x1="103" y1="144" x2="95" y2="190"/><line x1="159" y1="144" x2="167" y2="190"/><rect x="92" y="62" width="9" height="78" rx="4"/></g><g class="body seated-body"><circle class="head" cx="125" cy="50" r="15"/><line class="torso" x1="122" y1="66" x2="130" y2="132"/><g class="arms"><line x1="123" y1="78" x2="158" y2="102"/><line x1="158" y1="102" x2="170" y2="78"/></g><g class="legs"><line x1="130" y1="132" x2="165" y2="148"/><line x1="165" y1="148" x2="185" y2="190"/></g></g>`;
  const horizontal=`<g class="body floor-body"><circle class="head" cx="62" cy="135" r="13"/><line class="torso" x1="76" y1="138" x2="145" y2="155"/><g class="arms"><line x1="86" y1="141" x2="78" y2="175"/><line x1="78" y1="175" x2="58" y2="190"/></g><g class="legs"><line x1="145" y1="155" x2="190" y2="178"/><line x1="190" y1="178" x2="213" y2="190"/></g></g>`;
  const hanging=`<g class="apparatus"><line x1="45" y1="35" x2="215" y2="35"/><line x1="55" y1="35" x2="55" y2="190"/><line x1="205" y1="35" x2="205" y2="190"/></g><g class="body hanging-body"><circle class="head" cx="130" cy="84" r="15"/><line class="torso" x1="130" y1="100" x2="130" y2="150"/><g class="arms"><line x1="125" y1="105" x2="100" y2="70"/><line x1="100" y1="70" x2="85" y2="35"/><line x1="135" y1="105" x2="160" y2="70"/><line x1="160" y1="70" x2="175" y2="35"/></g><g class="legs"><line x1="130" y1="150" x2="112" y2="188"/><line x1="130" y1="150" x2="148" y2="188"/></g></g>`;
  const apparatus=scene==='cable'?`<g class="apparatus"><rect x="32" y="28" width="22" height="162" rx="5"/><circle cx="43" cy="48" r="7"/><line x1="43" y1="48" x2="92" y2="100"/></g>`:scene==='machine'?`<g class="apparatus"><rect x="32" y="42" width="22" height="148" rx="5"/><rect x="194" y="42" width="22" height="148" rx="5"/><line x1="43" y1="60" x2="205" y2="60"/></g>`:scene==='dips'?`<g class="apparatus"><line x1="70" y1="105" x2="112" y2="105"/><line x1="148" y1="105" x2="190" y2="105"/><line x1="82" y1="105" x2="82" y2="190"/><line x1="178" y1="105" x2="178" y2="190"/></g>`:'';
  const figure=(scene==='bench'||scene==='incline')?lying:scene==='seated'?seated:scene==='floor'?horizontal:scene==='hanging'?hanging:standing;
  return `<svg class="exercise-demo motion-${motion} scene-${scene}" viewBox="0 0 260 220" role="img" aria-label="Demostración de ${name}">${floor}${apparatus}${figure}<text x="130" y="212" text-anchor="middle" class="scene-label">${name}</text></svg>`;
}
function exerciseDetailModal(name,meta){
  const [equipment,level,group]=meta.split('|');const motion=exerciseMotion(name);const paths=exerciseImagePaths(name);
  const demo=()=>paths?`<div class="real-exercise-demo"><img class="exercise-frame frame-start" src="${paths[0]}" alt="${name}: posición inicial"><img class="exercise-frame frame-end" src="${paths[1]}" alt="${name}: posición final"></div><span class="demo-finished">Demostración terminada</span>`:mannequinSvg(motion,name,equipment)+'<span class="demo-finished">Demostración provisional</span>';
  modal(`<span class="pill">${group.toUpperCase()}</span><h2 style="margin-top:14px">${name}</h2><div id="demoStage" class="demo-stage">${demo()}</div><div class="demo-controls"><button class="button secondary" id="showStart">Inicio</button><button class="button secondary" id="replayDemo">▶ Reproducir</button><button class="button secondary" id="showEnd">Final</button></div><div class="card" style="margin-top:12px"><div class="macro-line"><span>Material</span><b>${equipment}</b></div><div class="macro-line"><span>Nivel</span><b>${level}</b></div><div class="macro-line"><span>Grupo principal</span><b>${group}</b></div><div class="macro-line"><span>Demostración</span><b>${paths?'Base pública específica':'Provisional'}</b></div></div><h3>Puntos clave</h3><ul class="ingredient-list"><li>Empieza con una carga que puedas controlar.</li><li>Mantén el movimiento estable y sin rebotes.</li><li>Detente si notas dolor articular o una molestia aguda.</li></ul><p class="notice">Las imágenes muestran las posiciones inicial y final. La transición se reproduce una sola vez y no sustituye la supervisión de un profesional.</p><button class="button green wide" id="saveFromDetail">Guardar ejercicio</button>`);
  const stage=document.querySelector('#demoStage');const renderMode=mode=>{stage.innerHTML=demo();if(paths){const box=stage.querySelector('.real-exercise-demo');box.classList.add(mode);}};
  document.querySelector('#replayDemo').onclick=()=>renderMode('playing');document.querySelector('#showStart').onclick=()=>renderMode('show-start');document.querySelector('#showEnd').onclick=()=>renderMode('show-end');
  document.querySelector('#saveFromDetail').onclick=()=>{state.savedExercises||=[];if(!state.savedExercises.includes(name))state.savedExercises.push(name);save();document.querySelector('#saveFromDetail').textContent='✓ Guardado';};
}
function bindExerciseAdds(){document.querySelectorAll('[data-add-exercise]').forEach(b=>b.onclick=e=>{e.stopPropagation();state.savedExercises||=[];if(!state.savedExercises.includes(b.dataset.addExercise))state.savedExercises.push(b.dataset.addExercise);save();b.textContent='✓';b.classList.add('done');});document.querySelectorAll('[data-view-exercise]').forEach(card=>card.onclick=()=>exerciseDetailModal(card.dataset.viewExercise,card.dataset.exerciseMeta));}

const ingredientLibrary = {
  oats:['60 g de avena','200 g de yogur alto en proteína','100 g de frutos rojos','10 g de crema de cacahuete'],
  toast:['80 g de pan integral','2 huevos','70 g de aguacate','Tomate y especias'],
  chicken:['160 g de pechuga de pollo','90 g de arroz en seco','200 g de verduras','10 ml de aceite de oliva'],
  salmon:['170 g de salmón','300 g de patata','150 g de verduras','5 ml de aceite de oliva'],
  yogurt:['200 g de yogur o skyr','1 plátano','15 g de almendras','Canela'],
  shake:['250 ml de leche','35 g de avena','30 g de proteína','1 plátano y cacao'],
  tortilla:['3 huevos o 2 huevos y claras','Ensalada variada','60 g de pan integral','10 ml de aceite de oliva'],
  turkey:['170 g de pavo','80 g de cuscús en seco','Verduras mediterráneas','5 ml de aceite de oliva']
};

function smartIngredients(meal){
  if(ingredientLibrary[meal.id]) return ingredientLibrary[meal.id];
  const n=meal.name.toLowerCase();
  if(n.includes('pasta')||n.includes('noodles')) return ['90 g de pasta o noodles en seco','160 g de la fuente de proteína indicada','180 g de verduras','10 ml de aceite o salsa ligera'];
  if(n.includes('arroz')||n.includes('poke')||n.includes('risotto')) return ['85 g de arroz en seco','160 g de la fuente de proteína indicada','180 g de verduras','10 ml de aceite de oliva'];
  if(n.includes('tortilla')||n.includes('huevo')) return ['2 huevos y 150 g de claras','60 g de pan o cereal indicado','150 g de verduras','5 ml de aceite de oliva'];
  if(n.includes('yogur')||n.includes('skyr')||n.includes('mousse')) return ['200 g de yogur o skyr','1 pieza de fruta','20 g del complemento indicado','Canela o cacao al gusto'];
  if(n.includes('batido')||n.includes('smoothie')) return ['250 ml de leche o bebida vegetal','30 g de proteína','1 pieza de fruta','30 g de avena'];
  if(n.includes('ensalada')) return ['160 g de la proteína indicada','250 g de verduras variadas','60 g de cereal o legumbre','10 ml de aceite de oliva'];
  if(meal.type==='Merienda') return ['1 ración de la base indicada','1 pieza de fruta','Complementos según la receta','Canela o especias al gusto'];
  return ['160 g de la fuente de proteína indicada','250 g de verduras','70 g de cereal en seco o 250 g de patata','10 ml de aceite de oliva'];
}

function recipeModal(id){
  const m=meals.find(x=>x.id===id); if(!m) return;
  const ingredients=smartIngredients(m);
  modal(`<span class="pill">${m.type.toUpperCase()}</span><h2 style="margin-top:14px">${m.name}</h2>
    <div class="meal-summary"><div><strong id="rkcal">${m.kcal}</strong><small>KCAL</small></div><div><strong id="rp">${m.p} g</strong><small>PROTEÍNA</small></div><div><strong id="rc">${m.c} g</strong><small>CARBOS</small></div><div><strong id="rf">${m.f} g</strong><small>GRASA</small></div></div>
    <label>Raciones<select id="servings"><option value="0.5">½ ración</option><option value="1" selected>1 ración</option><option value="1.5">1½ raciones</option><option value="2">2 raciones</option></select></label>
    <h3>Ingredientes</h3><ul id="ingredientList" class="ingredient-list">${ingredients.map(x=>`<li>${x}</li>`).join('')}</ul>
    <h3>Preparación</h3><p class="notice">Prepara los ingredientes, cocina la fuente de proteína y el acompañamiento, añade las verduras y ajusta las especias. Pesa los alimentos en las mismas condiciones indicadas para mantener los macros.</p>
    <label>Añadir al plan semanal<select id="recipeDay">${weekDays.map(d=>`<option>${d}</option>`).join('')}</select></label>
    <div class="input-row"><button class="button secondary" id="favoriteRecipe">${state.favorites.includes(id)?'★ Favorito':'☆ Guardar'}</button><button class="button green" id="addRecipe">Añadir a la semana</button></div>`);
  const todayName=new Intl.DateTimeFormat('es-ES',{weekday:'long'}).format(new Date());
  const todayDay=weekDays.find(d=>d.toLowerCase()===todayName.toLowerCase()); if(todayDay)document.querySelector('#recipeDay').value=todayDay;
  const servings=document.querySelector('#servings');
  servings.onchange=()=>{const s=Number(servings.value);document.querySelector('#rkcal').textContent=Math.round(m.kcal*s);document.querySelector('#rp').textContent=Math.round(m.p*s)+' g';document.querySelector('#rc').textContent=Math.round(m.c*s)+' g';document.querySelector('#rf').textContent=Math.round(m.f*s)+' g';document.querySelector('#ingredientList').innerHTML=ingredients.map(x=>`<li>${s===1?x:`${x} × ${s}`}</li>`).join('');};
  document.querySelector('#favoriteRecipe').onclick=()=>{state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];save();closeModal();recipeModal(id);};
  document.querySelector('#addRecipe').onclick=()=>{const day=document.querySelector('#recipeDay').value;state.weekPlan[day]=state.weekPlan[day].filter(mid=>meals.find(x=>x.id===mid)?.type!==m.type);state.weekPlan[day].push(id);if(day===todayDay){state.meals=[...state.weekPlan[day]];}save();closeModal();weeklyPlanModal();};
}

function weeklyPlanModal(){
  modal(`<span class="pill">PLAN SEMANAL</span><h2 style="margin-top:14px">Tu semana</h2><p>Al añadir recetas aquí, sus ingredientes pasan automáticamente a la lista de la compra.</p>${weekDays.map(day=>{const selected=(state.weekPlan[day]||[]).map(id=>meals.find(m=>m.id===id)).filter(Boolean);const kcal=selected.reduce((s,m)=>s+m.kcal,0);return `<div class="card weekly-day"><div class="plan-top"><div><h3>${day}</h3><p>${selected.length?selected.map(m=>m.type).join(' · '):'Sin comidas todavía'}</p></div><b>${kcal||'—'}${kcal?' kcal':''}</b></div>${selected.map(m=>`<div class="macro-line"><span>${m.name}</span><button class="mini-remove" data-week-remove="${day}|${m.id}">×</button></div>`).join('')}<button class="tab" data-add-week-day="${day}">＋ Añadir receta</button></div>`;}).join('')}<button class="button green wide" data-week-grocery>Generar lista semanal</button>`);
  document.querySelectorAll('[data-week-remove]').forEach(b=>b.onclick=()=>{const [day,id]=b.dataset.weekRemove.split('|');state.weekPlan[day]=state.weekPlan[day].filter(x=>x!==id);save();closeModal();weeklyPlanModal();});
  document.querySelectorAll('[data-add-week-day]').forEach(b=>b.onclick=()=>{closeModal();nutrition('Todos');setTimeout(()=>{},0);});
  document.querySelector('[data-week-grocery]').onclick=()=>{closeModal();groceryModal();};
}

function nutritionTargets(weight,height,age,sex){const bmr=10*weight+6.25*height-5*age+(sex==='hombre'?5:sex==='mujer'?-161:-78);const maintenance=Math.round((bmr*1.45)/50)*50;return [{name:'Mantenimiento',kcal:maintenance,p:Math.round(weight*1.6),c:Math.round((maintenance-weight*1.6*4-maintenance*.28)/4),f:Math.round(maintenance*.28/9)},{name:'Definicion',kcal:maintenance-300,p:Math.round(weight*1.8),c:Math.round((maintenance-300-weight*1.8*4-(maintenance-300)*.28)/4),f:Math.round((maintenance-300)*.28/9)},{name:'Volumen',kcal:maintenance+300,p:Math.round(weight*1.6),c:Math.round((maintenance+300-weight*1.6*4-(maintenance+300)*.28)/4),f:Math.round((maintenance+300)*.28/9)}];}
function targetTable(weight,height,age,sex){return nutritionTargets(weight,height,age,sex).map(x=>`<div class="macro-line"><span>${x.name}<small>${x.kcal} kcal</small></span><b>${x.p}P · ${x.c}C · ${x.f}G</b></div>`).join('');}
function profileModal(firstRun=false){
  const p=state.profile;
  modal(`<h2>${firstRun?'Configura FitBloq':'Tu perfil'}</h2><p>Personaliza las recomendaciones. Todo seguirá siendo editable.</p>
    <label>Nombre<input id="pName" value="${p.name}" placeholder="Tu nombre"></label>
    <div class="input-row"><label>Edad<input id="pAge" type="number" value="${p.age}"></label><label>Altura (cm)<input id="pHeight" type="number" value="${p.height}"></label></div>
    <div class="input-row"><label>Peso (kg)<input id="pWeight" type="number" step="0.1" value="${state.weight}"></label><label>Sexo<select id="pSex"><option ${p.sex==='hombre'?'selected':''}>hombre</option><option ${p.sex==='mujer'?'selected':''}>mujer</option><option ${p.sex==='otro'?'selected':''}>otro</option></select></label></div>
    <label>Objetivo<select id="pGoal"><option>Definición</option><option>Mantenimiento</option><option>Volumen</option></select></label>
    <div class="input-row"><label>Nivel<select id="pLevel"><option>Principiante</option><option>Intermedio</option><option>Avanzado</option></select></label><label>Días por semana<input id="pDays" type="number" min="2" max="7" value="${p.days}"></label></div>
    <button class="button green wide" id="saveProfile">Guardar y calcular objetivo</button>`);
  document.querySelector('#pGoal').insertAdjacentHTML('beforebegin',`<div class="card"><span class="green-text">ESTIMACION INICIAL</span><p>Valores orientativos segun tus datos actuales:</p>${targetTable(state.weight,p.height,p.age,p.sex)}</div>`);document.querySelector('#pGoal').value=p.goal; document.querySelector('#pLevel').value=p.level;
  document.querySelector('#saveProfile').onclick=()=>{const sex=document.querySelector('#pSex').value;const w=Number(document.querySelector('#pWeight').value);const h=Number(document.querySelector('#pHeight').value);const a=Number(document.querySelector('#pAge').value);let bmr=10*w+6.25*h-5*a+(sex==='hombre'?5:sex==='mujer'?-161:-78);const goal=document.querySelector('#pGoal').value;state.calories=Math.round((bmr*1.45+(goal==='Volumen'?300:goal==='Definición'?-300:0))/100)*100;state.weight=w;state.profile={name:document.querySelector('#pName').value.trim(),age:a,height:h,sex,goal,level:document.querySelector('#pLevel').value,days:Number(document.querySelector('#pDays').value),configured:true};state.weightHistory.push({date:new Date().toLocaleDateString('es-ES'),value:w});save();closeModal();home();};
}

let restTimer=null;
function startRest(seconds){ clearInterval(restTimer); let left=seconds; const el=document.querySelector('#restTimer'); if(!el)return; el.textContent=`Descanso ${left}s`; restTimer=setInterval(()=>{left--;el.textContent=left>0?`Descanso ${left}s`:'¡Siguiente serie!';if(left<=0){clearInterval(restTimer);if(state.settings.vibration&&navigator.vibrate)navigator.vibrate([150,100,150]);}},1000); }

startStrength = function(sessionName='Torso A'){
  const session=exerciseSessions[sessionName]||exerciseSessions['Torso A'];
  modal(`<span class="pill">FUERZA</span><h2 style="margin-top:14px">${sessionName}</h2><div id="restTimer" class="notice" style="text-align:center">Registra cada serie</div>
    <div class="exercise-list">${session.map((e,ei)=>`<div class="card exercise-card"><h3>${e.name}</h3><p>Objetivo: ${e.sets} × ${e.reps} · descanso ${e.rest}s</p>${Array.from({length:e.sets},(_,si)=>`<div class="set-row"><b>${si+1}</b><label>kg<input inputmode="decimal" data-weight value="${e.weight}"></label><label>reps<input inputmode="numeric" data-reps value="${e.reps}"></label><button class="set-check" data-rest="${e.rest}">✓</button></div>`).join('')}</div>`).join('')}</div>
    <label>Esfuerzo final (RIR)<select id="workoutRir"><option value="3">3 · Fácil</option><option value="2" selected>2 · Correcto</option><option value="1">1 · Duro</option><option value="0">0 · Al límite</option></select></label>
    <button class="button green wide" id="finishWorkout">Completar sesión</button>`);
  document.querySelectorAll('.set-check').forEach(b=>b.onclick=()=>{b.classList.toggle('done');if(b.classList.contains('done'))startRest(Number(b.dataset.rest));});
  document.querySelector('#finishWorkout').onclick=()=>{const completed=document.querySelectorAll('.set-check.done').length;const total=document.querySelectorAll('.set-check').length;state.workoutLogs.push({type:'Fuerza',name:sessionName,date:new Date().toLocaleDateString('es-ES'),detail:`${completed}/${total} series · RIR ${document.querySelector('#workoutRir').value}`});save();clearInterval(restTimer);closeModal();training('history');};
};

function routineBuilder(){
  modal(`<h2>Crea tu rutina</h2><label>Nombre<input id="routineName" placeholder="Mi rutina"></label><label>Días<select id="routineDays"><option>3</option><option selected>4</option><option>5</option><option>6</option></select></label><h3>Bloques disponibles</h3><div class="card"><label><input type="checkbox" value="Torso" checked> Torso</label><label><input type="checkbox" value="Pierna" checked> Pierna</label><label><input type="checkbox" value="Full body"> Full body</label><label><input type="checkbox" value="Cardio"> Cardio final</label></div><button class="button green wide" id="saveRoutine">Guardar rutina</button>`);
  document.querySelector('#saveRoutine').onclick=()=>{const name=document.querySelector('#routineName').value.trim()||'Mi rutina';strengthPlans.unshift({name,meta:`${document.querySelector('#routineDays').value} días · Personalizada`,pct:0,tag:'MI RUTINA'});closeModal();training();};
}

let runInterval=null, runSeconds=0, runMode='Correr', runRound=1, watchId=null, runDistance=0, lastPoint=null;
function distanceMeters(a,b){const R=6371e3;const p1=a.lat*Math.PI/180,p2=b.lat*Math.PI/180,dp=(b.lat-a.lat)*Math.PI/180,dl=(b.lon-a.lon)*Math.PI/180;const q=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2;return 2*R*Math.atan2(Math.sqrt(q),Math.sqrt(1-q));}
startRun = function(){
  runSeconds=0;runMode='Correr';runRound=1;runDistance=0;lastPoint=null;
  modal(`<span class="pill">RUNNING</span><h2 style="margin-top:14px">CaCo · Semana ${state.runWeek}</h2><div class="metric run-clock" id="runClock">00:00</div><p id="runMode" class="run-mode">LISTO</p><div class="grid"><div class="card"><small>DISTANCIA</small><div class="metric" id="runDistance">0.00 km</div></div><div class="card"><small>RONDA</small><div class="metric" id="runRound">1 / 8</div></div></div><p id="gpsStatus" class="notice">El GPS se activará si el navegador y los permisos lo permiten.</p><div class="input-row"><button class="button green" id="toggleRun">Empezar</button><button class="button secondary" id="finishRun">Finalizar</button></div>`);
  document.querySelector('#toggleRun').onclick=e=>{if(runInterval){clearInterval(runInterval);runInterval=null;e.target.textContent='Continuar';document.querySelector('#runMode').textContent='PAUSA';return;}e.target.textContent='Pausar';document.querySelector('#runMode').textContent=runMode.toUpperCase();runInterval=setInterval(()=>{runSeconds++;const cycle=runSeconds%180;if(cycle===120){runMode='Caminar';document.querySelector('#runMode').textContent='CAMINAR';}if(cycle===0){runMode='Correr';runRound=Math.min(8,runRound+1);document.querySelector('#runMode').textContent='CORRER';document.querySelector('#runRound').textContent=`${runRound} / 8`;}document.querySelector('#runClock').textContent=`${String(Math.floor(runSeconds/60)).padStart(2,'0')}:${String(runSeconds%60).padStart(2,'0')}`;},1000);
    if(navigator.geolocation&&!watchId)watchId=navigator.geolocation.watchPosition(pos=>{const point={lat:pos.coords.latitude,lon:pos.coords.longitude};if(lastPoint)runDistance+=distanceMeters(lastPoint,point);lastPoint=point;document.querySelector('#runDistance').textContent=(runDistance/1000).toFixed(2)+' km';document.querySelector('#gpsStatus').textContent='GPS activo · precisión '+Math.round(pos.coords.accuracy)+' m';},()=>{document.querySelector('#gpsStatus').textContent='GPS no disponible aquí. Funcionará desde HTTPS o la app instalada.';},{enableHighAccuracy:true});};
  document.querySelector('#finishRun').onclick=()=>{clearInterval(runInterval);runInterval=null;if(watchId!==null&&navigator.geolocation)navigator.geolocation.clearWatch(watchId);watchId=null;const km=runDistance/1000;state.workoutLogs.push({type:'Running',name:'CaCo · Semana '+state.runWeek,date:new Date().toLocaleDateString('es-ES'),detail:`${Math.floor(runSeconds/60)} min · ${km.toFixed(2)} km`});state.runWeek=Math.min(8,state.runWeek+1);save();closeModal();training('history');};
};

const smartShopCatalog = {
  'Pechuga de pollo': {qty:1.2, prices:{Mercadona:[7.15,4.2],Carrefour:[7.35,4.1],DIA:[6.99,3.9],Alcampo:[7.05,4.0],Esclat:[7.75,4.5],Lidl:[6.85,4.0]}},
  'Arroz': {qty:1, prices:{Mercadona:[1.35,4.1],Carrefour:[1.20,3.9],DIA:[1.25,3.8],Alcampo:[1.18,3.8],Esclat:[1.42,4.2],Lidl:[1.29,3.9]}},
  'Avena': {qty:0.5, prices:{Mercadona:[1.70,4.1],Carrefour:[1.78,4.0],DIA:[1.62,3.8],Alcampo:[1.69,3.9],Esclat:[1.95,4.3],Lidl:[1.55,4.0]}},
  'Huevos': {qty:1, unit:'docena', prices:{Mercadona:[2.65,4.2],Carrefour:[2.79,4.1],DIA:[2.59,3.9],Alcampo:[2.55,4.0],Esclat:[2.95,4.5],Lidl:[2.49,4.0]}},
  'Yogur alto en proteína': {qty:1, prices:{Mercadona:[4.10,4.4],Carrefour:[4.35,4.2],DIA:[3.58,4.0],Alcampo:[3.95,4.1],Esclat:[4.60,4.5],Lidl:[3.75,4.2]}},
  'Verdura variada': {qty:2, prices:{Mercadona:[2.35,4.2],Carrefour:[2.25,4.0],DIA:[2.15,3.9],Alcampo:[2.10,4.0],Esclat:[2.69,4.7],Lidl:[1.99,4.1]}},
  'Fruta variada': {qty:2, prices:{Mercadona:[2.20,4.2],Carrefour:[2.15,4.0],DIA:[2.05,3.9],Alcampo:[2.10,4.0],Esclat:[2.49,4.6],Lidl:[1.95,4.1]}},
  'Patata o boniato': {qty:1.5, prices:{Mercadona:[1.65,4.1],Carrefour:[1.55,4.0],DIA:[1.49,3.9],Alcampo:[1.45,3.9],Esclat:[1.80,4.4],Lidl:[1.39,4.0]}},
  'Pescado': {qty:0.8, prices:{Mercadona:[11.90,4.3],Carrefour:[11.60,4.2],DIA:[10.95,3.9],Alcampo:[11.20,4.1],Esclat:[12.40,4.6],Lidl:[10.75,4.0]}},
  'Pan integral': {qty:0.6, prices:{Mercadona:[2.25,4.1],Carrefour:[2.15,4.0],DIA:[2.05,3.9],Alcampo:[2.10,4.0],Esclat:[2.55,4.4],Lidl:[1.95,4.1]}}
};
const smartStores=['Mercadona','Carrefour','DIA','Alcampo','Esclat','Lidl'];

function smartShopModal(){
  const items=Object.entries(smartShopCatalog);
  const totals=Object.fromEntries(smartStores.map(s=>[s,items.reduce((sum,[,d])=>sum+d.qty*d.prices[s][0],0)]));
  const cheapestStore=smartStores.reduce((a,b)=>totals[a]<totals[b]?a:b);
  const mixedTotal=items.reduce((sum,[,d])=>sum+Math.min(...smartStores.map(s=>d.prices[s][0]))*d.qty,0);
  modal(`<span class="pill">COMPRA INTELIGENTE</span><h2 style="margin-top:14px">Comparador semanal</h2>
    <label>Código postal<input id="shopPostcode" inputmode="numeric" maxlength="5" placeholder="Ej. 08001" value="${state.shopPostcode||''}"></label>
    <div class="card"><div class="macro-line"><span>Supermercado más económico</span><b class="green-text">${cheapestStore}</b></div><div class="macro-line"><span>Cesta estimada</span><b>${totals[cheapestStore].toFixed(2)} €</b></div><div class="macro-line"><span>Combinando tiendas</span><b>${mixedTotal.toFixed(2)} €</b></div></div>
    <div class="section-head"><h2>Producto por producto</h2></div>
    ${items.map(([name,d])=>{const cheapest=smartStores.reduce((a,b)=>d.prices[a][0]<d.prices[b][0]?a:b);const value=smartStores.reduce((a,b)=>(d.prices[a][1]/d.prices[a][0])>(d.prices[b][1]/d.prices[b][0])?a:b);return `<div class="card comparison-row"><div><h3>${name}</h3><p>${d.qty} ${d.unit||'kg'} para la semana</p></div><div><small>MEJOR PRECIO</small><b>${cheapest} · ${d.prices[cheapest][0].toFixed(2)} €/${d.unit||'kg'}</b><small>CALIDAD-PRECIO</small><b>${value}</b></div><details><summary>Ver los 6 precios</summary>${smartStores.map(s=>`<div class="macro-line"><span>${s}</span><b>${d.prices[s][0].toFixed(2)} €/${d.unit||'kg'} · ${d.prices[s][1]}/5</b></div>`).join('')}</details></div>`;}).join('')}
    <p class="notice">Versión de demostración. Los precios y valoraciones son orientativos, no están actualizados en tiempo real. El código postal, las promociones, las marcas y las tarjetas de socio pueden cambiar el resultado.</p>
    <div class="input-row"><button class="button secondary" id="nearbyStores">Ver supers cercanos</button><button class="button green" id="savePostcode">Guardar zona</button></div>`);
  document.querySelector('#savePostcode').onclick=()=>{state.shopPostcode=document.querySelector('#shopPostcode').value.trim();save();document.querySelector('#savePostcode').textContent='✓ Zona guardada';};
  document.querySelector('#nearbyStores').onclick=()=>{closeModal();nearbyStoresModal();};
}

function nearbyStoresModal(){
  modal(`<span class="pill">CERCA DE TI</span><h2 style="margin-top:14px">Supermercados en el mapa</h2><p id="locationStatus" class="notice">Mostraremos en un único mapa las tiendas compatibles situadas a menos de 10 km.</p><button class="button green wide" id="useLocation">Detectar ubicación y tiendas</button><div id="storesMap" class="stores-map"></div><div id="nearbyResults"></div>`);
  document.querySelector('#useLocation').onclick=()=>{const status=document.querySelector('#locationStatus');if(!navigator.geolocation){status.textContent='Este dispositivo no permite obtener la ubicación.';return;}status.textContent='Buscando ubicación…';navigator.geolocation.getCurrentPosition(async pos=>{const {latitude:lat,longitude:lon}=pos.coords;status.textContent='Buscando supermercados en OpenStreetMap…';try{const query=`[out:json][timeout:20];nwr(around:10000,${lat},${lon})[shop=supermarket];out center tags;`;const response=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:'data='+encodeURIComponent(query),headers:{'Content-Type':'application/x-www-form-urlencoded'}});if(!response.ok)throw new Error('search');const data=await response.json();const aliases={Mercadona:/mercadona/i,Carrefour:/carrefour/i,DIA:/\bdia\b/i,Alcampo:/alcampo|auchan/i,Esclat:/esclat|bonpreu/i,Lidl:/lidl/i};const stores=data.elements.map(x=>{const name=x.tags?.name||x.tags?.brand||x.tags?.operator||'';const chain=Object.keys(aliases).find(k=>aliases[k].test(name));const slat=x.lat??x.center?.lat,slon=x.lon??x.center?.lon;if(!chain||slat==null||slon==null)return null;return{chain,name:name||chain,lat:slat,lon:slon,km:distanceMeters({lat,lon},{lat:slat,lon:slon})/1000};}).filter(Boolean).sort((a,b)=>a.km-b.km);renderStoresMap(lat,lon,stores);status.textContent=stores.length?`${stores.length} supermercados encontrados en un radio de 10 km.`:'No encontramos tiendas compatibles en OpenStreetMap dentro de 10 km.';}catch{status.textContent='No se pudo consultar el mapa en este momento. Comprueba la conexión y vuelve a intentarlo.';}},()=>{status.textContent='No se pudo acceder a la ubicación. Revisa el permiso de localización.';},{enableHighAccuracy:true,timeout:12000});};
}
function escapeStoreText(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderStoresMap(lat,lon,stores){const mapEl=document.querySelector('#storesMap'),listEl=document.querySelector('#nearbyResults');mapEl.classList.add('visible');if(typeof L==='undefined'){mapEl.innerHTML='<p class="notice">No se pudo cargar el mapa.</p>';return;}const map=L.map(mapEl).setView([lat,lon],13);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);const colors={Mercadona:'#18a957',Carrefour:'#2374e1',DIA:'#e63b35',Alcampo:'#e74c3c',Esclat:'#f39c12',Lidl:'#1756a9'};L.circleMarker([lat,lon],{radius:8,color:'#fff',weight:3,fillColor:'#8b5cf6',fillOpacity:1}).addTo(map).bindPopup('Tu ubicación');const bounds=[[lat,lon]];stores.forEach(s=>{bounds.push([s.lat,s.lon]);L.circleMarker([s.lat,s.lon],{radius:9,color:'#fff',weight:2,fillColor:colors[s.chain],fillOpacity:1}).addTo(map).bindPopup(`<b>${escapeStoreText(s.name)}</b><br>${s.km.toFixed(1)} km`);});if(bounds.length>1)map.fitBounds(bounds,{padding:[28,28],maxZoom:15});setTimeout(()=>map.invalidateSize(),80);listEl.innerHTML=`<div class="nearby-list">${stores.map(s=>`<article class="card store-result"><span class="store-dot" style="background:${colors[s.chain]}"></span><div class="row-main"><h3>${escapeStoreText(s.name)} (${s.km.toFixed(1)} km)</h3><p>${s.chain} · distancia en línea recta</p></div><a href="https://maps.apple.com/?daddr=${s.lat},${s.lon}" target="_blank">Ruta</a></article>`).join('')}</div>`;}

function groceryModal(){
  const weekIds=weekDays.flatMap(day=>state.weekPlan[day]||[]);
  const sourceIds=weekIds.length?weekIds:state.meals;
  const selected=sourceIds.map(id=>meals.find(m=>m.id===id)).filter(Boolean);
  const grouped={};selected.forEach(m=>smartIngredients(m).forEach(x=>{const key=x.toLowerCase();grouped[key]||={text:x,count:0,recipes:[]};grouped[key].count++;if(!grouped[key].recipes.includes(m.name))grouped[key].recipes.push(m.name);}));
  const lines=Object.values(grouped).map(x=>`${x.count>1?x.count+' × ':''}${x.text} — ${x.recipes.join(', ')}`);
  modal(`<h2>Lista de la compra ${weekIds.length?'semanal':'de hoy'}</h2><p>${selected.length} recetas incluidas · los ingredientes repetidos están agrupados.</p>${lines.length?`<div class="shopping-list">${lines.map(x=>`<label><input type="checkbox"> <span>${x}</span></label>`).join('')}</div>`:'<p class="notice">Añade comidas al plan semanal para generar la lista.</p>'}<div class="input-row"><button class="button secondary" id="copyList">Copiar lista</button><button class="button green" id="compareStores">Comparar supers</button></div>`);
  document.querySelector('#copyList').onclick=async()=>{try{await navigator.clipboard.writeText(lines.join('\n'));document.querySelector('#copyList').textContent='✓ Lista copiada';}catch{document.querySelector('#copyList').textContent='No se pudo copiar';}};
  document.querySelector('#compareStores').onclick=()=>{closeModal();smartShopModal();};
}

function photoMealModal(){
  modal(`<span class="pill">CÁMARA</span><h2 style="margin-top:14px">Registrar un plato</h2><label class="card photo-upload">📷 Hacer o elegir fotografía<input id="mealPhoto" type="file" accept="image/*" capture="environment" hidden></label><div id="mealPhotoPreview"></div><p class="notice">En esta beta la fotografía no calcula macros automáticamente. Confirma los alimentos y cantidades para evitar estimaciones falsas.</p><label>Nombre del plato<input id="customMealName" placeholder="Ej. Pasta con pollo"></label><label>Tipo<select id="customMealType"><option>Desayuno</option><option>Comida</option><option>Merienda</option><option>Cena</option></select></label><div class="input-row"><label>Calorías<input id="customKcal" type="number" value="500"></label><label>Proteína (g)<input id="customProtein" type="number" value="30"></label></div><div class="input-row"><label>Carbohidratos (g)<input id="customCarbs" type="number" value="50"></label><label>Grasas (g)<input id="customFat" type="number" value="15"></label></div><button class="button green wide" id="saveCustomMeal">Guardar plato</button>`);
  document.querySelector('#mealPhoto').onchange=e=>{const file=e.target.files?.[0];if(file)document.querySelector('#mealPhotoPreview').innerHTML=`<img class="meal-photo-preview" src="${URL.createObjectURL(file)}" alt="Fotografía del plato">`;};
  document.querySelector('#saveCustomMeal').onclick=()=>{const name=document.querySelector('#customMealName').value.trim();if(!name)return;const item={id:'custom_'+Date.now(),type:document.querySelector('#customMealType').value,name,kcal:Number(document.querySelector('#customKcal').value),p:Number(document.querySelector('#customProtein').value),c:Number(document.querySelector('#customCarbs').value),f:Number(document.querySelector('#customFat').value),time:'Personalizado'};state.customMeals.push(item);meals.push(item);state.meals=state.meals.filter(id=>meals.find(x=>x.id===id)?.type!==item.type);state.meals.push(item.id);save();closeModal();nutrition();};
}

function supplementsModal(){
  const options=[['Proteína en polvo','Solo si ayuda a alcanzar la proteína diaria'],['Creatina monohidrato','Suplemento opcional; revisar tolerancia y situación personal'],['Cafeína','Puede afectar al sueño, ansiedad o tensión arterial'],['Omega 3','Valorar primero el consumo habitual de pescado'],['Vitaminas y minerales','No añadir sin detectar una necesidad concreta']];
  modal(`<span class="pill">OPCIONAL</span><h2 style="margin-top:14px">Mis suplementos</h2><p>FitBloq no añadirá suplementos automáticamente ni favorecerá una marca por pagar más.</p>${options.map(([name,note])=>`<article class="card supplement-row"><div class="row-main"><h3>${name}</h3><p>${note}</p></div><button class="set-check ${state.supplements.includes(name)?'done':''}" data-supplement="${name}">${state.supplements.includes(name)?'✓':'＋'}</button></article>`).join('')}<p class="notice">Los suplementos no sustituyen una dieta adecuada. Si tomas medicación, tienes una enfermedad, estás embarazada o existen dudas, consulta con un profesional sanitario.</p>`);
  document.querySelectorAll('[data-supplement]').forEach(b=>b.onclick=()=>{const name=b.dataset.supplement;state.supplements=state.supplements.includes(name)?state.supplements.filter(x=>x!==name):[...state.supplements,name];save();closeModal();supplementsModal();});
}

supplementsModal=function(){
  const selected=state.meals.map(id=>meals.find(x=>x.id===id)).filter(Boolean);const protein=selected.reduce((s,m)=>s+m.p,0);const fish=selected.filter(m=>/pescado|salmon|atun|sardina|caballa/i.test(`${m.name} ${smartIngredients(m).join(' ')}`)).length;const target=Math.max(80,Math.round((state.weight||70)*1.2));
  const rec=[];if(protein<target)rec.push(['Proteina en polvo',`Tu dieta aporta ${Math.round(protein)} g y el objetivo orientativo es ${target} g. Puede ayudar por comodidad, pero tambien puedes completarlo con alimentos.`]);if(fish<2)rec.push(['Omega 3',`Hay pocas comidas con pescado azul (${fish}). Prioriza pescado; el suplemento solo tiene sentido si no llegas de forma habitual o un profesional lo indica.`]);rec.push(['Creatina monohidrato','Tiene buena evidencia para fuerza y rendimiento en muchos adultos sanos. No es necesaria para todo el mundo ni sustituye entrenar, comer y dormir bien.']);
  const other=[['Cafeina','Puede ayudar al rendimiento, pero puede empeorar el sueno, la ansiedad o la tension arterial.'],['Vitaminas y minerales','No anadirlos sin una necesidad concreta o indicacion profesional.']];const card=([n,t])=>`<article class="card supplement-row"><div class="row-main"><h3>${n}</h3><p>${t}</p></div><button class="set-check ${state.supplements.includes(n)?'done':''}" data-supplement="${n}">${state.supplements.includes(n)?'OK':'+'}</button></article>`;
  modal(`<span class="pill">RECOMENDACIONES</span><h2 style="margin-top:14px">Suplementos para ti</h2><p>Analizamos tus comidas y explicamos el motivo. No anadimos nada automaticamente ni priorizamos marcas.</p><h3>Segun tu dieta</h3>${rec.map(card).join('')}<h3>Otras opciones</h3>${other.map(card).join('')}<p class="notice">Orientacion general, no diagnostico. Si tomas medicacion, tienes una enfermedad renal o hepatica, estas embarazada o tienes dudas, consulta con un profesional sanitario.</p>`);document.querySelectorAll('[data-supplement]').forEach(b=>b.onclick=()=>{const n=b.dataset.supplement;state.supplements=state.supplements.includes(n)?state.supplements.filter(x=>x!==n):[...state.supplements,n];save();closeModal();supplementsModal();});
};
const baseMealCard=mealCard;
mealCard=function(m){return baseMealCard(m).replace('<article class="card plan-card clickable"',`<article class="card plan-card clickable" data-recipe="${m.id}"`);};

// Constructor rápido para comidas fuera de las recetas cerradas.
const quickFoods=[
  ['Pan (blanco o integral)',265,9,49,3.2],['Huevo',143,12.6,0.7,9.5],['Pasta seca',350,12.5,70,1.5],['Arroz seco',360,7,79,0.7],
  ['Tomate',18,0.9,3.9,0.2],['Pechuga de pollo',110,23,0,1.5],['Atún al natural',116,26,0,1],['Aceite de oliva',884,0,0,100],
  ['Avena',389,16.9,66,6.9],['Leche semidesnatada',47,3.3,4.8,1.6],['Plátano',89,1.1,23,0.3],['Yogur natural',61,3.5,4.7,3.3]
];
function quickFoodRow(i=0){return `<div class="quick-food-row" data-food-row><select data-food>${quickFoods.map((f,j)=>`<option value="${j}">${f[0]}</option>`).join('')}</select><label>g<input data-food-qty type="number" min="0" step="1" value="${i?80:100}"></label><button class="mini-remove" data-remove-food type="button">×</button></div>`;}
function quickMealModal(type){
  modal(`<span class="pill">${type.toUpperCase()}</span><h2 style="margin-top:14px">Añadir comida</h2><p>Introduce alimentos y cantidades. Los valores son orientativos por 100 g y se calculan al momento.</p><div id="quickFoodRows">${quickFoodRow()}</div><button class="tab" id="addFoodRow">＋ Añadir alimento</button><div class="meal-summary quick-totals"><div><strong id="qKcal">0</strong><small>KCAL</small></div><div><strong id="qP">0 g</strong><small>PROTEÍNA</small></div><div><strong id="qC">0 g</strong><small>CARBOS</small></div><div><strong id="qF">0 g</strong><small>GRASA</small></div></div><label>Nombre de la comida<input id="quickName" placeholder="Ej. Bocadillo y tortilla francesa"></label><button class="button green wide" id="saveQuickMeal">Guardar en ${type}</button>`);
  const rows=()=>[...document.querySelectorAll('[data-food-row]')];
  const recalc=()=>{let t=[0,0,0,0];rows().forEach(r=>{const f=quickFoods[Number(r.querySelector('[data-food]').value)],g=Math.max(0,Number(r.querySelector('[data-food-qty]').value)||0)/100;t[0]+=f[1]*g;t[1]+=f[2]*g;t[2]+=f[3]*g;t[3]+=f[4]*g;});['qKcal','qP','qC','qF'].forEach((id,i)=>document.querySelector('#'+id).textContent=i?t[i].toFixed(1)+' g':Math.round(t[i]));};
  document.querySelector('#addFoodRow').onclick=()=>{document.querySelector('#quickFoodRows').insertAdjacentHTML('beforeend',quickFoodRow(rows().length));bindRows();recalc();};
  function bindRows(){rows().forEach(r=>{r.querySelector('[data-food]').onchange=recalc;r.querySelector('[data-food-qty]').oninput=recalc;r.querySelector('[data-remove-food]').onclick=()=>{if(rows().length>1){r.remove();recalc();}};});}
  bindRows();recalc();
  document.querySelector('#saveQuickMeal').onclick=()=>{const rs=rows();let t=[0,0,0,0],parts=[];rs.forEach(r=>{const f=quickFoods[Number(r.querySelector('[data-food]').value)],g=Math.max(0,Number(r.querySelector('[data-food-qty]').value)||0);t[0]+=f[1]*g/100;t[1]+=f[2]*g/100;t[2]+=f[3]*g/100;t[3]+=f[4]*g/100;parts.push(`${g} g ${f[0].toLowerCase()}`);});const name=document.querySelector('#quickName').value.trim()||parts.join(', ');const item={id:'quick_'+Date.now(),type,name,kcal:Math.round(t[0]),p:Number(t[1].toFixed(1)),c:Number(t[2].toFixed(1)),f:Number(t[3].toFixed(1)),time:'Personalizada'};state.customMeals.push(item);meals.push(item);state.meals.push(item.id);save();closeModal();nutrition(type);};
}
const baseMealSlot=mealSlot;
mealSlot=function(type){const html=baseMealSlot(type);return html.replaceAll('</article>',`<button class="tab quick-add" data-quick-add="${type}">＋ Añadir comida</button></article>`);};
const baseNutritionDay=nutritionDay;
nutritionDay=function(filter){return `<div class="weekly-actions"><button class="button secondary" data-week-plan>Plan semanal</button><button class="button secondary" data-grocery>Lista de compra</button><button class="button secondary" data-photo-meal>📷 Fotografiar plato</button><button class="button secondary" data-supplements>Suplementos (${state.supplements.length})</button><button class="button secondary" data-favorites>★ Favoritos (${state.favorites.length})</button></div>`+baseNutritionDay(filter);};
const baseStrengthView=strengthView;
const trainingFolders={Volumen:['Torso A','Pierna A','Push · Pecho y tríceps','Pull · Espalda y bíceps','Full body · Volumen'],Definición:['Circuito · Definición','Torso · Definición','Pierna · Definición','Full body · Definición'],Personalizadas:['Mi rutina']};
const scheduleOptions=['Pecho','Espalda','Pierna','Hombro','Brazos','Full body','Descanso'];
function trainingScheduleModal(){
  modal(`<span class="pill">MI SEMANA</span><h2 style="margin-top:14px">Ordenar entrenos</h2><p>Elige qué quieres entrenar cada día. El plan de hoy aparecerá automáticamente al entrar.</p>${weekDays.map(d=>`<label>${d}<select data-schedule-day="${d}">${scheduleOptions.map(x=>`<option ${state.trainingSchedule[d]===x?'selected':''}>${x}</option>`).join('')}</select></label>`).join('')}<button class="button green wide" id="saveSchedule">Guardar mi semana</button>`);
  document.querySelector('#saveSchedule').onclick=()=>{weekDays.forEach(d=>state.trainingSchedule[d]=document.querySelector(`[data-schedule-day="${d}"]`).value);save();closeModal();training();};
}
function todayTrainingName(){const d=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'][new Date().getDay()];return [d,state.trainingSchedule[d]||'Descanso'];}
strengthView=function(){const [day,focus]=todayTrainingName();const today=focus==='Descanso'?null:(focus==='Espalda'?'Pull · Espalda y bíceps':focus==='Pecho'?'Push · Pecho y tríceps':focus==='Pierna'?'Pierna A':focus==='Hombro'?'Torso A':focus==='Brazos'?'Push · Pecho y tríceps':'Full body · Volumen');return `<section class="hero"><p class="eyebrow">ENTRENO DE HOY · ${day.toUpperCase()}</p><h2>${focus==='Descanso'?'Día de descanso':focus}</h2><p>${today?`${today} · preparado para empezar cuando quieras.`:'Recuperación, movilidad o paseo suave.'}</p>${today?`<button class="button" data-start-today="${today}">Iniciar entreno de hoy</button>`:''}</section><div class="section-head"><h2>Mi semana</h2><button class="tab" data-training-schedule>Editar orden</button></div><div class="card schedule-preview">${weekDays.map(d=>`<div class="macro-line"><span>${d}</span><b>${state.trainingSchedule[d]}</b></div>`).join('')}</div><div class="section-head"><h2>Planes por objetivo</h2></div><div class="folder-grid">${Object.entries(trainingFolders).map(([folder,items])=>`<details class="card training-folder" ${folder===state.profile.goal?'open':''}><summary><span class="pill">${folder.toUpperCase()}</span><b>${items.length} rutinas</b></summary>${items.map(name=>`<button class="tab folder-plan" data-strength-plan="${name}">${name}</button>`).join('')}</details>`).join('')}</div><div class="input-row" style="margin-top:12px"><button class="button secondary" data-exercise-library>Biblioteca de ejercicios</button><button class="button secondary" data-saved-exercises>Mis ejercicios (${(state.savedExercises||[]).length})</button></div><button class="button secondary wide" data-action="create-routine">＋ Crear rutina personalizada</button>`;};

progress=function(){
  const logs=state.workoutLogs;const runs=logs.filter(x=>x.type==='Running').length;const lifts=logs.filter(x=>x.type==='Fuerza').length;
  title.textContent='Tu progreso';app.innerHTML=`<div class="grid"><div class="card clickable" data-log-weight><span class="green-text">PESO ACTUAL</span><div class="metric">${state.weight} kg</div><p>Toca para actualizar</p></div><div class="card"><span class="violet">ACTIVIDADES</span><div class="metric">${logs.length}</div><p>${lifts} fuerza · ${runs} running</p></div></div><div class="section-head"><h2>Evolución del peso</h2></div><div class="card"><div class="weight-chart">${state.weightHistory.slice(-8).map((x,i,a)=>`<i style="height:${45+((Math.max(...a.map(v=>v.value))-x.value)*12)}px" title="${x.value} kg"></i>`).join('')}</div><p>${state.weightHistory.slice(-1)[0]?.date||'Sin registros'} · ${state.weight} kg</p></div><div class="section-head"><h2>Récords y constancia</h2></div><div class="card"><div class="macro-line"><span>Press de banca</span><b>${state.personalRecords.bench||'—'} kg</b></div><div class="macro-line"><span>Sesiones de fuerza</span><b>${lifts}</b></div><div class="macro-line"><span>Sesiones de running</span><b>${runs}</b></div><div class="macro-line"><span>Comidas planificadas hoy</span><b>${state.meals.length}</b></div></div><div class="section-head"><h2>Fotos de progreso</h2></div><label class="card photo-upload">＋ Añadir foto<input type="file" accept="image/*" hidden></label>`;bind();
};

const baseBind=bind;
bind=function(){
  baseBind();
  document.querySelector('.avatar').onclick=()=>profileModal(false);
  document.querySelectorAll('[data-recipe]').forEach(card=>card.onclick=e=>{if(!e.target.closest('[data-remove-meal]'))recipeModal(card.dataset.recipe);});
  document.querySelectorAll('[data-grocery]').forEach(b=>b.onclick=groceryModal);
  document.querySelectorAll('[data-week-plan]').forEach(b=>b.onclick=weeklyPlanModal);
document.querySelectorAll('[data-photo-meal]').forEach(b=>b.onclick=photoMealModal);
  document.querySelectorAll('[data-quick-add]').forEach(b=>b.onclick=()=>quickMealModal(b.dataset.quickAdd));
  document.querySelectorAll('[data-supplements]').forEach(b=>b.onclick=supplementsModal);
  document.querySelectorAll('[data-exercise-library]').forEach(b=>b.onclick=()=>exerciseLibraryModal());
  document.querySelectorAll('[data-saved-exercises]').forEach(b=>b.onclick=()=>{const saved=state.savedExercises||[];modal(`<h2>Mis ejercicios</h2>${saved.length?saved.map(x=>`<div class="card meal-row"><div class="row-main"><h3>${x}</h3><p>Guardado para tus rutinas</p></div><button class="mini-remove" data-remove-saved="${x}">×</button></div>`).join(''):'<p class="notice">Guarda ejercicios desde la biblioteca para encontrarlos aquí.</p>'}`);document.querySelectorAll('[data-remove-saved]').forEach(x=>x.onclick=()=>{state.savedExercises=state.savedExercises.filter(v=>v!==x.dataset.removeSaved);save();closeModal();training();});});
  document.querySelectorAll('[data-favorites]').forEach(b=>b.onclick=()=>{const favs=meals.filter(m=>state.favorites.includes(m.id));modal(`<h2>Tus favoritos</h2>${favs.length?favs.map(m=>`<div class="card meal-row"><div class="row-main"><h3>${m.name}</h3><p>${m.kcal} kcal · ${m.p} g proteína</p></div><button class="tab" data-open-fav="${m.id}">Ver</button></div>`).join(''):'<p class="notice">Aún no has guardado recetas favoritas.</p>'}`);document.querySelectorAll('[data-open-fav]').forEach(x=>x.onclick=()=>{closeModal();recipeModal(x.dataset.openFav);});});
  document.querySelectorAll('[data-action="create-routine"]').forEach(b=>b.onclick=routineBuilder);
  document.querySelectorAll('[data-training-schedule]').forEach(b=>b.onclick=trainingScheduleModal);
  document.querySelectorAll('[data-start-today]').forEach(b=>b.onclick=()=>startStrength(b.dataset.startToday));
  document.querySelectorAll('[data-log-weight]').forEach(b=>b.onclick=()=>{modal(`<h2>Actualizar peso</h2><label>Peso actual (kg)<input id="newWeight" type="number" step="0.1" value="${state.weight}"></label><button class="button green wide" id="saveWeight">Guardar</button>`);document.querySelector('#saveWeight').onclick=()=>{state.weight=Number(document.querySelector('#newWeight').value);state.weightHistory.push({date:new Date().toLocaleDateString('es-ES'),value:state.weight});save();closeModal();progress();};});
};

// Reactiva eventos con la capa avanzada y ofrece configuración inicial.
home();
if(!state.profile.configured) setTimeout(()=>profileModal(true),250);
